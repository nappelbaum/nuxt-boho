<script setup>
const props = defineProps({
    product: Object,
});
</script>

<template>
    <NuxtLink
        :to="`/items/${props.product.slug}`"
        class="cursor-pointer inline-block w-full h-full grid__link"
    >
        <div class="grid__image-wrapper">
            <div class="grid__image-wrapper-content">
                <picture v-if="props.product.images && props.product.images[0]?.copy_main">
                    <img
                        :srcset="`http://127.0.0.1:8000/${props.product.images[0].copy_400?.replace(/ /g, '%20') || props.product.images[0].copy_main.replace(/ /g, '%20')} 1x, http://127.0.0.1:8000/${props.product.images[0].copy_800?.replace(/ /g, '%20') || props.product.images[0].copy_main.replace(/ /g, '%20')} 2x, http://127.0.0.1:8000/${props.product.images[0].copy_1200?.replace(/ /g, '%20') || props.product.images[0].copy_main.replace(/ /g, '%20')} 3x`"
                        :src="'http://127.0.0.1:8000/' + props.product.images[0].copy_main"
                        :alt="props.product.name"
                        loading="lazy"
                    />
                </picture>
                <img v-else src="http://127.0.0.1:8000/img/no-image-available.webp" :alt="props.product.name"/>
            </div>
        </div>
        <div class="grid__images-caption" :title="props.product.name">
            <p>{{ props.product.name }}</p>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;

.grid__link {
    border-radius: var.$card-border-rad;
    background-color: #f8f8f8a6;
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
</style>