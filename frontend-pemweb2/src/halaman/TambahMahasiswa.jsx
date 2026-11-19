import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { simpanMahasiswa } from '../api/layananMahasiswa'
import { ekstrakGalat } from '../api/galat'

const awal = {
  program_studi_id: '1',
  nim: '',
  nama: '',
  email: '',
  angkatan: '',
  ipk: '',
}

export default function TambahMahasiswa() {
  const navigasi = useNavigate()
  const [isian, setIsian] = useState(awal)
  const [galatBidang, setGalatBidang] = useState({})
  const [galatUmum, setGalatUmum] = useState('')
  const [mengirim, setMengirim] = useState(false)

  function ubah(e) {
    setIsian({ ...isian, [e.target.name]: e.target.value })
  }

  async function kirim(e) {
    e.preventDefault()
    setMengirim(true)
    setGalatBidang({})
    setGalatUmum('')

    const data = {
      program_studi_id: Number(isian.program_studi_id),
      nim: isian.nim,
      nama: isian.nama,
      email: isian.email,
      angkatan: Number(isian.angkatan),
    }
    if (isian.ipk !== '') {
      data.ipk = Number(isian.ipk)
    }

    try {
      await simpanMahasiswa(data)
      navigasi('/mahasiswa')
    } catch (galat) {
      const hasil = ekstrakGalat(galat)
      setGalatUmum(hasil.umum)
      setGalatBidang(hasil.bidang)
    } finally {
      setMengirim(false)
    }
  }

  function baris(nama, label, tipe = 'text') {
    return (
      <div>
        <label>
          {label}
          <input type={tipe} name={nama} value={isian[nama]} onChange={ubah} />
        </label>
        {galatBidang[nama] && (
          <div style={{ color: 'crimson' }}>{galatBidang[nama]}</div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Tambah Mahasiswa</h1>
      {galatUmum && <p style={{ color: 'crimson' }}>{galatUmum}</p>}
      <form onSubmit={kirim} noValidate>
        {baris('program_studi_id', 'ID Program Studi', 'number')}
        {baris('nim', 'NIM')}
        {baris('nama', 'Nama')}
        {baris('email', 'Email', 'email')}
        {baris('angkatan', 'Angkatan', 'number')}
        {baris('ipk', 'IPK (opsional)', 'number')}
        <button type="submit" disabled={mengirim}>
          {mengirim ? 'Menyimpan...' : 'Simpan'}
        </button>{' '}
        <Link to="/mahasiswa">Batal</Link>
      </form>
    </div>
  )
}