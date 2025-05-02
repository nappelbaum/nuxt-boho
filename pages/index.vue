<script setup>
import GetService from "../API/GetService.js";

const categoriesSimple = useCategoriesSimple();
const mainInfo = useMainInfo();

const fetchCategoriesSimple = async () => {
  if (!categoriesSimple.value.length) {
    const catsData = await GetService.getCategoriesSimple();
    
    if (!catsData) {
      error.value = true;
      return;
    }

    categoriesSimple.value = catsData;
  }
};

const fetchMainInfo = async () => {
  if (!mainInfo.value) {
    const mainData = await GetService.getMainInfo();

    console.log(mainData)
    
    if (!mainData) {
      error.value = true;
      return;
    }

    mainInfo.value = mainData;
  }
};

fetchMainInfo();
fetchCategoriesSimple();

</script>

<template>
  <div v-if="mainInfo" class="home home__full home__container-lg">
    <div class="home__left-panel">
      <div class="home__text">
        <h5>{{ mainInfo.author_name }}</h5>
        <h1>{{ mainInfo.slogan }}</h1>
        <ul v-if="categoriesSimple.length" class="home__cat-links">
          <li
            v-for="category in categoriesSimple"
            :key="category.id"  
          >
              <NuxtLink :to="`/categories/${category.slug}`">{{ category.long_name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="home__image">
      <div class="home__image-wrapper">
          <picture v-if="!mainInfo.copy_main.includes(' ')">
              <source
                :srcset="`http://127.0.0.1:8000/${mainInfo.copy_800 || mainInfo.copy_main} 1x, http://127.0.0.1:8000/${mainInfo.copy_1200 || mainInfo.copy_main} 2x, http://127.0.0.1:8000/${mainInfo.copy_1600 || mainInfo.copy_main} 3x`"
                media="(max-width: 800px)"
              />
              <img
                :srcset="`http://127.0.0.1:8000/${mainInfo.copy_1600 || mainInfo.copy_main} 1x, http://127.0.0.1:8000/${mainInfo.copy_2400 || mainInfo.copy_main} 2x, http://127.0.0.1:8000/${mainInfo.copy_main} 3x`"
                :src="'http://127.0.0.1:8000/' + mainInfo.copy_main"
                :alt="mainInfo.slogan"
              />
          </picture>

          <picture v-else>
              <source
                :srcset="`http://127.0.0.1:8000/${mainInfo.copy_800?.replace(/ /g, '%20') || mainInfo.copy_main.replace(/ /g, '%20')} 1x, http://127.0.0.1:8000/${mainInfo.copy_1200?.replace(/ /g, '%20') || mainInfo.copy_main.replace(/ /g, '%20')} 2x, http://127.0.0.1:8000/${mainInfo.copy_1600?.replace(/ /g, '%20') || mainInfo.copy_main.replace(/ /g, '%20')} 3x`"
                media="(max-width: 800px)"
              />
              <img
                :srcset="`http://127.0.0.1:8000/${mainInfo.copy_1600?.replace(/ /g, '%20') || mainInfo.copy_main.replace(/ /g, '%20')} 1x, http://127.0.0.1:8000/${mainInfo.copy_2400?.replace(/ /g, '%20') || mainInfo.copy_main.replace(/ /g, '%20')} 2x, http://127.0.0.1:8000/${mainInfo.copy_main.replace(/ /g, '%20')} 3x`"
                :src="'http://127.0.0.1:8000/' + mainInfo.copy_main"
                :alt="mainInfo.slogan"
              />
          </picture>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;
@use "~/assets/scss/base.scss";

.home__container-lg {
    @media (min-width: var.$home-media-lg) {
        width: var.$main-max-width !important;
        margin: 0 auto;
        padding: 0 var.$main-padding-x;
    }
}

.home__full {
    height: 100vh;
    width: 100%;
    padding-top: var.$nav-height;
    overflow: hidden;
    background-color: var.$back-color;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    @media (min-width: var.$home-media-lg) {
      overflow: visible;
    }
}

.home__left-panel {
  position: relative;
  flex: 0 0 48.5%;
  height: 100%;
  background-color: var.$back-color;

  @media (min-width: var.$home-media-lg) {
      top: 0;
      left: 0;
      height: var.$home-lg-width;
      width: var.$home-lg-width;
  }
  @media (max-width: var.$home-media-sm) {
      left: 0;
      right: 0;
      top: 60%;
      height: 40%;
      width: 100%;
      z-index: 5;
      box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.1);
      background-color: var.$back-color-sm;
  }

  .home__text {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    padding: 0 10%;
    color: #fff;
    
    font-family: "Knockout My", "Cinematografica My", sans-serif;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 1;

    h5 {
      font-size: 1.6rem;
      margin-bottom: 2px;
    }

    h1 {
      font-size: 5rem;

      @media (max-width: 1024px) {
        font-size: 4rem;
      }
      @media (max-width: 400px) {
        font-size: 3.4rem;
      }
    }

    ul {
      font-family: "Cinematografica My", sans-serif;
      font-size: 1.6rem;
      margin-top: 30px;
      letter-spacing: 1.8px;

      @media (max-width: var.$home-media-sm) {
          display: none;
      }

      li {
        margin-bottom: 6px;

        a {
          display: inline-block;

          &:hover {
            color: #535252;
            transition: color 0.3s;
          }
        }
      }
    }
  }
}

.home__image {
  flex: 0 0 51.5%;
  height: 100%;
  background-color: var.$back-color;

  @media (min-width: var.$home-media-lg) {
      position: absolute;
      bottom: 0;
      right: 0;
      height: var.$home-lg-width;
      width: var.$home-lg-width;
      box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: var.$home-media-sm) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
  }

  .home__image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>