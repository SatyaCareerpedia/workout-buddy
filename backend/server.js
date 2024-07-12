require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const cors = require("cors");

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Catch-all route for undefined paths
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

//connect to db
const mongoUri = "mongodb://localhost:27017/workout-buddy";
const port = process.env.PORT || 3000;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
