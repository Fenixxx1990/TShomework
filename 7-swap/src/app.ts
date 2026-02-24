function swapKeysAndValues<T extends Record<string, number>>(
  obj: T,
): Record<number, string> {
  const result: Record<number, string> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[value as number] = key;
    }
  }

  return result;
}

// С числовыми значениями
const numbers = { x: 10, y: 20 };
console.log(swapKeysAndValues(numbers)); // { '10': 'x', '20': 'y' }

// Пустой объект
const empty = {};
console.log(swapKeysAndValues(empty)); // {}
