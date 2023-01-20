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
	docker run --rm -v ${PWD}/frontend:/app -w /app alpine sh -c 'rm -f .ready'

app-init: api-init frontend-init
	docker run --rm -v ${PWD}/api:/app -w /app alpine sh -c 'touch .ready'
	docker run --rm -v ${PWD}/frontend:/app -w /app alpine sh -c 'touch .ready'

api-init: api-npm-install api-node-prisma-migration

api-npm-install:
	docker-compose run --rm api-node-cli npm install

api-node-cli:
	docker-compose run --rm api-node-cli $(cmd)

api-node-prisma-generate-migration:
	docker-compose run --rm api-node-cli npx prisma migrate dev --name $(name)

api-node-prisma-migration:
	docker-compose run --rm api-node-cli npx prisma migrate deploy

api-logs:
	docker-compose logs --follow api-node

api-fix:
	docker-compose run --rm api-node-cli npm run eslint:fix
	docker-compose run --rm api-node-cli npm run prettier:fix

frontend-init: frontend-yarn-install

frontend-yarn-install:
	docker-compose run --rm frontend-node-cli yarn install

frontend-node-cli:
	docker-compose run --rm frontend-node-cli $(cmd)

frontend-logs:
	docker-compose logs --follow frontend-node