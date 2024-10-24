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
    
Setup Instructions for Rule Engine Application
Prerequisites
    • Java 17+: Ensure you have Java installed. You can verify by running:
      java -version
    • Maven: Ensure you have Maven installed. You can verify by running:
      mvn -version
1. Clone the Repository
git clone https://github.com/1kranthi/rule-engine-ast.git
cd rule-engine-ast
2. Install Dependencies (Maven)
If you haven’t already installed Maven, follow these steps:
    • On Windows:
        1. Download the latest Maven binary zip archive from Maven's official website.
        2. Unzip the archive to your preferred location.
        3. Add the bin directory to your system PATH.
    • On Linux/Unix:
      sudo apt update
      sudo apt install maven
3. Build the Backend 
If you have the JAR file ready, you can skip this step. However, if you need to build from source:
cd rule-engine-ast
mvn clean install
4. Run the Backend Application
    1. Navigate to the target directory where the JAR file is located:
       cd rule-engine-ast/target
    2. Run the JAR file:
       java -jar rule-engine-ast-0.0.1-SNAPSHOT.jar
       The backend server will run on http://localhost:8080.
5. Access the Application
Open the application in your browser at http://localhost:8080.
