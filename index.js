require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ConnectMongoDb } = require("./Config/database");
const { ErrorHandler } = require("./Middlewares/ErrorHandler");
const UserRoutes = require("./Routes/UserRoutes");
const TaskRoutes = require("./Routes/TaskRoutes");
const cookieParser = require("cookie-parser");

const app = express();
//port
const port = process.env.PORT || 3001;
//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connecting database
ConnectMongoDb();

//routes
app.use("/user", UserRoutes);
app.use("/task", TaskRoutes);

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
//error handling using express-middleware
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
