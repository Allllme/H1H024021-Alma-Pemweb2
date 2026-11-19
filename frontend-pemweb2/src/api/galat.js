const BIDANG_FORM = ['program_studi_id', 'nim', 'nama', 'email', 'angkatan', 'ipk']

function samakanNama(nama) {
  const kunci = nama.replace(/_/g, '').toLowerCase()
  return BIDANG_FORM.find((b) => b.replace(/_/g, '') === kunci) ?? nama
}

// Mengubah galat Axios dari backend mana pun menjadi { umum, bidang }
export function ekstrakGalat(galat) {
  const isi = galat.response?.data

  if (!galat.response) {
    return { umum: 'Tidak dapat menghubungi server', bidang: {} }
  }

  const hasil = {
    umum: isi?.pesan ?? isi?.message ?? 'Terjadi kesalahan',
    bidang: {},
  }

  const rinci = isi?.errors ?? isi?.galat

  if (Array.isArray(rinci)) {
    rinci.forEach((item) => {
      const nama = item.bidang ?? item.field
      const pesan = item.pesan ?? item.message
      if (nama && pesan) hasil.bidang[samakanNama(nama)] = pesan
    })
  } else if (rinci && typeof rinci === 'object') {
    Object.entries(rinci).forEach(([nama, pesan]) => {
      hasil.bidang[samakanNama(nama)] = Array.isArray(pesan) ? pesan[0] : String(pesan)
    })
  }

  return hasil
}