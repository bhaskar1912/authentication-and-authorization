require("dotenv").config();
const express = require("express");
const connectDb = require("./database/db");
const router = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();

// connect to database

connectDb();

// middlewares

app.use(express.json());

// routing

app.use("/api/auth", router);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
