<script setup>
import GetService from "../../API/GetService.js";
import TheCard from '~/components/card/TheCard.vue';
import GridFavorite from '~/components/card/GridFavorite.vue';

const route = useRoute();
const error = ref(false);

const category = useCategory();
const loading = ref(false);

const fetchCategory = async () => {
    loading.value = true;

    const data = await GetService.getCategory(route.params.slug);

    loading.value = false;

    if (!data) {
      error.value = true;
      return;
    }

    category.value = data;
};

fetchCategory();
</script>

<template>
    <div v-if="category">
        <section v-if="loading"></section>
        <section v-else class="category">
            <div v-if="error">Ошибка загрузки</div>
            <div v-else class="main-container">
                <div class="mb-8 category__text">
                    <h2 class="category__title">{{ category.long_name }}</h2>
                    <div v-html="category.description"></div>
                </div>
                <div class="category__images-wrapper">
                    <div
                    v-for="product in category.products"
                    :key="product.id"  
                    class="category__images-border">
                        <the-card :product="product" />
                        <div class="cursor-pointer flex items-center justify-center grid__image-favorite" title="Добавить в избранное">
                            <grid-favorite />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;
@use "~/assets/scss/base.scss";

.category {
    .category__text {
        @media (max-width: 500px) {
            text-align: center;
        }
        
        .category__title {
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
    }

    .category__images-wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var.$grid-carousel-gap;

        @media (max-width: 400px) {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
        }
        @media (max-width: 512px) {
            gap: calc(var.$grid-carousel-gap * 2);
        }

        
        .category__images-border {
            position: relative;
            flex-grow: 0;
            flex-shrink: 0;
            border: var.$card-border-width solid rgba(14, 14, 14, 0.18);
            border-radius: var.$card-border-rad;

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
</style>