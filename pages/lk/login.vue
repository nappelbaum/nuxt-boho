<script setup>
import AuthService from '~/API/AuthService'
import { setCookie } from '~/utils/useCookie'
import LoadingRing from '~/components/UI/LoadingRing.vue';

const layout = "lk";

const router = useRouter()

const user = useUser()
const isAuth = computed(() => user.isAuth)

const email = ref('')
const password = ref('')
const remember = ref(false)

const warning = ref('')

const isLoading = ref(false)

const onSubmit = async () => {
  isLoading.value = true
  const res = await AuthService.login(email.value, password.value)

  if (res?.data?.access_token) {
    setCookie('access_token', res.data?.access_token)
    isLoading.value = false
    router.push('/lk')
  } else {
    isLoading.value = false
    warning.value = 'Неверный email или пароль'
  }
}
</script>

<template>
  <NuxtLayout :name="layout">
    <loading-ring v-if="isLoading"/>
    <div v-if="!isAuth" class="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
      
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              <span>Log in to your account or </span>
              <NuxtLink to="/lk/signup" class="text-blue-800 underline">register</NuxtLink>
            </h2>
        </div>

        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="row mb-3">
              <label for="email" class="block text-md/6 font-medium text-gray-900">Email Address</label>

              <div class="col-md-6">
                <input
                  v-model="email"
                  id="email"
                  type="email"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                  name="email"
                  required
                  autocomplete="email"
                  autofocus
                  @input="warning = ''"
                />
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="block text-md/6 font-medium text-gray-900">Password</label>

              <div class="col-md-6">
                <input
                  v-model="password"
                  id="password"
                  type="password"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                  name="password"
                  required
                  autocomplete="current-password"
                  @input="warning = ''"
                />

                <span class="text-red-600" role="alert">
                  <strong>{{ warning }}</strong>
                </span>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6 offset-md-4">
                <div class="form-check">
                  <input
                    v-model="remember"
                    class="form-check-input"
                    type="checkbox"
                    name="remember"
                    id="remember"
                  />

                  <label class="form-check-label" for="remember"> Remember Me </label>
                </div>
              </div>
            </div>

            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg/8 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            </div>
          </form>
        </div>
      
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>

</style>
