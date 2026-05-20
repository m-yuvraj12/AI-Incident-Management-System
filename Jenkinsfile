pipeline {

    agent any

    tools {

        nodejs 'Node20'

    }

    stages {

        stage('Checkout') {

            steps {

                git 'YOUR_GITHUB_REPO_URL'

            }

        }

        stage('Frontend Install') {

            steps {

                dir('frontend') {

                    sh 'npm install'

                }

            }

        }

        stage('Frontend Build') {

            steps {

                dir('frontend') {

                    sh 'npm run build'

                }

            }

        }

        stage('Backend Install') {

            steps {

                dir('backend') {

                    sh 'npm install'

                }

            }

        }

        stage('Docker Frontend') {

            steps {

                sh 'docker build -t ai-frontend ./frontend'

            }

        }

        stage('Docker Backend') {

            steps {

                sh 'docker build -t ai-backend ./backend'

            }

        }

    }

}