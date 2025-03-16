<script setup>
import AuthService from '~/API/AuthService'
import { eraseCookie } from '~/utils/useCookie'

const router = useRouter()
const user = useUser()
const isAuth = computed(() => user.isAuth)

const logout = async () => {
  if (isAuth.value) {
    await AuthService.logout(() => {})

    user.logout()
    eraseCookie('access_token')
    router.push('/lk/login')
  }
}

</script>

<template>
    <nav class="flex gap-4 mb-4 border-b-2">
        <NuxtLink v-if="isAuth" to="/lk">Personal cabinet</NuxtLink>
        <NuxtLink v-if="!isAuth" to="/lk/login">login</NuxtLink>
        <NuxtLink v-if="!isAuth" to="/lk/signup">signup</NuxtLink>
        <a v-if="isAuth" href="" @click.prevent="logout">logout</a>
    </nav>
</template>

<style lang="scss" scoped>
.router-link-active {
  color: rgb(44 97 253);
}
</style>