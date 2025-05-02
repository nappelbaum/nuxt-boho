<script setup>
const open = useOpen();
</script>

<template>
  <ul
    class="flex pl-5 lg:pl-3 lg:border-l lg:border-l-slate-300 lg:text-gray-500"
  >
    <li>
      <NuxtLink
        to="/lk"
        class="cursor-pointer flex items-center justify-center control__link"
        title="Личный кабинет"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20px" height="20px">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </NuxtLink>
    </li>

    <li>
      <NuxtLink
        to="/lk"
        class="p-3 cursor-pointer flex items-center justify-center control__link"
        title="Избранное"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" width="20px" height="20px">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.877 12.52q.081-.115.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753q.066.123.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025q.44-.418.789-.915zm-14.916.425L12 18.667l6.04-5.722q.293-.279.525-.61l.673-.961a.3.3 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002l-.006-.064a3.98 3.98 0 0 0-1.232-2.51 4 4 0 0 0-6.031 5.193q.014.045.044.086l.673.961a4 4 0 0 0 .526.61"></path>
        </svg>
      </NuxtLink>
    </li>

    <li>
      <NuxtLink
        to="/lk"
        class="p-3 cursor-pointer flex items-center justify-center control__link"
        title="Корзина"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" width="20px" height="20px">
          <path fill-rule="evenodd" clip-rule="evenodd" d="m5.766 5-.618-3H1v2h2.518l2.17 10.535L6.18 17h14.307l2.4-12zM7.82 15l-1.6-8h14.227l-1.6 8z"></path><path d="M10.667 20.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8.333 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
        </svg>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .control__link {
    padding: 0.65rem;
    position: relative;
    
    svg {
      z-index: 100;
    }

    &::after {
      content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        transition: all 0.1s ease-out;
    }

    &:hover {
      &:after {
        content: "";
        position: absolute;
        width: 105%;
        height: 105%;
        border-radius: 50%;
        background-color: rgb(227, 246, 255);
      }
    }
  }
</style>