package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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

	puzzleCollection := client.Database("test").Collection("puzzles")

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./assets", true)))

	api := router.Group("/api")
	{
		api.GET("/puzzles", func(ctx *gin.Context) {
			var puzzles []bson.M
			cursor, err := puzzleCollection.Find(ctx, bson.M{})
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			if err = cursor.All(ctx, &puzzles); err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			ctx.JSON(http.StatusOK, puzzles)
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
