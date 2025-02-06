// // app.js
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const taskRoutes = require("./routes/taskRoutes");

// const app = express();
// app.use(express.json());
// app.use(cors());
// connectDB();

// app.use("/api/auth", authRoutes);
// app.use("/api", taskRoutes);

// app.listen(20000, () => console.log("Server running on port 20000"));














// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

// Define the path to the Vite build directory
const buildPath = path.join(__dirname, './frontend/dist');
app.use(express.static(buildPath));
// Wildcard route to handle client-side routing for React
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Wildcard route for React client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/dist', 'index.html'));
});


app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.listen(20000, () => console.log("Server running on port 20000"));
