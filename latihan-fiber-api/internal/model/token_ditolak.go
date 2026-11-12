package model

import "time"

type TokenDitolak struct {
	ID              uint      `gorm:"primaryKey"`
	Hash            string    `gorm:"size:64;uniqueIndex"`
	KedaluwarsaPada time.Time `gorm:"index"`
	CreatedAt       time.Time
}