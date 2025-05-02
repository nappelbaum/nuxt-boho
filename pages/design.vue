<script setup>
import GetService from "../API/GetService.js";

const error = ref(false);
const categories = useCategories();
// const currentId = ref({ id: null, switch: true });
const loading = ref(false);

// const fetchProducts = async () => {
//   if (!products.value.length) {
//     const data = await GetService.getProducts();

//     if (!data) {
//       error.value = true;
//       return;
//     }

//     products.value = data;
//   }
// };

const fetchCategories = async () => {
  if (!categories.value.length) {
    loading.value = true;
    const data = await GetService.getCategories();

    console.log(data)
    
    if (!data) {
      error.value = true;
      return;
    }
    
    loading.value = false;
    categories.value = data;
  }
};

// fetchProducts();
fetchCategories();

// const setCurrentId = (id) => {
//   currentId.value.id = id;
//   currentId.value.switch = !currentId.value.switch;
// };
</script>

<template>
  <section class="portfolio">
    <div v-if="loading"></div>
    <div v-else class="main-container">
      <div v-if="error">Ошибка загрузки</div>
      <grid-content />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;
@use "~/assets/scss/base.scss";
</style>
