package handler

import (
	"sort"
	"strconv"

	"github.com/gofiber/fiber/v3"
	"latihan-fiber-api/internal/model"
)

func DaftarMahasiswa(c fiber.Ctx) error {
	angkatan := c.Query("angkatan", "")
	urut := c.Query("urut", "")

	hasil := model.Daftar

	if angkatan != "" {
		nilaiAngkatan, err := strconv.Atoi(angkatan)
		if err != nil {
			return fiber.NewError(fiber.StatusBadRequest, "Parameter angkatan harus berupa angka")
		}

		disaring := []model.Mahasiswa{}
		for i := 0; i < len(hasil); i++ {
			if hasil[i].Angkatan == nilaiAngkatan {
				disaring = append(disaring, hasil[i])
			}
		}
		hasil = disaring
	}

	hasilUrutan := make([]model.Mahasiswa, len(hasil))
	copy(hasilUrutan, hasil)

	switch urut {
	case "nama":
		sort.Slice(hasilUrutan, func(i, j int) bool {
			return hasilUrutan[i].Nama < hasilUrutan[j].Nama
		})
	case "ipk":
		sort.Slice(hasilUrutan, func(i, j int) bool {
			return hasilUrutan[i].Ipk > hasilUrutan[j].Ipk
		})
	}

	return c.JSON(fiber.Map{
		"sukses": true,
		"data":   hasilUrutan,
	})
}

func DetailMahasiswa(c fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "ID harus berupa angka")
	}

	for i := 0; i < len(model.Daftar); i++ {
		if model.Daftar[i].ID == id {
			return c.JSON(fiber.Map{
				"sukses": true,
				"data":   model.Daftar[i],
			})
		}
	}

	return fiber.NewError(fiber.StatusNotFound, "Mahasiswa tidak ditemukan")
}

func DetailMahasiswaByNim(c fiber.Ctx) error {
	nim := c.Params("nim")

	for i := 0; i < len(model.Daftar); i++ {
		if model.Daftar[i].Nim == nim {
			return c.JSON(fiber.Map{
				"sukses": true,
				"data":   model.Daftar[i],
			})
		}
	}

	return fiber.NewError(fiber.StatusNotFound, "Mahasiswa tidak ditemukan")
}