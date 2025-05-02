<script setup>

const props = defineProps({
    product: Object
});

const activeSize = ref(props.product.sizes ? props.product.sizes[0] : null)

</script>

<template>
    <div class="product__content">
        <h1 class="text-2xl font-body font-bold" style="text-align: start">
            {{ props.product.name }}
        </h1>
        <div class="product__cost font-sans">
            <span v-if="props.product.sizes && props.product.sizes[0]">
                {{ activeSize.cost }} ₽
            </span>
            <span v-else>
                Цена по запросу
            </span>
        </div>

        <div v-if="props.product.sizes && props.product.sizes[0]" class="product__dropdown">  
            <h2 class="font-bold">Размеры и цены:</h2>
            <button
                id="dropdownDefaultButton"
                @click="(e) => e.currentTarget.nextSibling.classList.toggle('hidden')"
                class="w-full text-black bg-stone-50 hover:bg-stone-200 focus:ring-stone-200 rounded-sm text-md pr-5 pl-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                type="button"
            >
                <div class="flex">
                    <span>{{ activeSize.proportion }} см</span>,&nbsp;
                    <span>{{ activeSize.cost }} ₽</span>
                </div>
                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <div id="dropdown" class="w-fullz-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
                <ul class="py-2 text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li
                        v-for="size in props.product.sizes"
                        :key=size.id
                        :class="{'bg-stone-200': size.id == activeSize.id}"
                        class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <button
                            class="block px-4 py-2 w-full"
                            @click="() => activeSize = size"
                        >
                            <div class="flex">
                                <span>{{ size.proportion }} см</span>,&nbsp;
                                <span>{{ size.cost }} ₽</span>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="product__btns">
            <button class="product__cart">
                <span>В корзину</span>
            </button>
        </div>

        <div v-if="props.product.description" class="product__description">
            <h2 class="font-bold">Информация о товаре</h2>
            <div class="product__description--p" v-html="props.product.description"></div>
        </div>

        <div v-if="props.product.materials" class="product__description">
            <h2 class="font-bold">Материалы</h2>
            <div class="product__description--p">
                <p>{{ props.product.materials }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;

.product__content {
    
    width: 50%;

    > * {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .product__cost {
      font-size: 24px;
      font-weight: 600;
    }

    .product__dropdown {
        max-width: 50%;
        font-size: 16px;
        font-weight: 600;
    }

    .product__btns {
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      .product__cart {
        max-width: 50%;

        font-size: 16px;
        font-weight: 600;
        padding: 9px 40px;
        border-radius: 4px;
        color: #fff;
        background-color: #333;
        cursor: pointer;
        transition: opacity 0.3s;

        @media (max-width: 1024px) {
          max-width: 100%;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .product__description {
      padding-top: 8px;
      h2 {
        margin-bottom: 8px;
      }
      p {
        line-height: 1.6;
      }
    }
}
</style>