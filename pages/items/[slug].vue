<script setup>
import GetService from "../../API/GetService.js";
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

<!-- <template>
  <div v-if="product">
    <h1 class="text-2xl font-body font-bold" style="text-align: start">
            {{ product.name }}
    </h1>
    <div v-html="product.description"></div>

    <img :src="'http://127.0.0.1:8000/' + product.images[0].copy_800" alt="" />
  </div>

</template> -->

<template>
  <div v-if="product">
    <div v-if="loading"></div>
    <div v-else class="product mx-auto max-w-7xl py-10 px-8 font-body">
      <div v-if="error">Ошибка загрузки</div>
      <div v-else class="product__wrapper">
        <div class="product__img">
          <img :src="'http://127.0.0.1:8000/' + product.images[0].copy_800" alt="" />
        </div>
        <div class="product__content">
          <h1 class="text-2xl font-body font-bold" style="text-align: start">
            {{ product.name }}
          </h1>
          <div class="product__cost font-sans">
            {{ product.cost }} ₽
          </div>

          <div class="product__btns">
            <button class="product__cart">
              <span>В корзину</span>
            </button>
          </div>
          <div class="product__description">
            <h2 class="font-bold">Информация о товаре</h2>
            <div class="product__description--p" v-html="product.description"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  margin-bottom: 89px;
}

.product__wrapper {
  display: grid;
  grid-template: repeat(1, 1fr) / repeat(2, 1fr);
  column-gap: clamp(20px, 4vw, 60px);

  @media (max-width: 880px) {
    grid-template: repeat(1, 1fr) / repeat(1, 1fr);
    row-gap: clamp(20px, 4vw, 60px);
  }

  .product__img {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .product__content {
    > * {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .product__cost {
      font-size: 24px;
    }

    .product__btns {
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      .product__cart {
        max-width: 50%;

        font-size: 16px;
        font-weight: 600;
        padding: 9px 40px;
        border-radius: 4px;
        color: #fff;
        background-color: #333;
        cursor: pointer;
        transition: opacity 0.3s;

        @media (max-width: 1024px) {
          max-width: 100%;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .product__description {
      padding-top: 8px;
      h2 {
        margin-bottom: 8px;
      }
      p {
        line-height: 1.6;
      }
    }
  }
}
</style>
