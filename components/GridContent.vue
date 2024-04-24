<script setup>
const products = useProducts();
const openGridContainer = useOpen();

const emit = defineEmits(["setCurrentId"]);

const onSlide = (id) => {
  openGridContainer.value = false;
  emit("setCurrentId", id);
};
</script>

<template>
  <div class="grid__wrapper">
    <div class="grid__text-content font-body">
      <h2 class="grid__title">New rugs for HYMNI exhibition</h2>
      <p>
        A series of hand-tufted and brushed mohair rugs originally created for
        HYMNI exhibition, organized spring 2024 in Lokal Gallery with Matias
        Karsikas and Milla Vaahtera. .
      </p>
    </div>
    <div class="grid__images-wrapper">
      <div
        v-for="product in products"
        :key="product.id"
        @click="onSlide(product.id)"
        class="cursor-pointer hover:opacity-70 transition-opacity"
      >
        <img :src="product.thumbnailUrl" :alt="product.name" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid__wrapper {
  display: flex;
  margin: clamp(15px, 3vw, 50px);

  @media (max-width: 890px) {
    flex-direction: column;
    margin-top: 34px;
  }

  .grid__text-content {
    flex: 1 0 300px;
    padding-right: 30px;
    padding-bottom: 30px;

    .grid__title {
      font-family: "Proxima Nova Rg";
      font-size: 32px;
      line-height: 1.2em;
      text-transform: none;
      text-decoration: none;
      letter-spacing: 0.01em;
      font-weight: 400;
      font-style: normal;
      color: #333;
      margin-bottom: 18px;
    }
    p {
      line-height: 1.7em;
      letter-spacing: 0.02em;
      font-weight: 300;
      font-style: normal;
    }

    @media (max-width: 890px) {
      flex: 0 0 100%;

      .grid__title,
      p {
        text-align: center;
      }
    }
  }

  .grid__images-wrapper {
    display: grid;
    justify-content: stretch;
    gap: clamp(15px, 2vw, 40px);
    grid-template: repeat(1, 1fr) / repeat(1, 1fr);

    @media (min-width: 360px) {
      grid-template: repeat(1, 1fr) / repeat(2, 1fr);
    }
    @media (min-width: 560px) {
      grid-template: repeat(1, 1fr) / repeat(3, 1fr);
    }
    @media (min-width: 1180px) {
      grid-template: repeat(1, 1fr) / repeat(4, 1fr);
    }
    @media (min-width: 1400px) {
      grid-template: repeat(1, 1fr) / repeat(5, 1fr);
    }
    @media (min-width: 1700px) {
      grid-template: repeat(1, 1fr) / repeat(6, 1fr);
    }
    @media (min-width: 2000px) {
      grid-template: repeat(1, 1fr) / repeat(7, 1fr);
    }
    @media (min-width: 2300px) {
      grid-template: repeat(1, 1fr) / repeat(8, 1fr);
    }
  }
}
</style>
