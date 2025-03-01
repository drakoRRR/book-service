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

  
# Frontend
## Instruction to UP
1. npm install
2. npm run dev
