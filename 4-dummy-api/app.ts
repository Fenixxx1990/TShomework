enum UserRequestStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

enum UserField {
  ID = "id",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  AGE = "age",
  GENDER = "gender",
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

async function fetchAndDisplayUsers(): Promise<void> {
  const url: string = "https://dummyjson.com/users";
  let status: UserRequestStatus = UserRequestStatus.PENDING;

  console.log("Отправка запроса на получение пользователей...");

  try {
    const response: Response = await fetch(url);

    if (!response.ok) {
      status = UserRequestStatus.ERROR;
      throw new Error(
        `HTTP error! Status: ${response.status} ${response.statusText}`,
      );
    }

    const data: UsersResponse = await response.json();
    status = UserRequestStatus.SUCCESS;

    console.log(`\n✅ Статус запроса: ${status}`);
    console.log(`📦 Получено пользователей: ${data.total}`);
    console.log(`🔎 Пропущено: ${data.skip}, Лимит: ${data.limit}\n`);

    console.log("👥 Список пользователей:");
    console.log("-".repeat(50));

    data.users.forEach((user: User, index: number) => {
      console.log(`${index + 1}.`);
      console.log(`   ${UserField.ID}: ${user.id}`);
      console.log(`   ${UserField.FIRST_NAME}: ${user.firstName}`);
      console.log(`   ${UserField.LAST_NAME}: ${user.lastName}`);
      console.log(`   ${UserField.AGE}: ${user.age}`);
      console.log(`   ${UserField.GENDER}: ${user.gender}`);
      console.log("");
    });
  } catch (error: unknown) {
    status = UserRequestStatus.ERROR;

    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    console.error(`\n❌ Статус запроса: ${status}`);
    console.error("❌ Произошла ошибка при получении данных:");
    console.error(errorMessage);
  } finally {
    console.log("\n--- Завершение выполнения функции ---");
  }
}

// Вызов функции
fetchAndDisplayUsers().catch((error) => {
  console.error("Критическая ошибка в функции fetchAndDisplayUsers:", error);
});
