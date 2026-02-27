// types.d.ts

// Импортируем типы из object-path, если доступны
// Если нет — определяем минимально необходимый тип
declare module "object-path" {
  export function get(obj: any, path: string): any;
}

// Тип для функции-фильтра по типу
type TypeFilter = (type: string) => (arg: any) => boolean;

// Тип для функции преобразования значения
type ValueMapper = (property: string, value: any) => any;

// Тип для компаратора — функции сравнения двух объектов
type Comparator<T> = (a: T, b: T) => number;

// Основной тип для функции sortBy
type SortByFunction = (...args: (string | ValueMapper)[]) => Comparator<any>;

// Более точная версия с дженериком
type SortByFunctionGeneric<T> = (
  ...args: (string | ValueMapper)[]
) => Comparator<T>;

// Вспомогательные типы для параметров sort
interface SortOptions {
  property: string;
  map?: ValueMapper;
}

// Экспортируемые типы
declare const type: TypeFilter;
declare const sort: (property: string, map?: ValueMapper) => Comparator<any>;
declare const sortBy: SortByFunction;

// Альтернатива с более строгой типизацией:
declare namespace SortUtils {
  const type: TypeFilter;
  const sort: (property: string, map?: ValueMapper) => Comparator<any>;
  const sortBy: SortByFunction;
}

export = SortUtils;
export as namespace SortUtils;
