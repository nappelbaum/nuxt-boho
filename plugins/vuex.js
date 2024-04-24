import { createStore } from "vuex";

const store = createStore({
  mutations: {
    setOpen(state, data) {
      state.open = data;
    },
  },
  state: {
    open: false,
  },
  getters: {
    getOpen(state) {
      return state.open;
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
