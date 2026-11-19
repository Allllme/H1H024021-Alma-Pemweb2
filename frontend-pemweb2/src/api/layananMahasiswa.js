import klien, { BACKEND } from './klien'

export async function ambilDaftarMahasiswa(parameter) {
  if (BACKEND === 'fiber') {
    const respons = await klien.get('/mahasiswa', {
      params: {
        halaman: parameter.page,
        per_halaman: parameter.per_halaman,
        cari: parameter.cari,
      },
    })
    const isi = respons.data
    return {
      data: isi.data,
      meta: {
        current_page: isi.meta?.halaman ?? 1,
        last_page: isi.meta?.total_halaman ?? 1,
        total: isi.meta?.total ?? 0,
      },
    }
  }

  const respons = await klien.get('/mahasiswa', { params: parameter })
  return respons.data
}

export async function ambilDetailMahasiswa(id) {
  const respons = await klien.get(`/mahasiswa/${id}`)
  return respons.data
}

export async function simpanMahasiswa(data) {
  const respons = await klien.post('/mahasiswa', data)
  return respons.data
}

export async function hapusMahasiswa(id) {
  const respons = await klien.delete(`/mahasiswa/${id}`)
  return respons.data
}