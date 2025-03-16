import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "<https://localhost:3000>";

  let axiosInstance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });

  return {
    provide: { axios: axiosInstance },
  }
});