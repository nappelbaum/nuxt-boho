import createApi from './myApi'

export default class AuthService {
  static async signup(name, email, password, password_confirmation) {
    try {
      const { $axios } = useNuxtApp()

      const res = await $axios.post('http://127.0.0.1:8000/api/users', {
        name,
        email,
        password,
        password_confirmation
      })

      return res
    } catch (err) {
      return err.response
    }
  }

  static async login(email, password) {
    try {
      const { $axios } = useNuxtApp()
      
      const res = await $axios.post('http://127.0.0.1:8000/api/auth/login', { email, password })

      return res
    } catch (err) {
      return null
    }
  }

  static async getFruits(cb) {
    const res = await createApi(cb).get('http://127.0.0.1:8000/api/auth/fruits')
    return res
  }

  static async getMe(cb) {
    const res = await createApi(cb).post('http://127.0.0.1:8000/api/auth/me')
    return res
  }

  static async logout(cb) {
    const res = await createApi(cb).post('http://127.0.0.1:8000/api/auth/logout')
    return res
  }
}
