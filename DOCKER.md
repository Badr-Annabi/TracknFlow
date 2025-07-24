# 🐳 Docker Setup for TracknFlow

This guide will help you run TracknFlow using Docker containers for both development and production environments.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 or higher)

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd TracknFlow
cp .env.example .env
# Edit .env with your preferred settings
```

### 2. Production Deployment
```bash
# One-command setup
./docker-setup.sh

# Or manually:
docker-compose up -d
```

### 3. Development Environment
```bash
# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up -d
```

## 🌐 Service Access

| Service | Production URL | Development URL |
|---------|---------------|-----------------|
| Frontend | http://localhost:3000 | http://localhost:3000 |
| Backend API | http://localhost:5000 | http://localhost:5000 |
| Database | localhost:5432 | localhost:5432 |

## 🔧 Docker Commands

### Basic Operations
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# Rebuild and start
docker-compose up -d --build
```

### Development Environment
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View development logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

### Database Operations
```bash
# Access PostgreSQL shell
docker-compose exec db psql -U postgres -d tracknflow

# Backup database
docker-compose exec db pg_dump -U postgres tracknflow > backup.sql

# Restore database
docker-compose exec -T db psql -U postgres tracknflow < backup.sql
```

### Container Management
```bash
# List running containers
docker-compose ps

# Execute command in container
docker-compose exec backend npm run test
docker-compose exec frontend npm run build

# View container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## 🏗️ Architecture

### Production Stack
- **Frontend**: React app served by Nginx (Port 3000)
- **Backend**: Node.js/Express API (Port 5000)
- **Database**: PostgreSQL (Port 5432)

### Development Stack
- **Frontend**: React dev server with hot reload (Port 3000)
- **Backend**: Node.js with nodemon for auto-restart (Port 5000)
- **Database**: PostgreSQL (Port 5432)

## 🔐 Environment Configuration

### Required Environment Variables
```env
# Database
DB_NAME=tracknflow
DB_USER=postgres
DB_PASSWORD=your-secure-password

# JWT
JWT_SECRET=your-super-secret-jwt-key
```

### Optional Configuration
```env
# Custom ports
FRONTEND_PORT=3000
BACKEND_PORT=5000
DB_PORT=5432
```

## 🔍 Health Monitoring

All services include health checks:

```bash
# Check service health
docker-compose ps

# Manual health check
curl http://localhost:5000/health
curl http://localhost:3000/
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :5000
   lsof -i :3000
   lsof -i :5432
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Database Connection Issues**
   ```bash
   # Check database logs
   docker-compose logs db
   
   # Restart database
   docker-compose restart db
   ```

3. **Build Failures**
   ```bash
   # Clean rebuild
   docker-compose down
   docker system prune -f
   docker-compose up -d --build
   ```

4. **Permission Issues**
   ```bash
   # Fix permissions
   sudo chown -R $USER:$USER .
   ```

### Logs and Debugging
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Follow logs in real-time
docker-compose logs -f --tail=100
```

## 🧹 Cleanup

### Remove Everything
```bash
# Stop and remove containers, networks, and volumes
docker-compose down -v

# Remove unused Docker resources
docker system prune -a --volumes
```

### Remove Only Containers
```bash
# Stop and remove containers (keep volumes)
docker-compose down
```

## 📦 Production Deployment

### Docker Hub Deployment
```bash
# Build and tag images
docker build -t tracknflow-frontend ./client
docker build -t tracknflow-backend ./server

# Push to registry
docker tag tracknflow-frontend your-registry/tracknflow-frontend:latest
docker tag tracknflow-backend your-registry/tracknflow-backend:latest
docker push your-registry/tracknflow-frontend:latest
docker push your-registry/tracknflow-backend:latest
```

### Server Deployment
```bash
# On production server
git clone <repository-url>
cd TracknFlow
cp .env.example .env
# Configure production environment variables
docker-compose up -d
```

## 🔧 Customization

### Custom Nginx Configuration
Edit `client/nginx.conf` for custom Nginx settings.

### Database Initialization
Add SQL scripts to `server/db/init.sql` for database initialization.

### Environment-Specific Builds
```bash
# Development
docker-compose -f docker-compose.dev.yml up -d

# Production
docker-compose up -d

# Custom configuration
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

## 📊 Monitoring

### Resource Usage
```bash
# View resource usage
docker stats

# View specific container stats
docker stats tracknflow-frontend tracknflow-backend tracknflow-db
```

### Container Information
```bash
# Inspect container
docker inspect tracknflow-backend

# View container processes
docker-compose top
```

---

For more information, visit the [Docker Documentation](https://docs.docker.com/) or the [Docker Compose Documentation](https://docs.docker.com/compose/).
