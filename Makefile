.PHONY: fix
fix:
	isort src && black src && mypy src && pylint src

.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up

.PHONY: up-d
up-d:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down