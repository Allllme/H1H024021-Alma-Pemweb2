import axios from 'axios'

export const BACKEND = import.meta.env.VITE_BACKEND ?? 'laravel'

const alamatApi = {
  laravel: import.meta.env.VITE_API_LARAVEL,
  fiber: import.meta.env.VITE_API_FIBER,
}

const klien = axios.create({
  baseURL: alamatApi[BACKEND],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

klien.interceptors.request.use((konfigurasi) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    konfigurasi.headers.Authorization = `Bearer ${token}`
  }
  return konfigurasi
})

klien.interceptors.response.use(
  (respons) => respons,
  (galat) => {
    const urlLogin = galat.config?.url?.includes('/auth/login')
    if (galat.response?.status === 401 && !urlLogin) {
      sessionStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(galat)
  }
)

export default klien