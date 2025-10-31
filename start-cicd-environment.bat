@echo off
echo ========================================
echo Starting Tevra CI/CD Environment
echo ========================================

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo Docker is running. Proceeding...

REM Build the Tevra Cars Docker image
echo.
echo Building Tevra Cars Docker image...
docker build -t tevra-cars:latest .

if %errorlevel% neq 0 (
    echo ERROR: Failed to build Docker image.
    pause
    exit /b 1
)

REM Stop and remove existing containers if they exist
echo.
echo Cleaning up existing containers...
docker stop tevra-cars-container jenkins sonarqube >nul 2>&1
docker rm tevra-cars-container jenkins sonarqube >nul 2>&1

REM Start Tevra Cars container
echo.
echo Starting Tevra Cars application container...
docker run -d -p 8080:80 --name tevra-cars-container tevra-cars:latest

if %errorlevel% neq 0 (
    echo ERROR: Failed to start Tevra Cars container.
    pause
    exit /b 1
)

REM Start Jenkins container
echo.
echo Starting Jenkins container...
docker run -d -p 8081:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins --restart=on-failure jenkins/jenkins:lts

if %errorlevel% neq 0 (
    echo ERROR: Failed to start Jenkins container.
    pause
    exit /b 1
)

REM Start SonarQube container
echo.
echo Starting SonarQube container...
docker run -d -p 9000:9000 --name sonarqube --restart=on-failure sonarqube:9.9-community

if %errorlevel% neq 0 (
    echo ERROR: Failed to start SonarQube container.
    pause
    exit /b 1
)

REM Wait for containers to start
echo.
echo Waiting for containers to initialize...
timeout /t 10 /nobreak >nul

REM Check Kubernetes (assuming minikube or similar is set up)
echo.
echo Checking Kubernetes deployment...
kubectl get nodes >nul 2>&1
if %errorlevel% equ 0 (
    echo Applying Kubernetes manifests...
    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
    echo.
    echo Kubernetes deployment status:
    kubectl get pods
    kubectl get services
) else (
    echo WARNING: Kubernetes not available. Skipping K8s deployment.
)

REM Show running containers
echo.
echo ========================================
echo Environment Status
echo ========================================
echo Running Docker containers:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo ========================================
echo Access URLs:
echo ========================================
echo Tevra Cars Website:    http://localhost:8080
echo Jenkins Dashboard:     http://localhost:8081
echo SonarQube Dashboard:   http://localhost:9000
echo.
echo Note: Jenkins may take a few minutes to fully start.
echo Check Jenkins logs with: docker logs jenkins
echo.
echo Press any key to exit...
pause >nul
