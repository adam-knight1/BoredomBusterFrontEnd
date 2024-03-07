# BoredomBuster Frontend

The BoredomBuster frontend is a web application built using React and Next.js, providing a rich interactive UI for various entertaining and informative activities. It's designed to work with the BoredomBuster backend, delivering features like weather facts, history trivia, and more right to your browser.

## Getting Started

To get the frontend running locally:

- Clone this repository
- Run `npm install` to install all the required dependencies
- Execute `npm run dev` to start the local development server

The application will be available at [http://localhost:3000](http://localhost:3000). Visit this URL in your web browser to start exploring the app.

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm run build` - Builds the app for production to the `.next` folder.
- `npm start` - Runs the app in production mode after building.

## API Keys

The backend requires an API key from [API-Ninjas](https://api-ninjas.com/) to fetch data like weather, facts, and trivia questions. If you plan to run this project locally and use all its features, you will need to obtain a free api key.  

Once you have your API key, create a `.env` file in the root of the backend project and add your API key as follows:

API_KEY=your_api_ninjas_key_here

This `.env` file will be read by the backend to authenticate API requests.  You can also add the api key directly into
service endpoints where the connection request properties are being set: connection.setRequestProperty("X-Api-key", "your API key here");


