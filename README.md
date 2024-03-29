# 11281group42
# Captain Florida
# Florida Water Dashboard Website
Project for CEN3031

Project Manager: Sofia Valdes
Scrum Master: Justin Villena
Developer: Nikos Dupuy
Developer: Graham Vaith

# Requirements
* npm
* NodeJS
* ExpressJS
* MongoDB
* Mongoose
* Body-Parser

# About
Our group created this website for anyone who wants to learn more about the water quality in Florida and the specific data values for their county. There is an interactive map on the home page that is divided into Florida’s 67 counties and if you click on a county, its water quality data will pop up. There are also two tables at the bottom of the home page that rank the best and worst water qualities in the state. The resources and wildlife tabs have hyperlinks to organizations and articles relating to water quality and Florida’s aquatic ecosystems. The server is run using Node.js and the data is stored on MongoDB.

# MongoDB Connection
If you want to use your own mongoDB cluster, line 24 of the app.js file is the variable that it can be stored in. The current version uses a cluster that is owned by the developers.

# How to run the website
1. Install the NodeJS framework and npm (node package manager) from the internet, and make sure you have them on your system. You can check this by entering the command prompt and typing 'node -v', if NodeJS is installed it will respond with the version of Node you have, and similarly you can do 'npm -v' to check for npm. 
2. Open root directory, the 11281group42-main folder, either from zip or from git, and run the command prompt or powershell by shift right clicking inside the folder and selecting the option.
3. Input 'npm install' into the command prompt and run it by hitting enter. This will install the requirements listed above to run the website.
4. Input 'npm start' into the command prompt and run it, hitting enter. This should start the website locally.
5. Type "http://localhost:3000" into your browser and the website should open.
