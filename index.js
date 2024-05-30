require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ConnectMongoDb } = require("./Config/database");
const { ErrorHandler } = require("./Middlewares/ErrorHandler");
const UserRoutes = require("./Routes/UserRoutes");
const TaskRoutes = require("./Routes/TaskRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// port
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for all routes before defining them
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend's URL
  credentials: true, // Enable sending cookies from the frontend
}));

// connecting database
ConnectMongoDb();

// routes
app.use("/user", UserRoutes);
app.use("/task", TaskRoutes);


// error handling using express-middleware
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
