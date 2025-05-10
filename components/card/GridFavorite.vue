<script setup>
import { setFavorites, deleteFavorites } from '~/utils/useFavorites'

const favorites = useFavorites();

const props = defineProps({
    productId: Number,
});

const addInFavorites = (productId) => {
  if(!favorites.value.find((id) => id == productId)) favorites.value.push(productId)
  if(favorites.value.length) setFavorites(favorites.value)
  else deleteFavorites()
}

const removeFromFavorites = (productId) => {
  if(favorites.value.find((id) => id == productId))
    favorites.value.splice(favorites.value.indexOf(productId), 1)
    if(favorites.value.length) setFavorites(favorites.value)
    else deleteFavorites()
}

</script>

<template>
    <div
        v-if="!favorites.find((id) => id == props.productId)"
        class="cursor-pointer flex items-center justify-center grid__image-favorite"
        title="Добавить в избранное"
        @click="() => addInFavorites(props.productId)"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" width="16px" height="16px">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.877 12.52q.081-.115.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753q.066.123.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025q.44-.418.789-.915zm-14.916.425L12 18.667l6.04-5.722q.293-.279.525-.61l.673-.961a.3.3 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002l-.006-.064a3.98 3.98 0 0 0-1.232-2.51 4 4 0 0 0-6.031 5.193q.014.045.044.086l.673.961a4 4 0 0 0 .526.61"></path>
        </svg>
    </div>

    <div
        v-else
        class="cursor-pointer flex items-center justify-center grid__image-favorite grid__image-favorite-active"
        title="Удалить из избранного"
        @click="() => removeFromFavorites(props.productId)"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" width="16px" height="16px">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.877 12.52q.081-.115.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753q.066.123.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025q.44-.418.789-.915zm-14.916.425L12 18.667l6.04-5.722q.293-.279.525-.61l.673-.961a.3.3 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002l-.006-.064a3.98 3.98 0 0 0-1.232-2.51 4 4 0 0 0-6.031 5.193q.014.045.044.086l.673.961a4 4 0 0 0 .526.61"></path>
        </svg>
    </div>
</template>

<style lang="scss" scoped>

.grid__image-favorite-active {
    background-color: rgb(131, 238, 131) !important;
}

</style>