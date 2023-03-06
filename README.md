# CRAP·E AI Image Generation

This program generates images using DALL·E's openai api.

## Getting Started
First we need to install all dependencies both in [client](/client/) and [server](/server/) using the following commands in they respective directory:

### Client: 
```
cd client
yarn
```

### Server:
```
cd server
yarn
```

## Setup and starting the server

Before running the client we need to setup the backend, in this project we are using mongodb as DBMS and cloudinary for store the generated images as well as open-ai, so we'll need api keys and a uri for the database connection which we'll setup after create the `/server/.env` file.

Then we run the server in either dev or production mode, you can found the instruction at it's respective README file which you can found [here](/server/README.md).

Also you can found the complete list of enviroment variables needed for the backend at [`/server/README.md`](/server/README.md) or [`/server/environment.d.ts`](/server//environment.d.ts)

## Starting the frontend

After server is setup and running, we just need to follow the instructions at [`/client/README.md`](/client/README.md) or we can just run the following command for start the development server:
```
cd client
yarn dev
```

<br>

## Deployment 
We can deploy the server in the web service platform of our preference, then setup enviroment variables and define the commands for build and start the server.

For the client we need to execute the following command:
```
cd client
yarn build
```
This will generate a `dist` folder which we can deploy in any shared hosting such as github pages, hostinger, hostgator, etc.

Note: remember to change the `baseURL` variable at [`/client/src/api/postApi.ts`](/client/src/api/postApi.ts) to where your backend is deployed before building the frontend.