"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
const db_1 = __importDefault(require("./db/db"));
app.use(cors());
app.use(express.json());
db_1.default.connect().then(() => console.log("Connected to PostgreSQL"));
const todoRoutes = require("./routes/todo");
app.use("/todo", todoRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
