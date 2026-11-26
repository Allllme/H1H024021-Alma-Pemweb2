package handler_test

import (
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v3"

	"latihan-fiber-api/internal/handler"
	"latihan-fiber-api/internal/router"
	"latihan-fiber-api/internal/validasi"
)

func kirim(t *testing.T, app *fiber.App, metode, url, token string) int {
	t.Helper()

	permintaan := httptest.NewRequest(metode, url, nil)
	if token != "" {
		permintaan.Header.Set("Authorization", "Bearer "+token)
	}

	respons, err := app.Test(permintaan)
	if err != nil {
		t.Fatal(err)
	}

	return respons.StatusCode
}

func TestStatusEndpoint(t *testing.T) {
	app := fiber.New()
	router.Daftarkan(app)

	kode := kirim(t, app, "GET", "/api/status", "")
	if kode != 200 {
		t.Errorf("status yang diharapkan 200, diperoleh %d", kode)
	}
}

func TestDetailMahasiswaIdBukanAngka(t *testing.T) {
	app := fiber.New()
	app.Get("/api/mahasiswa/:id", handler.DetailMahasiswa)

	kode := kirim(t, app, "GET", "/api/mahasiswa/abc", "")
	if kode != 400 {
		t.Errorf("status yang diharapkan 400, diperoleh %d", kode)
	}
}

func TestDaftarMahasiswaTanpaToken(t *testing.T) {
	app := fiber.New()
	router.Daftarkan(app)

	kode := kirim(t, app, "GET", "/api/mahasiswa", "")
	if kode != 401 {
		t.Errorf("status yang diharapkan 401, diperoleh %d", kode)
	}
}

func TestDaftarMahasiswaTokenPalsu(t *testing.T) {
	app := fiber.New()
	router.Daftarkan(app)

	kode := kirim(t, app, "GET", "/api/mahasiswa", "tokenpalsu")
	if kode != 401 {
		t.Errorf("status yang diharapkan 401, diperoleh %d", kode)
	}
}

func TestValidasiNim(t *testing.T) {
	kasus := []struct {
		nama  string
		nim   string
		galat bool
	}{
		{"nim benar", "H1H024021", false},
		{"nim tanpa huruf H di depan", "X123456", true},
		{"nim terlalu pendek", "H1", true},
	}

	for _, k := range kasus {
		t.Run(k.nama, func(t *testing.T) {
			data := handler.PermintaanMahasiswa{
				ProgramStudiID: 1,
				Nim:            k.nim,
				Nama:           "Alma Maida",
				Email:          "alma@example.com",
				Angkatan:       2024,
				Ipk:            3.5,
			}

			hasil := validasi.Periksa(data)
			adaGalat := len(hasil) > 0

			if adaGalat != k.galat {
				t.Errorf("NIM %q: galat=%v, diharapkan %v", k.nim, adaGalat, k.galat)
			}
		})
	}
}