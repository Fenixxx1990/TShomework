interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: "" };
let b: IB = { a: 10, c: true };

interface IDifference {
  b: string;
}

function difference<T extends object, U extends object>(
  obj1: T,
  obj2: U,
): Omit<T, keyof U> {
  const result = { ...obj1 };

  (Object.keys(obj2) as (keyof U)[]).forEach((key) => {
    if (key in result) {
      delete (result as any)[key];
    }
  });

  return result as Omit<T, keyof U>;
}

let v0: IDifference = difference(a, b);
