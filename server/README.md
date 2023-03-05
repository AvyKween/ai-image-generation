# Typescript + Express + MongoDB Rest Server

A simple boilerplate for create a restful api with node and express for the backend and mongodb as database.

## Getting Started
First you need to create a `.env` file and set the port you'll be using and your connection to the database:
```
PORT= 
MONGO_URI=
OPENAI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Then run the development server:
```
yarn dev
```

## Build for Production

Execute the next command:
```
yarn build
```
This will generate a `/dist` folder then you can run the next command for start the server:
```
yarn start
```

You can start by modifying `routes/user.ts` or add your custom routes to `routes/`.

## Author Notes
 - It is highly recommended to handle your routes controllers in the `controllers/` folder as it will allow a non-linear organization and a better readability.
 - If needed, you can add more enviroment variables by modifying `enviroment.d.ts` && `.env` files.