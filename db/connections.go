package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DBinstance() *mongo.Client {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoURL := fmt.Sprintf(
		"mongodb+srv://%s:%s@cluster0.3l6s1.mongodb.net/?retryWrites=true&w=majority",
		os.Getenv("MONGODB_USER"),
		os.Getenv("MONGODB_PASSWORD"),
	)

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(mongoURL).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	return client
}

var MongoClient *mongo.Client = DBinstance()

func OpenCollection(collectionName string) *mongo.Collection {
	return MongoClient.Database("test").Collection(collectionName)
}
