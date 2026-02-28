"use strict";
class ProductAPI {
    async getProduct(id) {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}
class ProductProxy {
    constructor() {
        this.api = new ProductAPI();
    }
    async getProduct(id) {
        // Проверка условия: ID должен быть меньше 10
        if (id >= 10) {
            return Promise.reject(new Error("Product ID must be less than 10"));
        }
        console.log(`Proxy: Forwarding request for product ID ${id} to API...`);
        try {
            const product = await this.api.getProduct(id);
            console.log(`Proxy: Successfully retrieved product: ${product.title}`);
            return product;
        }
        catch (error) {
            console.error(`Proxy: Error fetching product ${id}:`, error);
            throw error;
        }
    }
}
// Создаём прокси
const productProxy = new ProductProxy();
// Тест с ID < 10 — должен сработать
productProxy
    .getProduct(1)
    .then((product) => {
    console.log("Получен продукт:", product);
})
    .catch((error) => {
    console.error("Ошибка:", error.message);
});
// Тест с ID >= 10 — должен вернуть ошибку
productProxy
    .getProduct(15)
    .then((product) => {
    console.log("Получен продукт:", product);
})
    .catch((error) => {
    console.error("Ошибка:", error.message); // Выведет: "Product ID must be less than 10"
});
