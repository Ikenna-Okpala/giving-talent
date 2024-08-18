package main

type Volunteer struct {
	ID             int    `json:"id" gorm:"primaryKey"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	Number         string `json:"number"`
	Age            string `json:"age"`
	CountryOrigin  string `json:"countryOrigin"`
	CountryTrained string `json:"countryTrained"`
	VolunteerHours string `json:"volunteerHours"`
	EventType      string `json:"eventType"`
}