"use strict";
class PaymentAPI {
    constructor() {
        this.data = [{ id: 1, sum: 10000 }];
    }
    getPaymentDetail(i) {
        return this.data.find((d) => d.id === i);
    }
}
class PaymentAccessProxy {
    constructor(api, userId) {
        this.api = api;
        this.userId = userId;
    }
    getPaymentDetail(i) {
        if (this.userId === 1) {
            return this.api.getPaymentDetail(i);
        }
        console.log("Попытка получить данные платежа!");
        return undefined;
    }
}
const proxy = new PaymentAccessProxy(new PaymentAPI(), 1);
console.log(proxy.getPaymentDetail(1));
const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2);
console.log(proxy2.getPaymentDetail(1));
