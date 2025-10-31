#!/bin/bash

echo "========================================"
echo "Starting Tevra CI/CD Environment"
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "ERROR: Docker is not running. Please start Docker first."
    exit 1
fi

echo "Docker is running. Proceeding..."

# Build the Tevra Cars Docker image
echo ""
echo "Building Tevra Cars Docker image..."
docker build -t tevra-cars:latest .

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build Docker image."
    exit 1
fi

# Stop and remove existing containers if they exist
echo ""
echo "Cleaning up existing containers..."
docker stop tevra-cars-container jenkins sonarqube > /dev/null 2>&1
docker rm tevra-cars-container jenkins sonarqube > /dev/null 2>&1

# Start Tevra Cars container
echo ""
echo "Starting Tevra Cars application container..."
docker run -d -p 8080:80 --name tevra-cars-container tevra-cars:latest

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to start Tevra Cars container."
    exit 1
fi

# Start Jenkins container
echo ""
echo "Starting Jenkins container..."
docker run -d -p 8081:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins --restart=on-failure jenkins/jenkins:lts

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to start Jenkins container."
    exit 1
fi

# Start SonarQube container
echo ""
echo "Starting SonarQube container..."
docker run -d -p 9000:9000 --name sonarqube --restart=on-failure sonarqube:9.9-community

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to start SonarQube container."
    exit 1
fi

# Wait for containers to start
echo ""
echo "Waiting for containers to initialize..."
sleep 10

# Check Kubernetes (assuming kubectl is configured)
echo ""
echo "Checking Kubernetes deployment..."
if kubectl get nodes > /dev/null 2>&1; then
    echo "Applying Kubernetes manifests..."
    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
    echo ""
    echo "Kubernetes deployment status:"
    kubectl get pods
    kubectl get services
else
    echo "WARNING: Kubernetes not available. Skipping K8s deployment."
fi

# Show running containers
echo ""
echo "========================================"
echo "Environment Status"
echo "========================================"
echo "Running Docker containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "========================================"
echo "Access URLs:"
echo "========================================"
echo "Tevra Cars Website:    http://localhost:8080"
echo "Jenkins Dashboard:     http://localhost:8081"
echo "SonarQube Dashboard:   http://localhost:9000"
echo ""
echo "Note: Jenkins may take a few minutes to fully start."
echo "Check Jenkins logs with: docker logs jenkins"
echo ""
echo "Press Enter to exit..."
read -r
