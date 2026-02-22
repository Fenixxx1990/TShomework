"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRequestStatus;
(function (UserRequestStatus) {
    UserRequestStatus["PENDING"] = "PENDING";
    UserRequestStatus["SUCCESS"] = "SUCCESS";
    UserRequestStatus["ERROR"] = "ERROR";
})(UserRequestStatus || (UserRequestStatus = {}));
var UserField;
(function (UserField) {
    UserField["ID"] = "id";
    UserField["FIRST_NAME"] = "firstName";
    UserField["LAST_NAME"] = "lastName";
    UserField["AGE"] = "age";
    UserField["GENDER"] = "gender";
})(UserField || (UserField = {}));
async function fetchAndDisplayUsers() {
    const url = "https://dummyjson.com/users";
    let status = UserRequestStatus.PENDING;
    console.log("Отправка запроса на получение пользователей...");
    try {
        const response = await fetch(url);
        if (!response.ok) {
            status = UserRequestStatus.ERROR;
            throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        status = UserRequestStatus.SUCCESS;
        console.log(`\n✅ Статус запроса: ${status}`);
        console.log(`📦 Получено пользователей: ${data.total}`);
        console.log(`🔎 Пропущено: ${data.skip}, Лимит: ${data.limit}\n`);
        console.log("👥 Список пользователей:");
        console.log("-".repeat(50));
        data.users.forEach((user, index) => {
            console.log(`${index + 1}.`);
            console.log(`   ${UserField.ID}: ${user.id}`);
            console.log(`   ${UserField.FIRST_NAME}: ${user.firstName}`);
            console.log(`   ${UserField.LAST_NAME}: ${user.lastName}`);
            console.log(`   ${UserField.AGE}: ${user.age}`);
            console.log(`   ${UserField.GENDER}: ${user.gender}`);
            console.log("");
        });
    }
    catch (error) {
        status = UserRequestStatus.ERROR;
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else {
            errorMessage = String(error);
        }
        console.error(`\n❌ Статус запроса: ${status}`);
        console.error("❌ Произошла ошибка при получении данных:");
        console.error(errorMessage);
    }
    finally {
        console.log("\n--- Завершение выполнения функции ---");
    }
}
// Вызов функции
fetchAndDisplayUsers().catch((error) => {
    console.error("Критическая ошибка в функции fetchAndDisplayUsers:", error);
});
//# sourceMappingURL=app.js.map