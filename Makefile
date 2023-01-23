# Makefile

# make commands be run with `bash` instead of the default `sh`
SHELL='/bin/bash'

# Setup —————————————————————————————————————————————————————————————————————————————————
.DEFAULT_GOAL := help

# .DEFAULT: If command does not exist in this makefile
# default:  If no command was specified:
.DEFAULT default:
	$(EXECUTOR)
	if [ "$@" != "" ]; then echo "Command '$@' not found."; fi;
	make help

## —— Project Make file  ————————————————————————————————————————————————————————————————

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Init project ——————————————————————————————————————————————————————————————————————
init: ## Project init
init: docker-down-clear app-clear docker-pull docker-build docker-up app-init

## —— Manage project ————————————————————————————————————————————————————————————————————
up: docker-up ## Project up
down: docker-down ## Project down
restart: down docker-build up ## Project restart

## —— Audit project —————————————————————————————————————————————————————————————————————
check: lint ## Project restart
lint: frontend-lint api-lint ## Run linters

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

## —— API ———————————————————————————————————————————————————————————————————————————————
api-init: ## Init API
api-init: api-npm-install api-prisma-migration

api-npm-install: ## Install npm package
	docker-compose run --rm api-node-cli npm install

api-node-cli: ## Run node container command. Args: cmd - any command line
	docker-compose run --rm api-node-cli $(cmd)

api-prisma-gen-migration: ## Generate new migration by schema
	docker-compose run --rm api-node-cli npx prisma migrate dev --name $(name)

api-prisma-migration: ## Run migrations
	docker-compose run --rm api-node-cli npx prisma migrate deploy

api-logs: ## Show logs
	docker-compose logs --follow api-node

api-lint: ## Run lints
	docker-compose run --rm api-node-cli npm run eslint

api-fix: ## Run lint fixer
	docker-compose run --rm api-node-cli npm run eslint:fix
	docker-compose run --rm api-node-cli npm run prettier:fix

## —— Frontend ——————————————————————————————————————————————————————————————————————————
frontend-init: ## Init frontend
frontend-init: frontend-yarn-install

frontend-yarn-install: ## Install yarn package
	docker-compose run --rm frontend-node-cli yarn install

frontend-node-cli: ## Run node container command. Args: cmd - any command line
	docker-compose run --rm frontend-node-cli $(cmd)

frontend-lint: ## Run lints
	docker-compose run --rm frontend-node-cli yarn stylelint
	docker-compose run --rm frontend-node-cli yarn eslint

frontend-fix: ## Run lint fixer
	docker-compose run --rm frontend-node-cli yarn prettier
	docker-compose run --rm frontend-node-cli yarn eslint:fix

frontend-logs: ## Show logs
	docker-compose logs --follow frontend-node