### Book service

Це платформа, де користувачі можуть переглядати каталог електронних книг, брати книги в оренду або додавати їх до списку для читання. Адміністратори можуть додавати нові книги та керувати їх доступністю. Платформа також може надавати рекомендації на основі історії читання користувача.
Проект базується на мікросервісах, які взаємодіють через меседж брокер для забезпечення асинхронної обробки запитів.

# Backend
## Instruction to UP

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
  
# Frontend
## Instruction to UP
1. npm install
2. npm run dev
