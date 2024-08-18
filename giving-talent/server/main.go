package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {

	db := Init()

	h:= New(db)

	app:= fiber.New()

	app.Post("/volunteers", h.CreateVolunteer)

	app.Get("/volunteers", h.GetVolunteers)

	app.Listen("localhost:8080")
}