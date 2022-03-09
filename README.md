<p align="center">
 <img src="https://i.imgur.com/SmVEXaD.png" alt="MyManga-Store backend doc"></a>
</p>

<h3 align="center">MyManga-Store! - Backend  </h3>


---

<p align = "center">💡 This documentation contains all the details for the backend of MyManga-Store! App </p>


## Table of Contents

- [Introduction](#introduction)
- [Technologies used](#tech_used)
- [Live version](#live)
- [Commands](#cmds)

## Introduction <a name = "introduction"></a>

This is the Back-end of a webapp called MyManga-Store! This app is a manga store, it was developed for educational purposes in the Backend Course by Coderhouse in 2021.
The app allows users to view products, add them into the cart, register, login and has many other things!

On the admin-side, the admin gets notify via Email if a user has registered, via SMS & Whatsapp if a user has purchased an item.

On the architectural side, the project was diveded into Services, Routes & Controllers. 

## Technologies used <a name = "tech_used"></a>

**Project Details:**

- This project was developed in Node, Express and Mongo
- uuid, to generate new ids so they can be stored in the DB.
- mongoose, to be able to communicate with the DB.
- bcrypt, to encrypt passwords.
- cors, to allow the developer to use front and backend on the same computer.
- dotenv, to use .env files.
- child_process, to allow the server to run in fork or cluster mode.
- jsonwebtoken, to allow sessions and authentication.
- log4js, to handle reports/logs to the server.
- nodemailer, to send emails when needed.
- twilio, to send SMS/ Whatsapps

**Hosting Details:**
- The project was deployed on Heroku
- The MongoDB was deployed on Atlas

## Live version: <a name = "live"></a>

  - [Live version!](https://mymanga-store.netlify.app/)

## Commands <a name = "cmds"></a>


```
npm install -  to install the project
```
```
npm run start -  to run the project localy
```
