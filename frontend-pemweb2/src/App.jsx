import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './halaman/Login'
import DaftarMahasiswa from './halaman/DaftarMahasiswa'
import RuteTerlindungi from './komponen/RuteTerlindungi'
import TambahMahasiswa from './halaman/TambahMahasiswa'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mahasiswa" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mahasiswa"
          element={
            <RuteTerlindungi>
              <DaftarMahasiswa />
            </RuteTerlindungi>
          }
        />
        <Route
          path="/mahasiswa/tambah"
          element={
            <RuteTerlindungi>
              <TambahMahasiswa />
            </RuteTerlindungi>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}