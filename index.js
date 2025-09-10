require("dotenv").config();
// Require the installed dependency/package
const express = require("express");
const connectDB = require("./config/db");
// Create an instance of express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Import routes
const users = require("./routes/users");
const auth = require("./routes/auth");

// app.route('users').get((req, res) => {
//     res.send('Get all users')
// })

// Set up routes
app.use("/users", users);
app.use("/auth", auth);

// Set port value
const port = 3444;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
