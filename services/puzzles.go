package services

import (
	"bespelling/db"
	"bespelling/models"
	"context"
	"encoding/base64"
	"log"
	"time"

	"github.com/relvacode/iso8601"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PuzzleList []models.Puzzle

func (l *PuzzleList) pop() models.Puzzle {
	puzzlesList := *l
	length := len(puzzlesList)
	lastEl := puzzlesList[length-1]
	puzzlesList = puzzlesList[:length-1]
	return lastEl
}

type PuzzlesResponse struct {
	Puzzles PuzzleList `json:"puzzles"`
	Cursor  string     `json:"cursor"`
}

func GetPuzzles(limit int64, cursor string, sort string) (PuzzlesResponse, error) {
	puzzleCollection := db.OpenCollection("puzzles")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var response PuzzlesResponse
	var puzzles PuzzleList

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

	decodedCursor, err := base64.StdEncoding.DecodeString(cursor)
	if err != nil {
		log.Fatal(err)
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
		date := puzzles[limit].Date                                 // Find last puzzle in puzzles and get the date
		iso := date.Time().UTC().Format(time.RFC3339)               // ...convert date into ISO string
		nextCursor = base64.StdEncoding.EncodeToString([]byte(iso)) // ...then encode. This will serve as our cursor
		puzzles.pop()
	}

	response = PuzzlesResponse{
		Puzzles: puzzles,
		Cursor:  nextCursor,
	}

	return response, nil
}

func GetPuzzleById(id string) (models.Puzzle, error) {
	puzzleCollection := db.OpenCollection("puzzles")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var response models.Puzzle

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return response, err
	}

	err = puzzleCollection.FindOne(ctx, bson.D{{Key: "_id", Value: objID}}).Decode(&response)
	if err != nil {
		return response, err
	}

	return response, nil
}
