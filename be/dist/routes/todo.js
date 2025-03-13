"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const router = new Router();
const db_1 = __importDefault(require("../db/db"));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    const insetQuery = "INSERT INTO todo (task) VALUES ($1) RETURNING *";
    const values = [task];
    try {
        yield db_1.default.query(insetQuery, values);
        res.status(200).json({
            message: "Task added successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error adding task",
        });
    }
}));
router.get("/all-list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * FROM todo");
        res.status(200).json({
            list: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error adding task",
        });
    }
}));
router.delete("/delete-list/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query("DELETE FROM todo WHERE id = $1", [id]);
        res.status(200).json({
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting task",
        });
    }
}));
router.put("/update-list/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { task } = req.body;
    try {
        yield db_1.default.query("UPDATE todo SET task = $1 WHERE id = $2 RETURNING *", [task, id]);
        res.status(200).json({
            message: "Task updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating task",
        });
    }
}));
router.put("/checked/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { checked } = req.body;
    try {
        yield db_1.default.query("UPDATE todo SET checked = $1 WHERE id = $2 RETURNING *", [checked, id]);
        res.status(200).json({
            message: "Task updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating task",
        });
    }
}));
module.exports = router;
