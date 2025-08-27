pipeline {
  agent any
  environment {
    IMAGE = "simple-express-app:${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test --silent'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh "docker build -t ${IMAGE} ."
      }
    }
    stage('Smoke Test') {
      steps {
        sh '''
          docker rm -f smoke || true
          docker run -d --name smoke -p 4000:3000 ${IMAGE}
          sleep 3
          curl -f http://localhost:4000/health || (docker logs smoke && exit 1)
          docker rm -f smoke
        '''
      }
    }
  }
  post {
    success { echo '✅ Build SUCCESS' }
    failure { echo '❌ Build FAILED' }
  }
}
