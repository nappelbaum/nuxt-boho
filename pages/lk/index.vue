<script setup>
import LoadingRing from '~/components/UI/LoadingRing.vue';

const layout = "lk";

const router = useRouter()

const user = useUser()
const isAuth = computed(() => user.isAuth)
const me = computed(() => user.me)

const isLoading = ref(true)

onBeforeMount(async () => {
    await user.getMe(() => {})
    isLoading.value = false
})

</script>

<template>
    <NuxtLayout :name="layout">
        <section v-if="isAuth">
            <loading-ring v-if="isLoading"/>
            <h2>Personal page</h2>
            <h2>Привет, {{ me.name }}</h2>
            <ul>
                <li class="d-flex column-gap-3">
                    <span>Имя: </span>
                    <span>{{ me.name }}</span>
                </li>
                <li class="d-flex column-gap-3">
                    <span>Email: </span>
                    <span>{{ me.email }}</span>
                </li>
                <li class="d-flex column-gap-3">
                    <span>Изменено: </span>
                    <span>{{ me.updated_at }}</span>
                </li>
            </ul>
        </section>
    </NuxtLayout>
</template>

<style lang="scss" scoped>

</style>
