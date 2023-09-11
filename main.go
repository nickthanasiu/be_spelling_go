package main

import "bespelling/routes"

func main() {
	router := routes.SetRouter()
	router.Run(":8080")
}
