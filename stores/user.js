import AuthService from '../API/AuthService'

export const useUser = defineStore('user', {
  state: () => ({
    isAuth: useCookie('access_token').value ? true : false,
    me: {}
  }),
  getters: {},
  actions: {
    async getMe(cb) {
      const res = await AuthService.getMe(cb)

      console.log(res)

      if (res) {
        this.isAuth = true
        this.me = res.data
      } else {
        this.isAuth = false
        this.me = {}
      }
    },
    logout() {
      this.me = {}
      this.isAuth = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
