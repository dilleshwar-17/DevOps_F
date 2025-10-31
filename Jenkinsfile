pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'tevra-cars'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'your-registry.com'  // Replace with your Docker registry
        KUBECONFIG = credentials('kubeconfig')  // Jenkins credential ID for kubeconfig
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                // Clone the GitHub repository
                git branch: 'main', url: 'https://github.com/dilleshwar-17/DevOps_F.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                // For static site, build step might include minification or asset optimization
                sh 'echo "Static site build completed"'
            }
        }

        stage('SonarQube Analysis') {
    steps {
        echo 'Running SonarQube code analysis...'
        script {
            def scannerHome = tool 'SonarQube Scanner'
            withSonarQubeEnv('SonarQube') {
                // Use the stored SonarQube token securely
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=tevra-cars \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://your-sonarqube-server:9000 \
                        -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }
    }
}

        stage('Quality Gate') {
            steps {
                echo 'Waiting for SonarQube quality gate...'
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image to registry...'
                sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                sh """
                    sed -i 's|{{IMAGE_TAG}}|${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}|g' deployment.yaml
                    kubectl apply -f deployment.yaml
                    kubectl apply -f service.yaml
                    kubectl rollout status deployment/tevra-cars-deployment
                """
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker images...'
            sh "docker rmi ${env.DOCKER_IMAGE}:${env.DOCKER_TAG} ${env.DOCKER_REGISTRY}/${env.DOCKER_IMAGE}:${env.DOCKER_TAG} || true"
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
