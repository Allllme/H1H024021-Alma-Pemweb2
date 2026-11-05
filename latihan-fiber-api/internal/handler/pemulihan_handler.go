package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v3"

	"latihan-fiber-api/internal/repository"
)

func PulihkanMahasiswa(c fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "ID harus berupa angka")
	}

	terhapus, err := repository.AmbilTerhapusPerId(uint(id))
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Data terhapus tidak ditemukan")
	}

	err = repository.Pulihkan(&terhapus)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Gagal memulihkan data")
	}

	pulih, err := repository.AmbilPerId(uint(id))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Gagal mengambil data")
	}

	return c.JSON(fiber.Map{
		"sukses": true,
		"pesan":  "Data mahasiswa berhasil dipulihkan",
		"data":   pulih,
	})
}