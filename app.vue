<script setup>
import { getFavorites } from '~/utils/useFavorites'

const favorites = useFavorites();

onMounted(async () => {
  favorites.value = await getFavorites();

  window.addEventListener('storage', async () => {
    const newFavorites = await getFavorites();
    favorites.value = newFavorites;
    // console.log('storage:' + favorites.value);
  })
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
