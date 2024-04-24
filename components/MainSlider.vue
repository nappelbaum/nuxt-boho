<script setup>
import Swiper from "swiper";
import "swiper/css";

const props = defineProps({
  currentId: Object,
});

const currentId = computed(() => props.currentId);

const products = useProducts();
const swiper = ref({});
const activeIndex = useActiveIndex();

const setSwiper = () => {
  swiper.value = new Swiper(".swiper", {
    direction: "horizontal",
    spaceBetween: "2%",
    loop: false,
  });

  swiper.value?.slideTo(activeIndex.value, false);
};

const setSwiperAfterTick = async () => {
  await nextTick();
  setSwiper();
};

const slideToId = (currentId) => {
  const index = products.value.findIndex((product) => product.id === currentId);
  if (index >= 0) {
    swiper.value?.slideTo(index, false);
  }
};

onMounted(() => {
  setSwiper();
});

watch(products, setSwiperAfterTick, { deep: true });

watch(swiper, (value) => (activeIndex.value = value.activeIndex), {
  deep: true,
});

watch(currentId, (value) => slideToId(value.id), { deep: true });
</script>

<template>
  <div class="swiper portfolio__slider">
    <div class="swiper-wrapper">
      <NuxtLink
        v-for="(product, i) in products"
        :key="product.id"
        :to="`/items/${product.id}`"
        @click="activeIndex = i"
        class="swiper-slide portfolio__img"
      >
        <img :src="product.imageUrl" :alt="product.name" />
      </NuxtLink>
    </div>

    <div class="slider-control">
      <div @click="swiper.slidePrev(1000, false)" class="slider-control__half">
        <div v-show="swiper.activeIndex" class="slider-control__left">
          <img src="/img/chevron-left.svg" alt="left" />
        </div>
      </div>

      <div @click="swiper.slideNext(1000, false)" class="slider-control__half">
        <NuxtLink
          :to="`/items/${products[activeIndex]?.id}`"
          class="portfolio__info cursor-pointer"
          @click.stop=""
        >
          <img src="/img/info.svg" alt="info" />
        </NuxtLink>
        <div
          v-show="swiper.activeIndex < products.length - 1"
          class="slider-control__right"
        >
          <img src="/img/chevron-right.svg" alt="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/main.scss";

.portfolio__slider {
  position: relative;
  height: 100vh;
  width: 100vw;

  .portfolio__img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slider-control {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - $nav-height);
    display: flex;
    z-index: 10;

    @media (max-width: 880px) {
      display: none;
    }

    .slider-control__half {
      flex: 0 0 50%;
      position: relative;

      &:hover > div {
        opacity: 1;
      }

      .portfolio__info {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 44px;
        height: 44px;
        user-select: none;
      }

      .slider-control__left,
      .slider-control__right {
        position: absolute;
        width: 44px;
        height: 44px;
        top: calc(50% - 22px);
        cursor: pointer;
        user-select: none;
        opacity: 0;
        transition: opacity 0.2s;
      }

      .slider-control__left {
        left: 16px;
      }
      .slider-control__right {
        right: 16px;
      }
    }
  }
}
</style>
