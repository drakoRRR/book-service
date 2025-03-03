### Book service

Це платформа, де користувачі можуть переглядати каталог електронних книг, брати книги в оренду або додавати їх до списку для читання. Адміністратори можуть додавати нові книги та керувати їх доступністю. Платформа також може надавати рекомендації на основі історії читання користувача.
Проект базується на мікросервісах, які взаємодіють через меседж брокер для забезпечення асинхронної обробки запитів.

# Backend
## Instruction to UP

## API Gateway
По цьму урлу можна ознайомитись з документацією всіх ендпоїнтів системи - `http://localhost:8080/api/docs/`
![](backend/gateway/media_readme/gateway_swagger.png)

## User service
* `POST /users/register` — реєстрація нового користувача
* `POST /users/login` — авторизація користувача

### Testing
* Тестування створення нового користувача через Swagger REST API
![test_user_create_image](backend/user/readme_media/test_user_create.png)

* Тестування логіну користувача через Swagger REST API
![test_user_login_image](backend/user/readme_media/test_user_login.png)

## Book service
* `POST /books` — додавання нової книги (для адміністратора)
* `GET /books` — отримання списку доступних книг
* `GET /books/:id` — отримання деталей книги
* `PUT /books/:id` — редагування метаданих книги (адміністратор)

### Testing
* Тестування створення нової книжки через POSTMAN
![test_create_book_image](backend/book/media_readme/test_create_book.png)

* Тестування отримання усіх книжок через POSTMAN
![test_get_books_image](backend/book/media_readme/test_get_books.png)

* Тестування отримання зазначенної книжки по ID через POSTMAN
![test_get_concrete_image](backend/book/media_readme/test_get_concrete_book.png)

* Тестування оновлення полів зазначенної книжки через POSTMAN
![test_update_book_image](backend/book/media_readme/test_update_book.png)


## Reading service
* `POST /reading-progress` — створення запису про прогрес читання
* `GET /reading-progress/:userId` — отримання списку книг, які читає користувач
* `PUT /reading-progress/:id` — оновлення прогресу читання

### Testing
* Тестування створення нового запису читання через POSTMAN
![test_create_reading_progress_image](backend/reading/media_readme/test_create_reading_progress.png)

* Тестування отримання прогресу читання юзера POSTMAN
![test_get_reading_user_progress_image](backend/reading/media_readme/test_get_reading_user_progress.png)

* Тестування оновлення читання через POSTMAN
![test_update_reading_progress_image](backend/reading/media_readme/test_update_reading_progress.png)

# Frontend
## Instruction to UP
1. npm install
2. npm run dev
