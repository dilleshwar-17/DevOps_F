# Tevra Premium Cars - CI/CD Pipeline

A complete DevOps setup for the Tevra Premium Cars static website featuring luxury car showcase with search/filter functionality and currency conversion.

## 🚀 Quick Start

### One-Click Setup (Windows)
Double-click `start-cicd-environment.bat` to automatically:
- Build Docker images
- Start all containers (Tevra app, Jenkins, SonarQube)
- Deploy to Kubernetes (if available)
- Display access URLs

### One-Click Setup (Linux/Mac)
Run `./start-cicd-environment.sh` to automatically:
- Build Docker images
- Start all containers (Tevra app, Jenkins, SonarQube)
- Deploy to Kubernetes (if available)
- Display access URLs

## 📋 Prerequisites

- Docker Desktop installed and running
- (Optional) Kubernetes cluster (minikube, k3s, etc.)
- Git

## 🏗️ Architecture

### Components
- **Tevra Website**: Static HTML/CSS/JS car showcase
- **Jenkins**: CI/CD pipeline automation
- **SonarQube**: Code quality analysis
- **Nginx**: Web server for static files
- **Kubernetes**: Container orchestration

### Pipeline Stages
1. **Checkout**: Pull latest code from GitHub
2. **Build**: Validate and prepare application
3. **SonarQube**: Code quality analysis
4. **Docker Build**: Create container image
5. **Kubernetes Deploy**: Deploy to cluster

## 🌐 Access URLs

After running the startup script:
- **Tevra Website**: http://localhost:8080
- **Jenkins Dashboard**: http://localhost:8081
- **SonarQube Dashboard**: http://localhost:9000

## 📁 Project Structure

```
├── index.html          # Main website
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── currency.js         # Currency conversion
├── cars-data.xml       # Car specifications
├── Dockerfile          # Container definition
├── Jenkinsfile         # CI/CD pipeline
├── deployment.yaml     # K8s deployment
├── service.yaml        # K8s service
├── docker-compose.yml  # Local development
├── job.xml            # Jenkins job config
├── start-cicd-environment.bat  # Windows launcher
├── start-cicd-environment.sh   # Linux/Mac launcher
└── .gitignore         # Git exclusions
```

## 🔧 Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Build and run Tevra website
docker build -t tevra-cars:latest .
docker run -d -p 8080:80 --name tevra-cars-container tevra-cars:latest

# Start Jenkins
docker run -d -p 8081:8080 -p 50000:50000 --name jenkins jenkins/jenkins:lts

# Start SonarQube
docker run -d -p 9000:9000 --name sonarqube sonarqube:9.9-community

# Deploy to Kubernetes (if available)
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

## 📊 Features

- **Car Showcase**: Display luxury vehicles with specifications
- **Search & Filter**: Find cars by price range
- **Currency Conversion**: USD to INR toggle
- **Responsive Design**: Mobile-friendly interface
- **Modal Details**: Detailed car information
- **CI/CD Pipeline**: Automated build, test, and deploy

## 🛠️ Development

### Local Development
```bash
docker-compose up
```

### Pipeline Triggers
- Push to `master` branch
- Manual trigger in Jenkins UI
- Webhook integration (optional)

## 📈 Monitoring

- **Jenkins Logs**: `docker logs jenkins`
- **Application Logs**: `docker logs tevra-cars-container`
- **SonarQube Logs**: `docker logs sonarqube`
- **Kubernetes**: `kubectl get pods` / `kubectl logs <pod-name>`

## 🔒 Security Notes

- Jenkins initial password: Check `docker logs jenkins` for setup instructions
- SonarQube default credentials: admin/admin
- Change default passwords in production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License
This project is for educational purposes demonstrating DevOps practices.
# DevOps_F
