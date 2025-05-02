<script setup>

const route = useRoute();

</script>

<template>
  <TheNav />

  <slot />

  <TheFooter v-if="route.name != 'index'" />
</template>
