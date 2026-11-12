package handler

import (
	"time"

	"github.com/gofiber/fiber/v3"

	"latihan-fiber-api/internal/config"
	"latihan-fiber-api/internal/model"
)

func Logout(c fiber.Ctx) error {
	hash, cocokHash := c.Locals("token_hash").(string)
	kedaluwarsa, cocokExp := c.Locals("token_exp").(time.Time)

	if cocokHash == false || cocokExp == false {
		return fiber.NewError(fiber.StatusUnauthorized, "Token tidak dikenali")
	}

	config.DB.Where("kedaluwarsa_pada < ?", time.Now()).Delete(&model.TokenDitolak{})

	ditolak := model.TokenDitolak{
		Hash:            hash,
		KedaluwarsaPada: kedaluwarsa,
	}

	err := config.DB.Create(&ditolak).Error
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Gagal mencabut token")
	}

	return c.JSON(fiber.Map{
		"sukses": true,
		"pesan":  "Logout berhasil, token telah dicabut",
	})
}