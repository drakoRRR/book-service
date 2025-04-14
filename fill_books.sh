#!/bin/bash
# Скрипт для заповнення бази даних книг
API_URL="http://localhost:8080/books"

send_book() {
  local json_payload=$1
  echo "📤 Надсилаю: $json_payload"
  curl -s -X 'POST' "$API_URL" \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "$json_payload"
  echo -e "\n----------------------------\n"
}

book1='{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "description": "A chilling depiction of a totalitarian regime and surveillance.",
  "publication_year": 1949,
  "file_url": "1_HfFs3JTBknQ9TUkfyDitv_z497zCy33",
  "image_url": "https://i.ebayimg.com/images/g/u6wAAOSwwX1hN7xf/s-l1200.jpg",
  "pages": 211
}'

book2='{
  "title": "Pride and Prejudice",
  "author": "Jane Austen",
  "genre": "Classic",
  "description": "A story about manners, upbringing, morality and marriage.",
  "publication_year": 1813,
  "file_url": "17zajO-8U4vaTJfd25rxjupTtX_T5xnUL",
  "image_url": "https://cdn.kobo.com/book-images/1a735d96-6075-4bca-87b7-15fb97ee50c7/1200/1200/False/pride-and-prejudice-216.jpg",
  "pages": 403
}'

book3='{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "genre": "Classic",
  "description": "A powerful tale of racial injustice and loss of innocence.",
  "publication_year": 1960,
  "file_url": "1nspTr1IMYkmXY4p5X1u2DpHrqvqlQvkE",
  "image_url": "https://static.yakaboo.ua/media/catalog/product/8/1/816jexyardl.jpg",
  "pages": 215
}'

book4='{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "description": "The prelude to the epic Lord of the Rings saga.",
  "publication_year": 1937,
  "file_url": "1zWcxQT6y8KAEJBZkU1pOwKETXcvUTnlj",
  "image_url": "https://cdn.waterstones.com/bookjackets/large/9780/2611/9780261103344.jpg",
  "pages": 305
}'

book5='{
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger",
  "genre": "Coming-of-Age",
  "description": "A story of teenage rebellion and alienation.",
  "publication_year": 1951,
  "file_url": "1JWwRVFV9UpUGupKKQUBfTd_DU-WeMp1z",
  "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMLZK4bfNO-HXW2Avxunshzf6qKMbgpW87rw&s",
  "pages": 130
}'

book6='{
  "title": "Brave New World",
  "author": "Aldous Huxley",
  "genre": "Dystopian",
  "description": "A futuristic world shaped by technology and control.",
  "publication_year": 1932,
  "file_url": "1TCGl-1fUInaTd55LvwpvpTyiQVYFwquT",
  "image_url": "https://static.yakaboo.ua/media/catalog/product/9/7/9780099518471-2.jpg",
  "pages": 125
}'

book7='{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Adventure",
  "description": "A young shepherds journey in search of treasure.",
  "publication_year": 1988,
  "file_url": "157VVKhpQlfjxd6EBSeK6UUNSsKpDKk9F",
  "image_url": "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
  "pages": 66
}'

book8='{
  "title": "The Da Vinci Code",
  "author": "Dan Brown",
  "genre": "Thriller",
  "description": "A symbologist unravels mysteries hidden in famous artwork.",
  "publication_year": 2003,
  "file_url": "1blzuZAi-tB-jDWwz0e-WnE-kqcCoB3Aq",
  "image_url": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720134686i/30156386.jpg",
  "pages": 68
}'

book9='{
  "title": "Sapiens: A Brief History of Humankind",
  "author": "Yuval Noah Harari",
  "genre": "Non-fiction",
  "description": "An exploration of how Homo sapiens came to dominate the planet.",
  "publication_year": 2011,
  "file_url": "1AdmQImZXMLAtJK3mbPj3pFv1B3LOVZFv",
  "image_url": "https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/7/1/71ukqqzd-vl.jpg",
  "pages": 545
}'

book10='{
  "title": "The Little Prince",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Fable",
  "description": "A poetic tale of a young prince exploring the universe.",
  "publication_year": 1943,
  "file_url": "1vH5oy22u8vkFbGVh1EloGXf4lrIvlxH6",
  "image_url": "https://static.yakaboo.ua/media/catalog/product/c/o/cover_176_116.jpg",
  "pages": 48
}'

# Надсилаємо всі книги
send_book "$book1"
send_book "$book2"
send_book "$book3"
send_book "$book4"
send_book "$book5"
send_book "$book6"
send_book "$book7"
send_book "$book8"
send_book "$book9"
send_book "$book10"

echo "✅ Завантаження завершено."
