package main

import (
	"context"
	"fmt"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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

	/*
		var puzzles []bson.M

		collection := client.Database("test").Collection("puzzles")
		cursor, err := collection.Find(context.TODO(), bson.D{{}})
		if err != nil {
			panic(err)
		}

		if err = cursor.All(context.TODO(), &puzzles); err != nil {
			panic(err)
		}

		fmt.Println(puzzles)

	*/

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./assets", true)))
	router.Run(":8080")
}

func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		panic("Error loading .env file")
	}

	return os.Getenv(key)
}
