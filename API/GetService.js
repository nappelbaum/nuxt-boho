export default class GetService {
  static async getProducts() {
    try {
      const { data } = await useAsyncData("products", () =>
        $fetch("https://app.ecwid.com/api/v3/58958138/products", {
          method: "GET",
          headers: {
            Authorization: "Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD",
          },
        })
      );

      return data.value;
    } catch (e) {
      return null;
    }
  }

  static async getProduct(id) {
    try {
      const { data } = await useAsyncData("product", () =>
        $fetch(`https://app.ecwid.com/api/v3/58958138/products/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD",
          },
        })
      );
      return data.value;
    } catch (err) {
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
