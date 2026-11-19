import klien, { BACKEND } from './klien'

export async function login(email, kataSandi) {
  const badan =
    BACKEND === 'fiber'
      ? { email, kata_sandi: kataSandi }
      : { email, password: kataSandi }

  const respons = await klien.post('/auth/login', badan)
  return respons.data
}

export async function ambilProfil() {
  const respons = await klien.get('/auth/profil')
  return respons.data
}

export async function logout() {
  const respons = await klien.post('/auth/logout')
  return respons.data
}