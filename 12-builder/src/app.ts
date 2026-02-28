class RequestBuilder {
  private method: string = "GET";
  private url: string = "";
  private headers: Record<string, string> = {};
  private body: any = null;
  private options: RequestInit = {};

  // Устанавливает HTTP-метод (GET, POST и т. д.)
  setMethod(method: string): this {
    this.method = method.toUpperCase();
    return this;
  }

  // Устанавливает URL для запроса
  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  // Добавляет отдельный заголовок
  setHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  // Устанавливает несколько заголовков сразу
  setHeaders(headers: Record<string, string>): this {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  // Устанавливает тело запроса (автоматически сериализует в JSON для POST/PUT)
  setBody(body: any): this {
    this.body = body;
    return this;
  }

  // Устанавливает дополнительные опции fetch
  setOptions(options: RequestInit): this {
    this.options = options;
    return this;
  }

  // Выполняет запрос с использованием fetch API
  async exec(): Promise<Response> {
    // Базовая валидация
    if (!this.url) {
      throw new Error("URL must be set before executing request");
    }

    // Подготавливаем заголовки
    const requestHeaders: HeadersInit = {
      ...this.headers,
    };

    // Для POST/PUT запросов с телом добавляем Content-Type
    if (this.body && ["POST", "PUT", "PATCH"].includes(this.method)) {
      requestHeaders["Content-Type"] = "application/json";
    }

    // Формируем конфигурацию запроса
    const config: RequestInit = {
      method: this.method,
      headers: requestHeaders,
      ...this.options,
    };

    // Добавляем тело, если оно есть и метод это поддерживает
    if (this.body) {
      config.body = JSON.stringify(this.body);
    }

    try {
      const response = await fetch(this.url, config);

      // Проверяем статус ответа (опционально)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }
}

// Пример использования
(async () => {
  try {
    // Пример GET-запроса
    const getResponse = await new RequestBuilder()
      .setMethod("GET")
      .setUrl("https://api.example.com/users")
      .setHeader("Authorization", "Bearer token123")
      .setHeader("Accept", "application/json")
      .exec();

    console.log("GET response:", await getResponse.json());

    // Пример POST-запроса с телом
    const postResponse = await new RequestBuilder()
      .setMethod("POST")
      .setUrl("https://api.example.com/users")
      .setHeaders({
        Authorization: "Bearer token123",
        "Content-Type": "application/json",
      })
      .setBody({
        name: "John Doe",
        email: "john@example.com",
      })
      .exec();

    console.log("POST response:", await postResponse.json());

    // Пример с дополнительными опциями fetch
    const customResponse = await new RequestBuilder()
      .setMethod("PUT")
      .setUrl("https://api.example.com/users/123")
      .setHeader("Authorization", "Bearer token123")
      .setBody({ name: "Updated Name" })
      .setOptions({
        signal: AbortSignal.timeout(5000), // Таймаут 5 секунд
      })
      .exec();

    console.log("Custom response:", await customResponse.json());
  } catch (error) {
    console.error("Error:", error);
  }
})();
