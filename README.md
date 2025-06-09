# Microservices Uptime Monitor

A real-time uptime monitoring system for microservices built with React frontend and Node.js backend services, all containerized with Docker.

## Architecture

This project consists of:

- **Frontend Dashboard**: React application with real-time service monitoring
- **Backend Services**: Three Node.js microservices (Auth, Product, Order)
- **Containerization**: Docker and Docker Compose for easy deployment

## Services

### Backend Services
- **Auth Service**: Runs on port 8001
- **Product Service**: Runs on port 8002  
- **Order Service**: Runs on port 8003

### Frontend
- **Uptime Monitor Dashboard**: Runs on port 8080
- Real-time status checking every 30 seconds
- Response time measurement
- Visual status indicators

## Prerequisites

- Docker
- Docker Compose
- Node.js 18+ (for local development)

## Quick Start

### 1. Start Backend Services

Navigate to the backend services directory and run:

```bash
docker-compose -f docker-compose.yaml up -d
```

This will start all three microservices:
- Auth service: http://localhost:8001
- Product service: http://localhost:8002
- Order service: http://localhost:8003

### 2. Start Frontend Dashboard

Navigate to the frontend directory and run:

```bash
docker-compose up -d
```

The uptime monitor dashboard will be available at: http://localhost:8080

## Configuration

### Backend Services

Each service exposes a `/health` endpoint that returns:
```json
{
  "status": "Service name healthy"
}
```

### Frontend Configuration

The frontend monitors these endpoints by default:
- `http://192.168.1.9:8001/health` - Auth Service
- `http://192.168.1.9:8002/health` - Product Service  
- `http://192.168.1.9:8003/health` - Order Service

**Note**: Update the IP address in `App.jsx` to match your Docker host IP address.

## Development

### Backend Services

Each service follows the same structure:
```
service-name/
├── Dockerfile
├── index.js
└── package.json
```

To run a service locally:
```bash
cd auth-service  # or product-service, order-service
npm install
npm start
```

### Frontend

The frontend is built with:
- React 18
- Tailwind CSS for styling
- Vite for build tooling

To run locally:
```bash
npm install
npm run dev
```

## Docker Images

### Backend Services
- Base: `node:18-alpine`
- Exposed ports: 8001, 8002, 8003

### Frontend
- Multi-stage build with `node:18-alpine` and `nginx:alpine`
- Production build served via Nginx
- Exposed port: 80 (mapped to 8080)

## Features

- **Real-time Monitoring**: Checks services every 30 seconds
- **Response Time Tracking**: Measures and displays response times
- **Visual Status Indicators**: Green for up, red for down
- **Last Checked Timestamp**: Shows when each service was last monitored
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

Each backend service provides:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Service health check |

## Troubleshooting

### Services Not Accessible

1. Check if containers are running:
   ```bash
   docker ps
   ```

2. Verify port mappings and ensure no conflicts

3. Update IP addresses in `App.jsx` to match your environment

### CORS Issues

All services are configured with CORS enabled for cross-origin requests.

### Container Build Issues

Ensure Docker and Docker Compose are properly installed and running.

## License

MIT License