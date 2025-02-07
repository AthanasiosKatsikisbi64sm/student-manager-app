# Student Management App  

This Project is a **Student Management Application** with an API, Client Side Application, and API Documentation. Follow the steps below to set up and run the Project.

---

## Prerequisites  
Ensure you have the following installed on your System:  
- **Node.js** (Latest LTS version recommended)  
- **npm** (Node Package Manager)  
- **Chromium** or **Firefox** (For viewing Client and Documentation)  

---

## Setup Instructions  

 
Follow these steps to install and run the API Server:  
```sh
### 1. API 
# Open Terminal and navigate to the Project root directory
cd student-management-app  

# Install Dependencies
npm install  

# Change directory to the API folder
cd api  

# Install API Dependencies
npm install  

# Start the Server
node app.js



### 2. CLIENT

# Open a new Terminal Window
# Navigate to the Project root directory
cd student-management-app  

# Change Directory to the Client folder
cd client  

# Install Client Dependencies
npm install  

# Open the index.html file in Chromium or Firefox
chromium index.html  
# or
firefox index.html




### 3. APIDOC

# Open a New Terminal Window
cd student-management-app  

# Generate API Documentation
npm run docs  

# Change directory to the API Documentation folder
cd apidoc  

# Open the Documentation in a Browser
chromium index.html  
# or
firefox index.html


### 4. TESTS

# Open a New Terminal Window
cd student-management-app  

# Run Tests
npm run test



### 5. TestCafe File Path
Change the testcafe.js path in the .page('file:///YourPath/StudentManagerApp/client/index.html') method to your own path

