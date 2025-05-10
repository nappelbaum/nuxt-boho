<script setup>
import Swiper from "swiper";
import "swiper/css";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";


const swiper = ref({});
const thumbnails = ref(null);
const isUpButton = ref(false);
const isDownButton = ref(false);
const scrollStep = 120;
const scrollMicroStep = 4;

Fancybox.bind('[data-fancybox="gallery"]', {
    hideScrollbar: false,
    on: {
        close: (fancybox) => {
            const slide = fancybox.getSlide();
            swiper.value.slideTo(slide.index);
            fancybox.destroy();
        }
    }
})

const props = defineProps({
    images: Array,
    productName: String
});

const thumbnailsScroll = (el) => {
    isUpButton.value = el.scrollTop ? true : false
    isDownButton.value = (el.scrollHeight - (el.offsetHeight + el.scrollTop)) ? true : false
}

const onButtonDownClick = () => {
    const el = thumbnails.value;
    const finishPosition = el.scrollTop + scrollStep;
    let scroller = setInterval(function () {
        if(
            el.scrollTop < finishPosition &&
            el.scrollHeight - (el.offsetHeight + el.scrollTop)
        ) el.scrollTo({ top: el.scrollTop + scrollMicroStep });
        else clearInterval(scroller);
    }, 10);
}

const onButtonUpClick = () => {
    const el = thumbnails.value;
    const finishPosition = el.scrollTop - scrollStep;
    let scroller = setInterval(function () {
        if(
            el.scrollTop > finishPosition &&
            el.scrollTop > 0
        ) el.scrollTo({ top: el.scrollTop - scrollMicroStep });
        else clearInterval(scroller);
    }, 10);
}

const setSwiper = async () => {
  await nextTick();
  swiper.value = new Swiper(".swiper", {
    direction: "horizontal",
    spaceBetween: "2%",
    loop: false,
    allowTouchMove: window.innerWidth > 600 ? false : true,
  });
};

setSwiper();

onMounted(() => {
    if(thumbnails.value.scrollHeight - thumbnails.value.offsetHeight > 0)
        isDownButton.value = true;

        // thumbnails.value.scrollTop = 30;
})
</script>

<template>
    <div class="slider-container">
        <div class="slider-padding">
            <div class="slider-wrapper">
                <div class="slider__thumbnails-container">
                    <div class="slider__thumbnails-wrapper">
                        <button v-if="isUpButton" class="slider__up-button"
                            @click="() => onButtonUpClick()"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ag94-b1" style="transform: rotate(-90deg);">
                                <path fill="currentColor" d="M7.293 1.293a1 1 0 0 0 0 1.414L16.586 12l-9.293 9.293a1 1 0 1 0 1.414 1.414l10-10a1 1 0 0 0 0-1.414l-10-10a1 1 0 0 0-1.414 0"></path>
                            </svg>
                        </button>
                        <div
                            ref="thumbnails"
                            class="slider__thumbnails-imgs-wrapper"
                            @scroll="(e) => thumbnailsScroll(e.target)"
                        >
                            <div
                                v-for="(image, index) in props.images"
                                :key="image.id"
                                class="slider__thumbnail"
                                :class="{'slider__thumbnail-active': swiper.activeIndex == index}"
                                @click="() => swiper.slideTo(index)"
                            >
                                <div class="slider__thumbnail-container">
                                    <div class="slider__thumbnail-padding">
                                        <div class="slider__thumbnail-wrapper">
                                            <img loading="lazy" :src="`http://127.0.0.1:8000/${image.copy_400 || image.copy_main}`" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button v-if="isDownButton" class="slider__down-button"
                            @click="() => onButtonDownClick()"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ag94-b1" style="transform: rotate(90deg);">
                                <path fill="currentColor" d="M7.293 1.293a1 1 0 0 0 0 1.414L16.586 12l-9.293 9.293a1 1 0 1 0 1.414 1.414l10-10a1 1 0 0 0 0-1.414l-10-10a1 1 0 0 0-1.414 0"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <client-only>
                    <div class="slider__imgs-container swiper">
                        <div class="slider__imgs-wrapper swiper-wrapper">
                            <div
                                v-for="image in props.images"
                                :key="image.id"
                                class="swiper-slide"
                            >
                                    <a
                                        data-fancybox="gallery"
                                        :data-src="`http://127.0.0.1:8000/${image.copy_main}`"
                                        class="swiper-slide-img-container"
                                    >
                                        <picture v-if="!image.copy_main.includes(' ')">
                                            <img
                                                :srcset="`http://127.0.0.1:8000/${image.copy_800 || image.copy_main} 1x, http://127.0.0.1:8000/${image.copy_1200 || image.copy_main} 2x, http://127.0.0.1:8000/${image.copy_1600 || image.copy_main} 3x`"
                                                :src="'http://127.0.0.1:8000/' + image.copy_main"
                                                :alt="props.productName"
                                                loading="lazy"
                                            />
                                        </picture>

                                        <picture v-else>
                                            <img
                                                :srcset="`http://127.0.0.1:8000/${image.copy_800?.replace(/ /g, '%20') || image.copy_main.replace(/ /g, '%20')} 1x, http://127.0.0.1:8000/${image.copy_1200?.replace(/ /g, '%20') || image.copy_main.replace(/ /g, '%20')} 2x, http://127.0.0.1:8000/${image.copy_1600?.replace(/ /g, '%20') || image.copy_main.replace(/ /g, '%20')} 3x`"
                                                :src="'http://127.0.0.1:8000/' + image.copy_main"
                                                :alt="props.productName"
                                                loading="lazy"
                                            />
                                        </picture>
                                    </a>
                            </div>
                        </div>
                    </div>
                </client-only>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;

.slider-container {
    width: calc(50% - var.$product-main-gap);
    display: flex;
    align-self: flex-start;
    position: relative;

    @media (max-width: 1024px) {
        width: calc(60% - var.$product-main-gap);
    }
    @media (max-width: 800px) {
        width: 100%;
    }
    @media (max-width: 600px) {
        border-radius: 8px;
        overflow: hidden;
    }

    .slider-padding {
        padding-top: var.$slider-proportion;
        position: relative;
        width: 100%;
        @media (max-width: 600px) {
            padding-top: var.$slider-proportion-mobile;
        }

        .slider-wrapper {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;

            display: flex;
            column-gap: 16px;
            align-items: self-start;

            .slider__thumbnails-container {
                height: 100%;
                @media (max-width: 600px) {
                   display: none;
                }
        
                .slider__thumbnails-wrapper {
                    width: 70px;
                    height: 100%;
                    position: relative;

                    button {
                        background-color: #fff;
                        padding: 4px 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        left: 0;
                        position: absolute;
                        width: 100%;
                        z-index: 2;
                    }

                    .slider__up-button {
                        top: 0;
                    }
                    .slider__down-button {
                        bottom: 0;
                    }

                    .slider__thumbnails-imgs-wrapper {
                        display: flex;
                        flex-direction: column;
                        row-gap: 4px;
                        scrollbar-width: none;
                        overflow: auto;
                        height: 100%;

                        .slider__thumbnail-active {
                            position: relative;

                            &::before {  
                                // display: block;
                                // display: none;
                                border: 2px solid #005bff !important;
                                border-radius: 3px;
                                bottom: 0;
                                content: "";
                                left: 0;
                                position: absolute;
                                right: 0;
                                top: 0;
                                height: 100%;
                                width: 100%;
                            }
                        }

                        .slider__thumbnail {
                            cursor: pointer;
                            position: relative;

                            &:hover:before {
                                border: 2px solid #99bdff;
                                border-radius: 3px;
                                bottom: 0;
                                content: "";
                                left: 0;
                                position: absolute;
                                right: 0;
                                top: 0;
                                height: 100%;
                                width: 100%;
                                // transform: scaleX(0);
                                transition: transform 0.3s;
                            }

                            .slider__thumbnail-container {
                                height: auto;
                                margin: 4px;

                                display: flex;
                                align-items: center;
                                justify-content: center;
                                overflow: hidden;
                                position: relative;
    
                                // height: 48px;

                                .slider__thumbnail-padding {
                                    // padding-top: 133.333%;
                                    padding-top: 113%;
                                    position: relative;
                                    width: 100%;

                                    .slider__thumbnail-wrapper {
                                        height: 100%;
                                        left: 0;
                                        position: absolute;
                                        top: 0;
                                        width: 100%;

                                        img {
                                            height: 100%;
                                            -o-object-fit: cover;
                                            object-fit: cover;
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .slider__imgs-container {
                height: 100%;
                @media (max-width: 600px) {
                    width: 100%;
                }
            }

            .swiper-slide {
                .swiper-slide-img-container {
                    height: 100%;
                    cursor: pointer;

                    img {
                        width: 100%;
                    }
                }
        
                @media (max-width: 600px) {
                   position: relative;
           
                   .swiper-slide-img-container {
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
                           object-position: center;
                       }
                   }
                }

            }
        }
    }



}
</style>