package main

import (
	"context"
	b64 "encoding/base64"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/relvacode/iso8601"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Ranking struct {
	Name      string `json:"name"`
	Threshold int    `json:"threshold"`
}

type Puzzle struct {
	ID           primitive.ObjectID `bson:"_id"`
	CenterLetter string             `json:"centerLetter"`
	Letters      []string           `json:"letters"`
	Pangrams     []string           `json:"pangrams"`
	Words        []string           `json:"words"`
	Rankings     []Ranking          `json:"rankings"`
	Date         primitive.DateTime `json:"date"`
}

func main() {
	user := goDotEnvVariable("MONGODB_USER")
	password := goDotEnvVariable("MONGODB_PASSWORD")
	uri := fmt.Sprintf("mongodb+srv://%s:%s@cluster0.3l6s1.mongodb.net/?retryWrites=true&w=majority", user, password)
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./assets", true)))

	api := router.Group("/api")
	{
		api.GET("/puzzles", func(ctx *gin.Context) {
			limit := ctx.DefaultQuery("limit", "10")
			l, err := strconv.ParseInt(limit, 10, 64)
			if err != nil {
				panic(err)
			}

			cursor := ctx.Query("cursor")
			sort := ctx.Query("sort")

			response, err := GetPuzzles(l, cursor, sort)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			ctx.JSON(http.StatusOK, response)
		})
	}

	router.Run(":8080")
}

func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		panic("Error loading .env file")
	}

	return os.Getenv(key)
}

type PuzzlesResponse struct {
	Puzzles []Puzzle `json:"puzzles"`
	Cursor  string   `json:"cursor"`
}

func GetPuzzles(limit int64, cursor string, sort string) (PuzzlesResponse, error) {

	user := goDotEnvVariable("MONGODB_USER")
	password := goDotEnvVariable("MONGODB_PASSWORD")
	uri := fmt.Sprintf(
		"mongodb+srv://%s:%s@cluster0.3l6s1.mongodb.net/?retryWrites=true&w=majority",
		user,
		password,
	)
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)
	puzzleCollection := client.Database("test").Collection("puzzles")

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var response PuzzlesResponse
	var puzzles []Puzzle

	l := limit + 1

	var sortByOrder int
	var greaterOrLessThan string

	if sort == "oldest" {
		sortByOrder = 1
		greaterOrLessThan = "$gte"
	} else {
		sortByOrder = -1
		greaterOrLessThan = "$lte"
	}

	fOpts := options.FindOptions{
		Limit: &l,
		Sort:  bson.D{{Key: "date", Value: sortByOrder}},
	}

	decodedCursor, err := b64.StdEncoding.DecodeString(cursor)
	if err != nil {
		panic(err)
	}

	var filter bson.D
	dateFromISOString, _ := iso8601.ParseString(string(decodedCursor))

	if len(cursor) > 0 {
		filter = bson.D{{
			Key: "date", Value: bson.D{{
				Key: greaterOrLessThan, Value: dateFromISOString,
			}},
		}}
	} else {
		filter = bson.D{}
	}

	cur, err := puzzleCollection.Find(ctx, filter, &fOpts)
	if err != nil {
		return response, err
	}

	err = cur.All(ctx, &puzzles)
	if err != nil {
		return response, err
	}

	var nextCursor string
	hasMore := int64(len(puzzles)) == limit+1

	if hasMore {
		date := puzzles[limit].Date                              // Find last puzzle in puzzles and get the date
		iso := date.Time().UTC().Format(time.RFC3339)            // ...convert date into ISO string
		nextCursor = b64.StdEncoding.EncodeToString([]byte(iso)) // ...then encode. This will serve as our cursor
	}

	response = PuzzlesResponse{
		Puzzles: puzzles,
		Cursor:  nextCursor,
	}

	return response, nil
}
