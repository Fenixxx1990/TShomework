function allowFunc(validator: (value: any) => boolean) {
  return function (target: any, propertyKey: string) {
    // Создаём приватное поле для хранения значения
    const privateField = `_${propertyKey}`;

    // Определяем свойство с геттером и сеттером
    Object.defineProperty(target, propertyKey, {
      // Геттер: возвращает текущее значение
      get: function () {
        return this[privateField];
      },

      // Сеттер: проверяет значение через валидатор перед присваиванием
      set: function (value: any) {
        if (validator(value)) {
          this[privateField] = value;
        }
        // Если валидация не пройдена, значение не меняется
      },

      // Делаем свойство перечисляемым (будет видно в Object.keys и т. д.)
      enumerable: true,

      // Разрешаем переопределение свойства через Object.defineProperty
      configurable: true,
    });
  };
}

class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}

const person = new User();
console.log(person.age); // 30

person.age = 0;
console.log(person.age); // 30

person.age = 20;
console.log(person.age); // 20
