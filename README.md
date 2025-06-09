# Microservices Uptime Monitor

A real-time uptime monitoring system for microservices built with React frontend and Node.js backend services, with the frontend deployed on Kubernetes and backend services running as Docker containers.

## Architecture

This project consists of:

- **Frontend Dashboard**: React application with real-time service monitoring, deployed as a Kubernetes Deployment with a LoadBalancer service.
- **Backend Services**: Three Node.js microservices (Auth, Product, Order) running as standalone Docker containers.
- **Containerization**: Docker images built for all services.
- **Orchestration**: Kubernetes manages frontend deployment and exposure.
- **Auto-scaling**: Frontend deployment can be auto-scaled with Kubernetes Horizontal Pod Autoscaler (optional).

## Services

### Backend Services

- **Auth Service**: Runs in a Docker container, exposed on port 8001
- **Product Service**: Runs in a Docker container, exposed on port 8002  
- **Order Service**: Runs in a Docker container, exposed on port 8003

### Frontend

- **Uptime Monitor Dashboard**: Kubernetes Deployment with Service on port 80, accessible via LoadBalancer.

## Prerequisites

- Kubernetes cluster (Minikube, Docker Desktop Kubernetes, or AWS EKS) for frontend
- kubectl CLI configured to access the cluster
- Docker (for building and running backend services and frontend images)
- Container registry access (Docker Hub, AWS ECR, etc.)
- eksctl

## Quick Start

### 1. Start Backend Services Locally (or on any Docker host)

Navigate to the backend services directory and start them using Docker Compose or individual Docker commands:

```bash
docker-compose -f docker-compose.yaml up -d
```

This will start:

```bash
Auth service: http://localhost:8001

Product service: http://localhost:8002

Order service: http://localhost:8003
```

### 2. Build and Push Frontend Docker Image
Build and push the frontend Docker image to your container registry(Docker):

```bash
docker build -t your-registry/uptime-frontend:latest ./frontend
docker push your-registry/uptime-frontend:latest
```
For ECR

1. Create an ECR repository
```bash
aws ecr create-repository --repository-name < name > --region < your-region >
```
2. Authenticate Docker to ECR
```bash
aws ecr get-login-password --region ap-south-1 | \
docker login --username AWS --password-stdin <your_aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com
```
3. Tag and Push
```bash
docker build -t uptime-monitor .
docker tag uptime-monitor:latest <your_aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/uptime-monitor:latest
docker push <your_aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/uptime-monitor:latest
```
### 3. Deploy Frontend on Kubernetes
Apply the Kubernetes manifests for the frontend dashboard:

```bash
kubectl apply -f k8s/
```
### 4. Access the Dashboard
If using LoadBalancer service, get the external IP:

```bash
kubectl get svc uptime-frontend
```

### Configuration
Backend Services

Each backend service exposes a  /health endpoint returning:

```json
{
  "status": "Service name healthy"
}
```

Make sure the frontend React app is configured to point to the correct backend service IPs and ports.


# Development
Backend Services.

Run locally using:

```bash
npm install
npm start
```

## Frontend
Build Docker image and deploy to Kubernetes for staging/production.

Or run locally with:

```bash
npm install
npm run dev
```

## Troubleshooting
* Backend Services Not Reachable

* Check backend containers are running (docker ps)

* Verify ports and IP addresses are correct and accessible from frontend pod or host

* Adjust firewall or Docker network settings if needed

* Frontend Not Accessible

* Verify Kubernetes frontend pod and service status (kubectl get pods, kubectl get svc)

* Check ingress or load balancer configuration









