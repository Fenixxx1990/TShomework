interface IPaymentAPI {
  getPaymentDetail(i: number): IPaymentDetail | undefined;
}

interface IPaymentDetail {
  id: number;
  sum: number;
}

class PaymentAPI implements IPaymentAPI {
  private data = [{ id: 1, sum: 10000 }];

  getPaymentDetail(i: number): IPaymentDetail | undefined {
    return this.data.find((d) => d.id === i);
  }
}

class PaymentAccessProxy implements IPaymentAPI {
  constructor(
    private api: PaymentAPI,
    private userId: number,
  ) {}

  getPaymentDetail(i: number): IPaymentDetail | undefined {
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
