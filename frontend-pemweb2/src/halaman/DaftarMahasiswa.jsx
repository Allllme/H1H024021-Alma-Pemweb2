import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ambilDaftarMahasiswa,
  hapusMahasiswa,
} from '../api/layananMahasiswa'
import { ekstrakGalat } from '../api/galat'

export default function DaftarMahasiswa() {
  const [data, setData] = useState([])
  const [halaman, setHalaman] = useState(1)
  const [totalHalaman, setTotalHalaman] = useState(1)
  const [cari, setCari] = useState('')
  const [kataCari, setKataCari] = useState('')
  const [memuat, setMemuat] = useState(false)
  const [galat, setGalat] = useState('')
  const [idDihapus, setIdDihapus] = useState(null)
  const [segarkan, setSegarkan] = useState(0)

  useEffect(() => {
    const penunda = setTimeout(() => {
      setKataCari(cari)
      setHalaman(1)
    }, 400)
    return () => clearTimeout(penunda)
  }, [cari])

  useEffect(() => {
    let dibatalkan = false

    async function muat() {
      setMemuat(true)
      setGalat('')
      try {
        const hasil = await ambilDaftarMahasiswa({
          page: halaman,
          cari: kataCari,
          per_halaman: 10,
        })
        if (!dibatalkan) {
          setData(hasil.data)
          setTotalHalaman(hasil.meta.last_page)
        }
      } catch {
        if (!dibatalkan) setGalat('Gagal memuat data mahasiswa')
      } finally {
        if (!dibatalkan) setMemuat(false)
      }
    }

    muat()
    return () => {
      dibatalkan = true
    }
  }, [halaman, kataCari, segarkan])

  async function tanganiHapus(mahasiswa) {
    const yakin = window.confirm(
      `Hapus ${mahasiswa.nama} (${mahasiswa.nim})? Tindakan ini tidak bisa dibatalkan.`
    )
    if (!yakin) return

    setIdDihapus(mahasiswa.id)
    setGalat('')
    try {
      await hapusMahasiswa(mahasiswa.id)
      if (data.length === 1 && halaman > 1) {
        setHalaman(halaman - 1)
      } else {
        setSegarkan((n) => n + 1)
      }
    } catch (e) {
      setGalat(ekstrakGalat(e).umum)
    } finally {
      setIdDihapus(null)
    }
  }

  return (
    <div>
      <h1>Daftar Mahasiswa</h1>
      <p>
        <Link to="/mahasiswa/tambah">Tambah Mahasiswa</Link>
      </p>
      <input
        placeholder="Cari nama atau NIM"
        value={cari}
        onChange={(e) => setCari(e.target.value)}
      />

      {memuat && <p>Memuat...</p>}
      {galat && <p style={{ color: 'crimson' }}>{galat}</p>}

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Angkatan</th>
            <th>IPK</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id}>
              <td>{m.nim}</td>
              <td>{m.nama}</td>
              <td>{m.angkatan}</td>
              <td>{m.ipk}</td>
              <td>
                <button
                  onClick={() => tanganiHapus(m)}
                  disabled={idDihapus === m.id}
                >
                  {idDihapus === m.id ? 'Menghapus...' : 'Hapus'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <button
          disabled={halaman <= 1}
          onClick={() => setHalaman(halaman - 1)}
        >
          Sebelumnya
        </button>{' '}
        Halaman {halaman} dari {totalHalaman}{' '}
        <button
          disabled={halaman >= totalHalaman}
          onClick={() => setHalaman(halaman + 1)}
        >
          Berikutnya
        </button>
      </p>
    </div>
  )
}