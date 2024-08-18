package main

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init() *gorm.DB{
	dsn := "postgresql://Ikenna-Okpala:6AiXr7tswhdx@ep-plain-dawn-64743976.us-east-2.aws.neon.tech:5432/youth-unlimited?sslmode=require"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&Volunteer{})

	// db.Debug().Migrator().AlterColumn(&Volunteer{}, "Name")
	// db.Debug().Migrator().AlterColumn(&Volunteer{}, "Email")

	return db
}