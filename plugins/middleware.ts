export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
        const token = useCookie('access_token').value
        const user = useUser()

        if (token) {
            if (to.path === '/lk/login' || to.path === '/lk/signup') {
                return navigateTo('/lk')
            }
        }
    
        if (!token) {
            if (to.path === '/lk') {
                return navigateTo('/lk/login')
            }
            if (user.isAuth) user.logout()
        }
    })
})