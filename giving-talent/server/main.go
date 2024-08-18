package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

var TWO_AUTH string
var TWO_ID string


func main() {

	godotenv.Load(".env")

	// if err != nil {
	// 	log.Fatalf("env vars failed")
	// }

	TWO_AUTH = os.Getenv("TWO_AUTH")
	TWO_ID = os.Getenv("TWO_ID")

	db := Init()

	h:= New(db)

	app:= fiber.New()

	app.Use(cors.New())

	app.Post("/volunteers", h.CreateVolunteer)

	app.Get("/volunteers", h.GetVolunteers)

	app.Get("/volunteers/:talent", h.SearchVolunteer)


	app.Listen(":8080")
}