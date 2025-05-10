<script setup>
import Swiper from "swiper";
import "swiper/css";
import TheCard from '~/components/card/TheCard.vue';
import GridFavorite from '~/components/card/GridFavorite.vue';
import LeftButton from '~/components/UI/LeftButton.vue';
import RightButton from '~/components/UI/RightButton.vue';

const categories = useCategories();
const swiper = ref([]);
const swiperWrapper = ref(null);
// const isMobile = ref(new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i"));

const onPrevSlide = (index) => {
  swiper.value[index]?.slidePrev(1000, false);
}
const onNextSlide = (index) => {
  swiper.value[index]?.slideNext(1000, false);
}

onMounted(async () => {
  swiperWrapper.value.forEach(async (p, i) => {
    if(p.scrollWidth - p.offsetWidth) {

      const cardWrapperWidth = p.offsetWidth;
      const cardWidth = p.children[0].offsetWidth;
      const cardGap = Number(window.getComputedStyle(p).columnGap.slice(0, -2));
      const slidesPerView = cardWrapperWidth / (cardWidth + cardGap);
      const slidesPerGroup = Math.floor(slidesPerView);
      
      categories.value[i].swiper = true;

      await nextTick();
      swiper.value.push(new Swiper(`.swiper${i}`, {
        direction: "horizontal",
        slidesPerView: slidesPerView,
        slidesPerGroup: slidesPerGroup,
        loop: false,
        allowTouchMove: window.innerWidth > 500 ? false : true,
        // allowTouchMove: isMobile.value.test(navigator.userAgent) ? true : false,
      }));
    } else {
      categories.value[i].swiper = false;

      await nextTick();
      swiper.value.push(null);
    }
  });
})
</script>

<template>
  <div
    v-for="(category, index) in categories"
    :key="category.id"
    class="grid__wrapper"
  >
    <div class="grid__text-content font-body">
      <h2 class="grid__title">
        <NuxtLink class="flex items-center gap-2" :to="`/categories/${category.slug}`">
          <span>{{ category.long_name }}</span>
          <right-button :size="24" class="block sm:hidden shrink-0" />
        </NuxtLink>
      </h2>
      <div v-html="category.description"></div>
    </div>

    <div class="grid__images-wrapper" :class="category.swiper && `swiper swiper${index}`">
      <div class="grid__images-carousel" ref="swiperWrapper" :class="category.swiper && 'swiper-wrapper'">
        <div
          v-for="product in category.products"
          :key="product.id"  
          class="grid__images-border" :class="category.swiper && 'swiper-slide'">
            <the-card :product="product" />
            <grid-favorite :productId="product.id" />
        </div>
      </div>
    </div>

    <button
      v-if="category.swiper"
      @click="onPrevSlide(index)"
      class="grid__slider-control grid__slider-control-prev"
      :class="{'grid__slider-control--no-active': !swiper[index]?.translate}"
    >
      <left-button :size="24" />
    </button>
    <button
      v-if="category.swiper"
      @click="onNextSlide(index)"
      class="grid__slider-control grid__slider-control-next"
      :class="{'grid__slider-control--no-active': !(swiper[index]?.snapGrid.at(-1) + swiper[index]?.translate)}"
    >
      <right-button :size="24" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;

.grid__wrapper {
  display: flex;
  margin-bottom: var.$grid-margin;
  position: relative;

  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: var.$grid-margin-sm;
  }

  .grid__text-content {
    flex-basis: var.$grid-text-width;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: var.$grid-text-margin-right;
    padding-top: var.$grid-carousel-padding;
    padding-right: 10px;
    padding-bottom: 16px;

    max-height: calc(var.$card-height + var.$card-caption-margin * 2 + var.$card-caption-font-size * 2 +
      var.$card-caption-line-height * 2 / 3 - var.$card-border-width * 2 + var.$grid-carousel-padding * 2);
    overflow-y: auto;

    @media (max-width: 800px) {
      flex-basis: auto;
      margin-right: 0;
      padding-right: 0;
      max-height: none;
      overflow-y: visible;
    }
    @media (max-width: 500px) {
      text-align: center;
      .grid__title {
        width: 100% !important;
      }
      a {
        justify-content: center;
      }
    }

    .grid__title {
      font-family: "Proxima Nova Rg";
      font-size: 32px;
      line-height: 1.2em;
      text-transform: none;
      text-decoration: none;
      letter-spacing: 0.01em;
      font-weight: 400;
      font-style: normal;
      color: var.$text-color;
      margin-bottom: 16px;
      width: fit-content;

      a:hover {
        color: var.$link-color;
        transition: color 0.15s;
      }
    }

    p {
      line-height: 1.7em;
      letter-spacing: 0.02em;
      font-weight: 300;
      font-style: normal;
    }
  }

  .grid__images-wrapper {
    overflow-x: hidden;
    margin-left: 0 !important;
    margin-right: 0 !important;

    .grid__images-carousel {
      display: flex;
      flex-wrap: nowrap !important;
      column-gap: var.$grid-carousel-gap;
      padding: var.$grid-carousel-padding;
      height: auto !important;
      box-sizing: border-box !important;

      .grid__images-border {
        position: relative;
        flex-grow: 0;
        flex-shrink: 0;
        border: var.$card-border-width solid rgba(14, 14, 14, 0.18);
        border-radius: var.$card-border-rad;
        width: var.$card-width !important;
        height: auto !important;

        &:hover {
          -webkit-box-shadow: 0px 2px 7px 0px rgba(34, 60, 80, 0.5);
          -moz-box-shadow: 0px 2px 7px 0px rgba(34, 60, 80, 0.5);
          box-shadow: 0px 2px 7px 0px rgba(34, 60, 80, 0.5);
          transition: box-shadow 0.2s ease;
        }
        
        &:hover .grid__image-favorite {
          padding: 0.35rem;
          top: 8px;
          visibility: visible;

          svg {
            width: 100%;
            height: 100%;
          }
        }

        .grid__image-favorite {
            position: absolute;
            padding: 0;
            top: 14px;
            right: 8px;
            border-radius: 50%;
            background-color: #fff;
            visibility: hidden;
            opacity: 0.84;
            border: 1px solid var.$round-border-color;
            transition: top 0.15s ease-in;

            svg {
                width: 0;
                height: 0;
            }
        }
      }
    }
  }

    .grid__slider-control {
      position: absolute;
      top: calc(50% - var.$swiper-btn-width / 2);
      width: var.$swiper-btn-width;
      height: var.$swiper-btn-width;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;
      color: rgb(34, 34, 34);
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px 0px, rgba(0, 0, 0, 0.15) 0px 4px 8px 3px;
      transition: transform .1s ease-in;
      z-index: 100;

      opacity: 1;
      transition: opacity .2s ease-in;

      &:hover {
        transform: scale(1.05);
        background-color: #fafafa;
      }

      @media (max-width: 800px) {
        top: inherit;
        bottom: calc(var.$grid-carousel-padding + var.$card-border-width + var.$card-caption-line-height * 2 / 3 +
        var.$card-caption-font-size * 2 + var.$card-caption-margin + var.$card-height / 2.5 - var.$swiper-btn-width / 2);
      }
      @media (max-width: 500px) {
        display: none;
      }
    }
    .grid__slider-control-prev {
      left: calc(var.$grid-text-width + var.$grid-text-margin-right - var.$swiper-btn-width / 2);

      @media (max-width: 800px) {
        left: calc((0px - var.$swiper-btn-width) / 2);
      }
    }
    .grid__slider-control-next {
      right: calc((0px - var.$swiper-btn-width) / 2);
    }
    .grid__slider-control--no-active {
      -moz-animation-name: hideArrow;
      -webkit-animation-name: hideArrow;
      animation-name: hideArrow;
      -moz-animation-duration: 1.4s;
      -webkit-animation-duration: 1.4s;
      animation-duration: 1.4s;
      -moz-animation-direction: normal;
      -webkit-animation-direction: normal;
      animation-direction: normal;
      -moz-animation-iteration-count: 1;
      -webkit-animation-iteration-count: 1;
      animation-iteration-count: 1;

      transform: scale(0);
      opacity: 0;
      width: 0;
      height: 0;
    }
}

@keyframes hideArrow {
  from {
    transform: scale(1);
    opacity: 1;
    width: var.$swiper-btn-width;
    height: var.$swiper-btn-width;
  }
  95% {
    transform: scale(1);
    opacity: 0.1;
    width: var.$swiper-btn-width;
    height: var.$swiper-btn-width;
  }
  to {
    transform: scale(0);
    opacity: 0;
    width: 0;
    height: 0;
  }
}
</style>
