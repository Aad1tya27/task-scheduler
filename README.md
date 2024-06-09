
# Task Scheduler

This project aims to assist the user to schedule tasks easily as it has a simple and easy to use UI. I have used MERN stack to create this application. 

This application allows users to Create and Log in their Accounts(Authentication). Their passwords are hashed and then stored in the MongoDB database which ensures User Security. 

Json Web Tokens are sent as headers in every POST request to ensure that the user is authorized. 
I have used Local Storage to store basic User Information(name, email, jwts).


## Run Locally

Clone the project

```bash
  git clone https://github.com/Aad1tya27/task-scheduler
```

Go to the project directory

```bash
  cd task-scheduler
```

### Frontend:

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```
Setup .env file

```bash
  cp .env.example .env
```
To run this project, you will need to add the following environment variables to your .env file

`VITE_SERVER_URI`


Now start the server

```bash
  npm run dev
```


### Backend:

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```
Setup .env file

```bash
  cp .env.example .env
```
To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`
`JWT_SECRET`
`PORT`
`CRYPTO_SECRET`

Start the server

```bash
  node index.js
```




## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

## Deployment

Visit this link to view the deployed version: [Task Scheduler](https://task-scheduler-frontend.onrender.com)



