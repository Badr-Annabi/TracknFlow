# TracknFlow Docker Makefile
# Useful commands for managing the Docker environment

.PHONY: help build up down restart logs clean dev prod test

# Default target
help: ## Show this help message
	@echo "TracknFlow Docker Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Production commands
build: ## Build all Docker images
	docker-compose build

up: ## Start all services in production mode
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## View logs from all services
	docker-compose logs -f

prod: ## Build and start production environment
	docker-compose down
	docker-compose build
	docker-compose up -d
	@echo "Production environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:5000"

# Development commands
dev: ## Start development environment with hot reload
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:5000"

dev-build: ## Build and start development environment
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.dev.yml build
	docker-compose -f docker-compose.dev.yml up -d

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

dev-logs: ## View development logs
	docker-compose -f docker-compose.dev.yml logs -f

# Database commands
db-shell: ## Access PostgreSQL shell
	docker-compose exec db psql -U postgres -d tracknflow

db-backup: ## Backup database to backup.sql
	docker-compose exec db pg_dump -U postgres tracknflow > backup.sql
	@echo "Database backed up to backup.sql"

db-restore: ## Restore database from backup.sql
	docker-compose exec -T db psql -U postgres tracknflow < backup.sql
	@echo "Database restored from backup.sql"

# Testing commands
test-backend: ## Run backend tests
	docker-compose exec backend npm test

test-frontend: ## Run frontend tests
	docker-compose exec frontend npm test

# Utility commands
clean: ## Remove all containers, networks, and volumes
	docker-compose down -v
	docker system prune -f

clean-all: ## Remove everything including images
	docker-compose down -v
	docker system prune -a --volumes -f

status: ## Show status of all services
	docker-compose ps

health: ## Check health of all services
	@echo "Checking service health..."
	@curl -s http://localhost:5000/health || echo "Backend not responding"
	@curl -s http://localhost:3000/ > /dev/null && echo "Frontend is running" || echo "Frontend not responding"

# Setup commands
setup: ## Initial setup with environment file
	cp .env.example .env
	@echo "Environment file created. Please edit .env with your settings."
	@echo "Then run 'make up' to start the services."

# Environment-specific commands
production: prod ## Alias for prod
development: dev ## Alias for dev

# Quick commands
start: up ## Alias for up
stop: down ## Alias for down
rebuild: clean prod ## Clean and rebuild everything
