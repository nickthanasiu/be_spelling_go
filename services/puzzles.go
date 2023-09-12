package services

import (
	"bespelling/db"
	"bespelling/models"
	"context"
	"encoding/base64"
	"log"
	"math"
	"time"

	"github.com/relvacode/iso8601"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func AddPuzzle(puzzle models.Puzzle) (*mongo.InsertOneResult, error) {
	puzzleCollection := db.OpenCollection("puzzles")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	puzzle.ID = primitive.NewObjectID()
	puzzle.Rankings = GenerateRankings(puzzle.Pangrams, puzzle.Words)

	result, err := puzzleCollection.InsertOne(ctx, puzzle)
	if err != nil {
		return result, err
	}

	return result, nil
}

func GenerateRankings(pangrams, words []string) []models.Ranking {

	// Pangram is worth its length plus 7
	CalculatePangramScore := func(pangram string) int {
		return len(pangram) + 7
	}

	// Four letter words are worth one point, while larger words are worth their length
	CalculateWordScore := func(word string) int {
		if len(word) > 4 {
			return len(word)
		}
		return 1
	}

	// Calculate maximum score
	var maxScore int

	for _, word := range words {
		maxScore += CalculateWordScore(word)
	}

	for _, pangram := range pangrams {
		maxScore += CalculatePangramScore(pangram)
	}

	PercentToScore := func(percentage int) int {
		score := math.Floor(
			float64(maxScore) * (float64(percentage) / 100),
		)
		return int(score)
	}

	rankings := []models.Ranking{
		{Name: "Beginner", Threshold: PercentToScore(0)},
		{Name: "Good Start", Threshold: PercentToScore(2)},
		{Name: "Moving Up", Threshold: PercentToScore(5)},
		{Name: "Good", Threshold: PercentToScore(8)},
		{Name: "Solid", Threshold: PercentToScore(15)},
		{Name: "Nice", Threshold: PercentToScore(25)},
		{Name: "Great", Threshold: PercentToScore(40)},
		{Name: "Amazing", Threshold: PercentToScore(50)},
		{Name: "Genius", Threshold: PercentToScore(70)},
		{Name: "Queen Bee", Threshold: PercentToScore(maxScore)},
	}

	return rankings
}
