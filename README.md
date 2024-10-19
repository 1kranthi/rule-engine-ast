Overview

The Rule Engine Application is a backend-driven rule engine built using Java, Spring Boot, and React.js. The application evaluates custom rules based on input data and logical operators, leveraging Abstract Syntax Trees (AST) for rule processing.

The application includes:
    • Backend built using Spring Boot 3.3.4, with an embedded in-memory database (H2).
    • Frontend developed using React.js, running on port 3000.
    • REST API endpoints for creating, combining, and evaluating rules.
    • A user-friendly interface to input rule parameters and evaluate them using a custom JSON format.
    
Technologies Used
    • Frontend: React.js
    • Backend: Java, Spring Boot 3.3.4
    • Database: H2 (In-memory database, embedded within Spring Boot)
    • Communication: REST API (Backend exposes endpoints for rule operations)
    
Prerequisites
    • Node.js (for running the frontend)
    • Java 17+ (for running the Spring Boot backend)
    • Maven (for building the backend)
    
Features
    1. Create Rules: Allows users to create new rules by specifying conditions and logical operators.
    2. Combine Rules: Combine multiple rules and visualize the combined rule AST.
    3. Evaluate Rules: Evaluate rules based on input data and get the results.
    4. REST API: The backend provides REST endpoints to manage rules and evaluate them.
    5. In-memory Database: Spring Boot is configured with an embedded H2 database for persistence.
    
Project Structure
Backend (Spring Boot)
The Spring Boot application handles the rule creation, evaluation, and combination logic. It uses an H2 in-memory database, so no external database setup is required.
    • Port: The backend runs on port 8080.
    • Endpoints:
        ◦ /create (POST): Creates a new rule.
        ◦ /combine (POST): Combines two or more rules.
        ◦ /evaluate (POST): Evaluates a rule with input data.
        
Frontend (React.js)
The frontend provides a user-friendly interface for interacting with the backend services. Users can create, combine, and evaluate rules through a web UI.
    • Port: The frontend runs on port 3000.
    
Setup Instructions
1. Clone the Repository

git clone <repository-url>
cd rule-engine-app

2. Backend Setup (Spring Boot)
    • Step 1: Navigate to the backend directory.
cd backend
    • Step 2: Build and run the Spring Boot application.
mvn clean install
mvn spring-boot:run
    • The backend server will run on http://localhost:8080.

   
4. Frontend Setup (React.js)
    • Step 1: Navigate to the frontend directory.
cd rule-engine-frontend
    • Step 2: Install the dependencies.
npm install
npm install react-router-dom

    • Step 3: Start the frontend.
npm start
    • The frontend server will run on http://localhost:3000.

   
6. Access the Application
    • Open the application in your browser: http://localhost:3000.
    • The frontend interacts with the backend services running on port 8080.
