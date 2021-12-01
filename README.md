## My Wallet API 👛

<div align="center">
  <h4>This is the frontend repo, access the frontend repo <a href="https://github.com/cgabrieu/my-wallet-frontend">here</a>.</h4>
  <a href="https://mywallet-cgabrieu.vercel.app/">
    <img src="https://user-images.githubusercontent.com/25062334/144301107-9b86368f-6548-452b-8f82-37a70ca4fe98.gif">
  </a>
    <br />
    <a href="https://mywallet-cgabrieu.vercel.app/">View the deploy</a>
    <br />
</div>

## Usage

Users are able to `sign in` and manage their expenses.
You can `add` and `remove` earnings and expenses. Sign up and have `better control of your financial life`!
  

## Technologies

Tools that were used in the project:
<p>
  <img src='https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
  <img src="https://img.shields.io/badge/Jest-000000?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src='https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img src='https://img.shields.io/badge/eslint-000000?style=for-the-badge&logo=eslint&logoColor=white'>
  <img src='https://img.shields.io/badge/npm-000000?style=for-the-badge&logo=npm&logoColor=white'>
  <img src='https://img.shields.io/badge/Heroku-000000?style=for-the-badge&logo=heroku&logoColor=white'>
</p>

<!-- GETTING STARTED -->
## Getting Started

To run locally follow the steps

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Create the root folder named mywallet and access it
```sh
mkdir mywallet && cd mywallet
```
2. Clone the frontend repo
```sh
git clone https://github.com/cgabrieu/my-wallet-frontend.git
```
3. Install dependencies with npm
```sh
npm install
```
4. Clone the backend repo
```sh
git clone https://github.com/cgabrieu/my-wallet-backend.git
```
5. Install dependencies with npm
```sh
npm install
```
6. Create a database using the command below via postgres
```sh
CREATE DATABASE mywallet;
```
7. Automatically create all necessary tables with <a href="https://github.com/cgabrieu/my-wallet-backend/blob/main/dump.sql">dump</a>. to backend repo.

8. Connect your backend to the database, for that, rename the .env.example to .env.dev and fill in your data.

### How to run

1. Run the frontend using the command (remember to be on the backend repo): 
```sh
npm run start:dev
```
2. Run the frontend using the command (remember to be on the fronend repo): 
```sh
npm start
```

## Developer

* [Carlos Gabriel](https://github.com/cgabrieu)
