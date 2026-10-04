import pool from "./config/database.js";
import express from "express";
//imports the express package from the node_modules folder. Express is a web application framework for Node.js that simplifies the process of building web applications and APIs//
import cors from "cors";
// imports the cors package which allows the React frontend to contact this backend.
import morgan from "morgan";
// imports the morgan package which logs incoming requests in the terminal. Morgan is a HTTP request logger middleware for Node.js that logs details about incoming requests to the console or a file. It helps in monitoring and debugging web applications by providing information about the requests made to the server//
import dotenv from "dotenv";
// imports the dotenv package. Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. It allows you to manage configuration settings and sensitive information (like API keys, database credentials, etc.) in a separate file, keeping them out of your source code//
import staffRoutes from "./routes/staffRoutes.js";
// imports the staff routes so the server can use them to handle requests related to staff members.
import activityRoutes from "./routes/activityRoutes.js";
//imports the activity routes.
import locationRoutes from "./routes/locationRoutes.js";
// imports the location routes.   

dotenv.config();

import rotaRoutes from "./routes/rotaRoutes.js";
// this line loads the environment variables from a .env file into process.env, making them accessible throughout the application. It allows you to use environment-specific configurations without hardcoding them into your code//
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use('/api/rota', rotaRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/locations', locationRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Server is running"
  });
});

// starts the server and listens for requests on the selected port.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

