<script setup>
import { ref } from 'vue'
import AuthService from '~/API/AuthService';
import { setCookie, getCookie } from '../../utils/useCookie'
import LoadingRing from '~/components/UI/LoadingRing.vue';

const layout = "lk";

const router = useRouter()

const user = useUser()
const isAuth = computed(() => user.isAuth)

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const nameWarning = ref('')
const emailWarning = ref('')
const confirmationWarning = ref('')

const isLoading = ref(false)

const onSubmit = async () => {
  isLoading.value = true

  const res = await AuthService.signup(
    name.value,
    email.value,
    password.value,
    password_confirmation.value
  )

  if (res?.data?.access_token) {
    setCookie('access_token', res?.data?.access_token)
    isLoading.value = false
    router.push('/lk')
  } else if (res?.data?.message === 'User with this email exists') {
    emailWarning.value = 'Пользователь с таким email существует'
    isLoading.value = false
  }
  else {
    if (res?.data?.message === 'The name field is required.')
      nameWarning.value = 'Введите имя пользователя'
    if (res?.data?.message === 'The email field is required.')
      emailWarning.value = 'Введите email пользователя'
    if (res?.data?.message === 'The email field must be a valid email address.')
      emailWarning.value = 'Не валидный email'
    if (res?.data?.message === 'The password field confirmation does not match.')
      confirmationWarning.value = 'Повторный пароль не совпал'

    isLoading.value = false
  }
}

</script>

<template>
  <NuxtLayout :name="layout">
    <loading-ring v-if="isLoading"/>
    <div class="container">
        <div v-if="!isAuth" class="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form @submit.prevent="onSubmit" class="space-y-4">
                  <div class="row mb-3">
                      <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>

                      <div class="">
                        <input
                            v-model="name"
                            id="name"
                            type="text"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            name="name"
                            required
                            autocomplete="name"
                            autofocus
                            @input="nameWarning = ''"
                        />

                        <span class="text-red-600" role="alert">
                            <strong>{{ nameWarning }}</strong>
                        </span>
                      </div>
                  </div>

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
                            @input="emailWarning = ''"
                        />

                        <span class="text-red-600" role="alert">
                            <strong>{{ emailWarning }}</strong>
                        </span>
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
                            @input="confirmationWarning = ''"
                        />
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="password-confirm" class="block text-md/6 font-medium text-gray-900">
                        Confirm Password
                      </label>

                      <div class="col-md-6">
                        <input
                            v-model="password_confirmation"
                            id="password-confirm"
                            type="password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md/6"
                            name="password_confirmation"
                            required
                            autocomplete="new-password"
                            @input="confirmationWarning = ''"
                        />

                        <span class="text-red-600" role="alert">
                            <strong>{{ confirmationWarning }}</strong>
                        </span>
                      </div>
                  </div>

                  <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg/8 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                  </div>
                </form>
            </div>
        </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>

</style>