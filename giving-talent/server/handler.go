package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Handler struct {
	db *gorm.DB
}

func New(db *gorm.DB) Handler{

	return Handler{db}
}
func (h Handler) CreateVolunteer(c *fiber.Ctx) error {

	volunteer := new(Volunteer)

	err:= c.BodyParser(volunteer)

	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid volunteer parameters")
	}

	newVolunteer := new(Volunteer)

	result := h.db.Create(&newVolunteer)

	if result.Error != nil {
		fmt.Println(result.Error)
		return fiber.NewError(fiber.StatusInternalServerError, "Server failure")
	}

	return c.SendStatus(fiber.StatusCreated)
}