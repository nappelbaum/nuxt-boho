<script setup>
import { Disclosure } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const open = ref(false);
const route = useRoute();
// const router = useRouter();
const openGridContainer = useOpen();
const moveNav = ref("");
watch(openGridContainer, (value) => (moveNav.value = value ? "open" : "close"));

const navigation = [
  { name: "House of Inspiration", href: "/", current: true },
  { name: "Portfolio", href: "/design", current: false },
  { name: "About", href: "/about", current: true },
  { name: "Etsy", href: "/etsy", current: true },
  { name: "Contact", href: "/contact", current: false },
];

// router.beforeEach(() => {
//   openGridContainer.value = false;
// });
</script>

<template>
  <Disclosure
    as="nav"
    class="bg-white fixed top-0 z-10 w-full font-body main-nav"
    :class="{
      'absolute': route.name == 'items-slug',
      'main-nav__anim-top': moveNav == 'open',
      'main-nav__anim-bottom': moveNav == 'close',
    }"
  >
    <div class="mx-auto shadow-lg px-4 lg:px-8 main-nav__up-wrapper">
      <div
        class="main-nav__up-container relative flex items-center justify-between"
      >
        <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
          <!-- Mobile menu button-->
          <button
            @click="open = !open"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-8 w-8" aria-hidden="true" />
            <XMarkIcon v-else class="block h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <!-- Desktop menu-->
        <div class="flex w-full items-center justify-end lg:justify-between main-nav__container">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex flex-shrink-0 items-center">
              <div class="main-nav__name uppercase tracking-wider font-bold">
                Anastasia Nechayan
              </div>
            </NuxtLink>
            <div class="hidden lg:ml-10 lg:block">
              <div class="menu-item flex space-x-6">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="main-nav__link block py-1 font-body font-medium hover:text-black"
                >
                  <span>
                    {{ item.name }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <control-buttons />
        </div>
      </div>
    </div>

    <!-- Mobile menu-->
    <transition name="mobileMenu">
      <div v-if="open" class="main-nav__mobile-menu lg:hidden lg:h-auto">
        <div class="menu-item space-y-1 px-3 pb-6 pt-6">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block px-3 py-3 text-lg font-body font-medium text-gray-800"
          >
            <div @click="open = false">{{ item.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </transition>
  </Disclosure>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;

.main-nav {
  color: var.$link-color;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.8s;

  &__up-wrapper {
    @media (min-width: 1025px) {
      padding: 0 var.$main-padding-x !important;
    }
  }

  &__up-container {
    height: var.$nav-height;
  }

  &__name {
    font-family: "Proxima Nova Rg", sans-serif;
    font-size: 20px;
    color: #333;
    letter-spacing: 0.1em;

    @media (max-width: 540px) {
      display: none;
    }
  }

  &__mobile-menu {
    position: relative;
    height: calc(100vh - var.$nav-height);
    z-index: 20;
  }

  &__container {
    @media (min-width: calc(var.$main-max-width + var.$main-padding-x)) {
      width: var.$main-max-width;
      margin: 0 auto;
      padding: 0 var.$main-padding-x;
    }
  }
}

.main-nav__link:hover {
  &::after {
    width: 100%;
    opacity: 1;
  }
}

.main-nav__link {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 0;
    background-color: black;
    opacity: 0;
    transition: all 0.3s;
  }
}

.menu-item .router-link-active {
  color: #000;
  transition: all 0.3s;

  @media (max-width: 1024px) {
    font-weight: 600;
  }
}

.mobileMenu-enter-active,
.mobileMenu-leave-active {
  opacity: 1;
  height: calc(100vh - var.$nav-height);
  transition: all 0.3s ease-out;
}

.mobileMenu-enter-from,
.mobileMenu-leave-to {
  opacity: 0;
  height: 0;
}

.main-nav__anim-top {
  bottom: auto;
  animation-name: navMovingToTop;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @media (min-width: 1025px) {
    bottom: 0;
  }
}
.main-nav__anim-bottom {
  animation-name: navMovingToBottom;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @media (min-width: 1025px) {
    animation-name: navMovingToBottomDesktop;
  }
}

@keyframes navMovingToTop {
  from {
    top: calc(100vh - var.$nav-height);
  }
  to {
    top: 0;
  }
}
@keyframes navMovingToBottom {
  from {
    bottom: calc(100vh - var.$nav-height);
  }
  to {
    bottom: 0;
  }
}
@keyframes navMovingToBottomDesktop {
  from {
    top: 0;
  }
  to {
    top: calc(100vh - var.$nav-height);
  }
}
</style>
