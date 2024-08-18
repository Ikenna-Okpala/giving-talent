package main

import (
	"encoding/json"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
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


	client:= twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: TWO_ID,
		Password: TWO_AUTH,
	})

	params := &twilioApi.CreateMessageParams{}

	params.SetTo("+16045616250")
	params.SetFrom("+12082747884")
	
	msg:= fmt.Sprintf("Hello Ms. Amie, %s will like to share volunteer hours. They can be reached at %s", volunteer.Name, volunteer.Email)

	params.SetBody(msg)

	fmt.Println(msg)
	
	resp, err2 :=  client.Api.CreateMessage(params)

	if err2 != nil {
		fmt.Println(err2)
		return fiber.NewError(fiber.StatusInternalServerError, "Server failure")
	}else{
		response, _ := json.Marshal(*resp)
		fmt.Println("Response: " + string(response))
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