export default class GetService {

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

  static async getCategory(slug) {
    try {
      const { data } = await useAsyncData(`category:${slug}`, () =>
        $fetch(`http://127.0.0.1:8000/api/category?slug=${slug}`, {
          method: "GET",
        })
      );
      return data.value;
    } catch (err) {
      return null;
    }
  }

  static async getCategoriesSimple() {
    try {
      const { data } = await useFetch("http://127.0.0.1:8000/api/categories_simple", {
          method: "GET",
        })

      return data.value;
    } catch (e) {
      return null;
    }
  }

  static async getMainInfo() {
    try {
      const { data } = await useFetch("http://127.0.0.1:8000/api/pages/main", {
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
