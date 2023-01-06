init: docker-down-clear app-clear docker-pull docker-build docker-up app-init
up: docker-up
down: docker-down
restart: down docker-build up

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-stop:
	docker-compose stop

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

app-clear:
	docker run --rm -v ${PWD}/api:/app -w /app alpine sh -c 'rm -f .ready'

app-init: api-init
	docker run --rm -v ${PWD}/api:/app -w /app alpine sh -c 'touch .ready'

api-init:
	docker-compose run --rm api-node-cli npm install

api-node-cli:
	docker-compose run --rm api-node-cli $(cmd)