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

	result := h.db.Create(&volunteer)

	if result.Error != nil {
		fmt.Println(result.Error)
		return fiber.NewError(fiber.StatusInternalServerError, "Server failure")
	}

	return c.SendStatus(fiber.StatusCreated)
}

func (h Handler) GetVolunteers(c *fiber.Ctx) error {

	var volunteers [] Volunteer
	
	result:= h.db.Find(&volunteers)

	if result.Error != nil {
		fmt.Println(result.Error)
		return fiber.NewError(fiber.StatusInternalServerError, "Server failure")
	}

	return c.JSON(volunteers)
}

func (h Handler) SearchVolunteer(c *fiber.Ctx) error {

	talent:= c.Params("talent")

	var volunteers [] Volunteer

	result:= h.db.Find(&volunteers, "talent = ?", talent)

	if result.Error != nil{
		fmt.Println(result.Error)
		return fiber.NewError(fiber.StatusInternalServerError, "Server failure")
	}

	fmt.Println(volunteers)

	return c.JSON(volunteers)
}