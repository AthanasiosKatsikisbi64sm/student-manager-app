# Student Management App  

This project is a **Student Management Application** with an API, client-side application, and API documentation. Follow the steps below to set up and run the project.

---

## Prerequisites  
Ensure you have the following installed on your system:  
- **Node.js** (latest LTS version recommended)  
- **npm** (Node Package Manager)  
- **Chromium** or **Firefox** (for viewing client and documentation)  

---

## Setup Instructions  

 
Follow these steps to install and run the API server:  
```sh
### 1. API 
# Open terminal and navigate to the project root directory
cd student-management-app  

# Install dependencies
npm install  

# Change directory to the API folder
cd api  

# Install API dependencies
npm install  

# Start the server
node app.js



### 2. CLIENT

# Open a new terminal window
# Navigate to the project root directory
cd student-management-app  

# Change directory to the client folder
cd client  

# Install client dependencies
npm install  

# Open the index.html file in Chromium or Firefox
chromium index.html  
# or
firefox index.html




### 3. APIDOC

# Open a new terminal window
cd student-management-app  

# Generate API documentation
npm run doc  

# Change directory to the API documentation folder
cd apidoc  

# Open the documentation in a browser
chromium index.html  
# or
firefox index.html


### 4. TESTS

# Open a new terminal window
cd student-management-app  

# Run tests
npm run test