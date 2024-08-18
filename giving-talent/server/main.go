package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	db := Init()

	h:= New(db)

	app:= fiber.New()

	app.Use(cors.New())

	app.Get("/volunteers", h.GetVolunteers)

	app.Get("/volunteers/:talent", h.SearchVolunteer)


	app.Listen(":8080")
}