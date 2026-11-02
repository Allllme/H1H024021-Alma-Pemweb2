package middleware

import (
	"os"

	"github.com/gofiber/fiber/v3"
)

func KunciApi() fiber.Handler {
	return func(c fiber.Ctx) error {
		kunci := os.Getenv("API_KEY")

		if kunci == "" || c.Get("X-Api-Key") != kunci {
			return fiber.NewError(fiber.StatusUnauthorized, "API key tidak valid atau belum dikirim")
		}

		return c.Next()
	}
}