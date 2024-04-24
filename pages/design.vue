<script setup>
import GetService from "../API/GetService.js";

const error = ref(false);
const products = useProducts();
const openGridContainer = useOpen();
const currentId = ref({ id: null, switch: true });

const fetchProducts = async () => {
  if (!products.value.length) {
    const data = await GetService.getProducts();

    if (!data) {
      error.value = true;
      return;
    }

    products.value = data?.items;
  }
};

fetchProducts();

const setCurrentId = (id) => {
  currentId.value.id = id;
  currentId.value.switch = !currentId.value.switch;
};
</script>

<template>
  <div class="main">
    <section class="portfolio flex">
      <div v-if="error">Ошибка загрузки</div>
      <main-slider v-else :currentId="currentId" />
    </section>
    <transition name="grid">
      <section v-if="openGridContainer" class="grid-container shadow">
        <grid-content @setCurrentId="setCurrentId" />
      </section>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

.main {
  position: relative;
  max-height: 100vh;
  overflow: hidden;
}

.grid-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: calc(100vh - $nav-height);
  margin-top: $nav-height;
  user-select: none;
  overflow: auto;
  background-color: #fff;
  z-index: 5;

  @media (min-width: 1025px) {
    z-index: 10;
  }
}

.grid-enter-active {
  transform: translateY(0);
  transition: all 0.24s ease-out;
}

.grid-leave-active {
  transform: translateY(0);
  transition: all 0.3s ease-in;
}

.grid-enter-from,
.grid-leave-to {
  transform: translateY(calc(100vh - $nav-height));
}
</style>
