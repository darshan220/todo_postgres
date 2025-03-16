"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const todoRoutes = require("./routes/todo");
app.use("/todo", todoRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
