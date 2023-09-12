package routes

import (
	"bespelling/services"
	"net/http"
	"strconv"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func SetRouter() *gin.Engine {
	router := gin.Default()

	// Serve our static React app
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	api := router.Group("/api")
	{
		api.GET("/puzzles", func(ctx *gin.Context) {
			limitParam := ctx.DefaultQuery("limit", "10")
			limit, err := strconv.ParseInt(limitParam, 10, 64)
			if err != nil {
				panic(err)
			}

			cursor := ctx.Query("cursor")
			sort := ctx.Query("sort")

			response, err := services.GetPuzzles(limit, cursor, sort)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			ctx.JSON(http.StatusOK, response)
		})

		api.GET("/puzzles/:id", func(ctx *gin.Context) {
			puzzleId := ctx.Param("id")

			response, err := services.GetPuzzleById(puzzleId)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
			}

			ctx.JSON(http.StatusOK, response)
		})
	}

	router.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, gin.H{}) })

	return router
}
