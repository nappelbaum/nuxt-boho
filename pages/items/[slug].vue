<script setup>
import GetService from "../../API/GetService.js";
import TheSlider from "../../components/slider/TheSlider.vue";
import ProductContent from "~/components/ProductContent.vue";
const route = useRoute();
const error = ref(false);

const product = useProduct();
const loading = ref(false);

const fetchProduct = async () => {
    loading.value = true;

    const data = await GetService.getProduct(route.params.slug);

    loading.value = false;
    console.log(data);

    if (!data) {
      error.value = true;
      return;
    }

    product.value = data;
};

fetchProduct();
</script>

<template>
  <div v-if="product">
    <div v-if="loading"></div>
    <div v-else class="product">
      <div v-if="error">Ошибка загрузки</div>
      <div v-else class="main-container">
        <div class="product__wrapper">

          <the-slider :images="product.images" :productName="product.name" />
  
          <product-content :product="product"></product-content>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;
@use "~/assets/scss/base.scss";

.product__wrapper {
  display: flex;
  column-gap: var.$product-main-gap;
  // column-gap: clamp(20px, 4vw, 60px);

  @media (max-width: 880px) {
    flex-direction: column;
    row-gap: var.$product-main-gap;
    // row-gap: clamp(20px, 4vw, 60px);
  }
}
</style>
