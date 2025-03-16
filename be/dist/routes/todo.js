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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    try {
        const list = yield prisma.todo.create({
            data: {
                task,
            },
        });
        console.log(list, "v");
        res.status(200).json({
            message: "Task added successfully",
        });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Error adding task",
        });
    }
}));
router.get("/all-list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield prisma.todo.findMany();
        res.status(200).json({
            list,
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
        yield prisma.todo.delete({
            where: {
                id: Number(id),
            },
        });
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
        yield prisma.todo.update({
            where: {
                id: Number(id),
            },
            data: {
                task,
            },
        });
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
        yield prisma.todo.update({
            where: {
                id: Number(id),
            },
            data: {
                checked,
            },
        });
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
