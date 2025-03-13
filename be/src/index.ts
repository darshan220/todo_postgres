const express = require("express");
const cors = require("cors");
const app = express();
import client from "./db/db";

app.use(cors());
app.use(express.json());

client.connect().then(() => console.log("Connected to PostgreSQL"));

const todoRoutes = require("./routes/todo");

app.use("/todo", todoRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
