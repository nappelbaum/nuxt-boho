export default class GetService {
  static async getProducts() {
    try {
      const { data } = await useFetch("http://127.0.0.1:8000/api/products", {
          method: "GET",
        })

      return data.value;
    } catch (e) {
      return null;
    }
  }

  static async getProductsAxios() {
    try {
      const { $axios } = useNuxtApp()
      const response = await $axios.get('http://127.0.0.1:8000/api/products')

      console.log($axios.create().interceptors);

      return response
    } catch (e) {
      return null;
    }
  }

  // static async getProductsOld() {
  //   try {
  //     const { data } = await useAsyncData("products", () =>
  //       $fetch("https://app.ecwid.com/api/v3/58958138/products", {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD",
  //         },
  //       })
  //     );

  //     return data.value;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  static async getProduct(slug) {
    try {
      const { data } = await useAsyncData(`product:${slug}`, () =>
        $fetch(`http://127.0.0.1:8000/api/product?slug=${slug}`, {
          method: "GET",
        })
      );
      return data.value;
    } catch (err) {
      return null;
    }
  }

  static async getCategories() {
    try {
      const { data } = await useFetch("http://127.0.0.1:8000/api/categories", {
          method: "GET",
        })

      return data.value;
    } catch (e) {
      return null;
    }
  }

  // получение всех банков без кредитов
  static async getBanksOnly() {
    try {
      const { data } = await useAsyncData("bank", () =>
        $fetch("https://laravel.bohohome.ru/api/banks", {
          method: "GET",
        })
      );

      return data;
    } catch (err) {
      return null;
    }
  }
}
