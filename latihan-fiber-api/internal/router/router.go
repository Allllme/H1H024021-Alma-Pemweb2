package router

import (
	"github.com/gofiber/fiber/v3"

	"latihan-fiber-api/internal/handler"
	"latihan-fiber-api/internal/middleware"
)

func Daftarkan(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/status", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"sukses": true,
			"pesan":  "API Fiber aktif",
		})
	})

	api.Post("/auth/registrasi", handler.Registrasi)
	api.Post("/auth/login", handler.Login)

	terlindungi := api.Group("", middleware.Autentikasi())

	terlindungi.Get("/auth/profil", handler.Profil)
	terlindungi.Post("/auth/segarkan", handler.SegarkanToken)
	terlindungi.Post("/auth/logout", handler.Logout)

	mahasiswa := terlindungi.Group("/mahasiswa")

	mahasiswa.Get("/", handler.DaftarMahasiswa)
	mahasiswa.Get("/:id", handler.DetailMahasiswa)
	mahasiswa.Post("/", middleware.HanyaPeran("admin", "dosen"), handler.BuatMahasiswa)
	mahasiswa.Put("/:id", middleware.HanyaPeran("admin", "dosen"), handler.PerbaruiMahasiswa)
	mahasiswa.Delete("/:id", middleware.HanyaPeran("admin"), handler.HapusMahasiswa)
	mahasiswa.Post("/:id/pulihkan", middleware.HanyaPeran("admin"), handler.PulihkanMahasiswa)

	matakuliah := terlindungi.Group("/matakuliah")

	matakuliah.Get("/", handler.DaftarMatakuliah)
	matakuliah.Get("/:id", handler.DetailMatakuliah)
	matakuliah.Post("/", middleware.HanyaPeran("admin", "dosen"), handler.BuatMatakuliah)
	matakuliah.Put("/:id", middleware.HanyaPeran("admin", "dosen"), handler.PerbaruiMatakuliah)
	matakuliah.Delete("/:id", middleware.HanyaPeran("admin"), handler.HapusMatakuliah)

	programStudi := terlindungi.Group("/program-studi")

	programStudi.Get("/", handler.DaftarProgramStudi)
}