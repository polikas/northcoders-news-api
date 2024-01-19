# Summary

Link to the hosted application: -> https://articles-service-api.onrender.com/api  

The project is focused on backend functionality using MVC design pattern, to build and test api endpoints on a given PSQl database following TDD methodology.  
Coding language used for this project is pure JavaScript along with a variety of frameworks and libraries such as Jest, Supertest, Express, Postgres, PG-Format, dotenv.  

# Instructions

Navigate to the repo -> https://github.com/polikas/northcoders-news-api  
Clone the repo by clicking the Code button and copy at your clipboard the HTTPS link  
Create a folder for the cloning repo at your local machine  
Now we can use the terminal navigate to path of the folder we just created  
Enter this command: git clone "paste the url that you saved at your clipboard from previous step, no need quotations just URL"  

# Install Dependencies

Make sure you are on the root level of your folder before installing anything just to make sure everything is in same place.  

Minimum Node.js version should be 20.10.0  
Minimum Postgres version should be 8.11.3  

npm install  
npm install dotenv  
npm install express  
npm install pg  
npm install pg-format  
npm install supertest  
npm install jest  
npm install jest-extended  
npm install jest-sorted  

# Seed Local Database Scripts

npm run setup-dbs  
npm run seed (create tables and insert test data at the database)  
npm run test (to run all the test at once)  

# Create Environment Files

Create new file at the root of folder  
filename: .env.test just put this into the file PGDATABASE=nc_news_test  
filename: .env.development just put this into the file PGDATABASE=nc_news  

We are good to go and try npm run test!!!


