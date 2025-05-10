<script setup>
import GetService from "../../API/GetService.js";
import { getFavorites } from '~/utils/useFavorites';
import TheCard from '~/components/card/TheCard.vue';
import GridFavorite from '~/components/card/GridFavorite.vue';

const favorites = useFavorites();
const favoritesProducts = useFavoritesProducts();
const error = ref(false);
const loading = ref(false);

const fetchFavoritesProducts = async () => {
    loading.value = true;

    const favorites = await getFavorites();

    const data = await GetService.getFavoritesProducts(favorites);

    loading.value = false;

    if (!data) {
      error.value = true;
      return;
    }

    favoritesProducts.value = data;
};

fetchFavoritesProducts();

onMounted(() => {
  watch(favorites, () => fetchFavoritesProducts(), {deep: true})
})

</script>

<template>
    <div v-if="favoritesProducts">
      <section v-if="loading"></section>
      <section v-else class="category">
        <div v-if="error" class="mt-44">Ошибка загрузки</div>
        <div v-else class="main-container">
          <h1 class="text-4xl mb-4">Избранное</h1>
          <div v-if="!favoritesProducts.length">
            <h5 class="text-2xl">Нет товаров в избранном</h5>
          </div>
          <div v-else class="category__images-wrapper">
              <div
                v-for="product in favoritesProducts"
                :key="product.id"  
                class="category__images-border">
                    <the-card :product="product" />
                    <grid-favorite :productId="product.id" />
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