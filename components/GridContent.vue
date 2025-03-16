<script setup>
import Swiper from "swiper";
import "swiper/css";

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
        allowTouchMove: false,
        // allowTouchMove: isMobile.value.test(navigator.userAgent) ? true : false,
      }));
    } else {
      categories.value[i].swiper = false;

      await nextTick();
      swiper.value.push(null);
    }
  });

  console.log(swiper.value);
})
</script>

<template>
  <div
    v-for="(category, index) in categories"
    :key="category.id"
    class="grid__wrapper"
  >
    <div class="grid__text-content font-body">
      <h2 class="grid__title">{{ category.long_name }}</h2>
      <div v-html="category.description"></div>
    </div>
    <div class="grid__images-wrapper" :class="category.swiper && `swiper swiper${index}`">
      <div class="grid__images-carousel" ref="swiperWrapper" :class="category.swiper && 'swiper-wrapper'">
        <div
          v-for="product in category.products"
          :key="product.id"  
          class="grid__images-border" :class="category.swiper && 'swiper-slide'">
            <NuxtLink
              :to="`/items/${product.slug}`"
              class="cursor-pointer inline-block w-full h-full"
            >
              <div class="grid__image-wrapper">
                <div class="grid__image-wrapper-content">
                  <img :src="'http://127.0.0.1:8000/' + product.images[0].copy_800" :alt="product.name" />
                </div>
              </div>
              <div class="grid__images-caption">
                <p>{{ product.name }}</p>
              </div>
            </NuxtLink>
            <div class="cursor-pointer flex items-center justify-center grid__image-favorite" title="Добавить в избранное">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" width="16px" height="16px">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.877 12.52q.081-.115.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753q.066.123.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025q.44-.418.789-.915zm-14.916.425L12 18.667l6.04-5.722q.293-.279.525-.61l.673-.961a.3.3 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002l-.006-.064a3.98 3.98 0 0 0-1.232-2.51 4 4 0 0 0-6.031 5.193q.014.045.044.086l.673.961a4 4 0 0 0 .526.61"></path>
              </svg>
            </div>
        </div>
      </div>

      <button
        v-if="category.swiper"
        @click="onPrevSlide(index)"
        class="grid__slider-control grid__slider-control-prev"
        :class="{'grid__slider-control--no-active': !swiper[index]?.translate}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="24px" height="24px">
          <path d="M16,21a0.994,0.994,0,0,1-.664-0.253L5.5,12l9.841-8.747a1,1,0,0,1,1.328,1.494L8.5,12l8.159,7.253A1,1,0,0,1,16,21Z"></path>
        </svg>
      </button>
      <button
        v-if="category.swiper"
        @click="onNextSlide(index)"
        class="grid__slider-control grid__slider-control-next"
        :class="{'grid__slider-control--no-active': !(swiper[index]?.snapGrid.at(-1) + swiper[index]?.translate)}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="24px" height="24px">
          <path d="M8,21a1,1,0,0,1-.664-1.747L15.5,12,7.336,4.747A1,1,0,0,1,8.664,3.253L18.5,12,8.664,20.747A0.994,0.994,0,0,1,8,21Z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;

.grid__wrapper {
  display: flex;
  margin-bottom: var.$grid-margin;

  .grid__text-content {
    flex-basis: clamp(280px, 14vw, 340px);
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 20px;
    padding-top: var.$grid-carousel-padding;
    padding-right: 10px;
    padding-bottom: 16px;

    max-height: calc(var.$card-height + var.$card-caption-margin * 2 + var.$card-caption-font-size * 2 +
      var.$card-caption-line-height * 2 / 3 - var.$card-border-width * 2 + var.$grid-carousel-padding * 2);
    overflow-y: auto;

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
  }

  .grid__images-wrapper {
    overflow-x: hidden;
    margin-left: 0 !important;
    margin-right: 0 !important;

    .grid__images-carousel {
      display: flex;
      flex-wrap: nowrap !important;
      column-gap: clamp(15px, 1.5vw, 20px);
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

        a {
          border-radius: var.$card-border-rad;
        }

        .grid__image-wrapper {
          position: relative;

          &::after {
            content: "";
            padding-top: calc(100% * var.$cart-image-prop);
            display: block;
          }

          .grid__image-wrapper-content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: var.$card-border-rad var.$card-border-rad 0 0;
            }
          }
        }

        .grid__images-caption {
          display: flex;
          align-items: center;
          justify-content: center;
          
          max-width: 100%;
          min-width: 0;
          color: rgb(35 39 43);
          margin: var.$card-caption-margin;

          --max-lines: 2;
          min-height: calc(20px* var(--max-lines));

          p {
            font-size: var.$card-caption-font-size;
            line-height: var.$card-caption-line-height;
            text-align: center;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            overflow: hidden;
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
    }
    .grid__slider-control-prev {
      left: 16px;
    }
    .grid__slider-control-next {
      right: 16px;
    }
    .grid__slider-control--no-active {
      -moz-animation-name: hideArrow;
      -webkit-animation-name: hideArrow;
      animation-name: hideArrow;
      -moz-animation-duration: 2s;
      -webkit-animation-duration: 2s;
      animation-duration: 2s;
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
