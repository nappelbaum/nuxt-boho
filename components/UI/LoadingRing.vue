<template>
    <div class="loading-ring"></div>
</template>

<style lang="scss" scoped>

.loading-ring::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(37, 37, 37, 0.5) url("/img/loading_icon.gif") center / 50px no-repeat;
    z-index: 99999;
    transition: all 0.5s ease 0s;
}

</style>