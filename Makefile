up-build:
	docker compose up -d --build

up:
	docker compose up -d

down:
	docker compose down

fill_books:
	chmod +x fill_books.sh
	./fill_books.sh