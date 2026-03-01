"use strict";
// 2. Класс итератора с исправленной типизацией
class ArrayIterator {
    constructor(items) {
        this.position = 0;
        this.items = items;
    }
    hasNext() {
        return this.position < this.items.length;
    }
    next() {
        if (this.position >= this.items.length) {
            return { done: true, value: undefined };
        }
        const value = this.items[this.position];
        // Явная проверка на undefined — убеждаем TypeScript, что value имеет тип T
        if (value === undefined) {
            return { done: true, value: undefined };
        }
        this.position++;
        return { done: false, value };
    }
    reset() {
        this.position = 0;
    }
}
// 3. Основной класс коллекции с исправленными методами
class ItemCollection {
    constructor(items) {
        this.items = items;
    }
    // Итератор по ID (по возрастанию)
    createIdIterator() {
        const sortedItems = [...this.items].sort((a, b) => a.id - b.id);
        return new ArrayIterator(sortedItems);
    }
    // Итератор по дате (по возрастанию, формат DD-MM-YYYY)
    createDateIterator() {
        try {
            const sortedItems = [...this.items].sort((a, b) => {
                const dateA = this.parseDate(a.date);
                const dateB = this.parseDate(b.date);
                return dateA.getTime() - dateB.getTime();
            });
            return new ArrayIterator(sortedItems);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Ошибка сортировки по дате:", error.message);
            }
            // Возвращаем пустой итератор при ошибке — это валидный Iterator<Item>
            return new ArrayIterator([]);
        }
    }
    // Исправленный метод парсинга даты с полной валидацией
    parseDate(dateString) {
        // Проверка входной строки
        if (!dateString || typeof dateString !== "string") {
            throw new Error("Дата должна быть непустой строкой");
        }
        const parts = dateString.trim().split("-");
        // Проверяем, что у нас ровно 3 части
        if (parts.length !== 3) {
            throw new Error(`Некорректный формат даты: ${dateString}. Ожидаемый формат: DD-MM-YYYY`);
        }
        // Безопасное извлечение и преобразование
        const dayStr = parts[0];
        const monthStr = parts[1];
        const yearStr = parts[2];
        // Явная проверка на undefined
        if (dayStr === undefined ||
            monthStr === undefined ||
            yearStr === undefined) {
            throw new Error(`Неполные данные в дате: ${dateString}`);
        }
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);
        // Проверка на корректность чисел
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            throw new Error(`Некорректные числовые значения в дате: ${dateString}`);
        }
        // Дополнительная валидация диапазонов
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
            throw new Error(`Недопустимые значения даты: ${dateString}`);
        }
        return new Date(year, month - 1, day);
    }
}
// 4. Пример использования с корректной обработкой undefined
const items = [
    { id: 2, date: "15-03-2023", title: "Тест 3" },
    { id: 1, date: "01-01-2023", title: "Тест 1" },
    { id: 3, date: "10-02-2023", title: "Тест 2" },
    { id: 4, date: "20-04-2023", title: "Тест 4" },
];
// Создаём коллекцию
const collection = new ItemCollection(items);
// Итерация по ID
console.log("=== Итерация по ID ===");
const idIterator = collection.createIdIterator();
let result = idIterator.next();
while (!result.done) {
    const item = result.value;
    if (item !== undefined) {
        console.log(`ID: ${item.id}, Дата: ${item.date}, Заголовок: ${item.title}`);
    }
    result = idIterator.next();
}
// Итерация по дате
console.log("\n=== Итерация по дате ===");
const dateIterator = collection.createDateIterator();
result = dateIterator.next();
while (!result.done) {
    const item = result.value;
    if (item !== undefined) {
        console.log(`ID: ${item.id}, Дата: ${item.date}, Заголовок: ${item.title}`);
    }
    result = dateIterator.next();
}
// Демонстрация reset()
console.log("\n=== Демонстрация reset() ===");
dateIterator.reset();
result = dateIterator.next();
if (!result.done && result.value !== undefined) {
    console.log("Итератор сброшен. Следующий элемент:", result.value.title);
}
