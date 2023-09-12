package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Puzzle struct {
	ID           primitive.ObjectID `bson:"_id" json:"_id"`
	CenterLetter string             `bson:"centerLetter" json:"centerLetter"`
	Letters      []string           `json:"letters"`
	Pangrams     []string           `json:"pangrams"`
	Words        []string           `json:"words"`
	Rankings     []Ranking          `json:"rankings"`
	Date         primitive.DateTime `json:"date"`
}

type Ranking struct {
	Name      string `json:"name"`
	Threshold int    `json:"threshold"`
}
