#!/bin/bash
# Скрипт для заполнения базы книг с использованием API
# URL API (измените, если требуется)
API_URL="http://localhost:8080/books"

# Функция для отправки запроса
send_book() {
  local json_payload=$1
  echo "Отправка запроса с данными: $json_payload"
  curl -s -X 'POST' "$API_URL" \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "$json_payload"
  echo -e "\n----------------------------\n"
}

# Данные для разных книг
book1='{
  "title": "The Great Adventure",
  "author": "John Doe",
  "genre": "Adventure",
  "description": "A thrilling journey across uncharted lands.",
  "publication_year": 2020,
  "file_url": "http://example.com/adventure.pdf",
  "image_url": "http://example.com/adventure.jpg",
  "pages": 350
}'

book2='{
  "title": "Mystery of the Lost City",
  "author": "Jane Smith",
  "genre": "Mystery",
  "description": "Uncovering secrets of an ancient civilization.",
  "publication_year": 2015,
  "file_url": "http://example.com/lostcity.pdf",
  "image_url": "http://example.com/lostcity.jpg",
  "pages": 280
}'

book3='{
  "title": "Science Fiction Odyssey",
  "author": "Alicia Keys",
  "genre": "Science Fiction",
  "description": "Exploring futuristic realms and advanced technologies.",
  "publication_year": 2018,
  "file_url": "http://example.com/odyssey.pdf",
  "image_url": "http://example.com/odyssey.jpg",
  "pages": 400
}'

book4='{
  "title": "Romantic Escapade",
  "author": "Emily Brown",
  "genre": "Romance",
  "description": "A heartwarming romance set in modern times.",
  "publication_year": 2021,
  "file_url": "http://example.com/romance.pdf",
  "image_url": "http://example.com/romance.jpg",
  "pages": 320
}'

book5='{
  "title": "Historical Reflections",
  "author": "Robert Martin",
  "genre": "History",
  "description": "Analyzing significant moments that shaped our world.",
  "publication_year": 2010,
  "file_url": "http://example.com/history.pdf",
  "image_url": "http://example.com/history.jpg",
  "pages": 500
}'

# Отправка книг
send_book "$book1"
send_book "$book2"
send_book "$book3"
send_book "$book4"
send_book "$book5"

echo "Заполнение базы книгами завершено."
