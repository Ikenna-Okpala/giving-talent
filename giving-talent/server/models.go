package main

type Volunteer struct {
	ID             int    `json:"id" gorm:"primaryKey"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	Number         string `json:"number"`
	Age            string `json:"age"`
	CountryOrigin  string `json:"countryOrigin" gorm:"column:country_origin"`
	CountryTrained string `json:"countryTrained" gorm:"column:country_trained"`
	VolunteerHours string `json:"volunteerHours" gorm:"column:volunteer_hours"`
	EventType      string `json:"eventType" gorm:"column:event_type"`
	Talent         string `json:"talent"`
}