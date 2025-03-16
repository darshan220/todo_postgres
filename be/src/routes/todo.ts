const express = require("express");
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  const { task } = req.body;
  try {
    const list = await prisma.todo.create({
      data: {
        task,
      },
    });
    console.log(list,"v")
    res.status(200).json({
      message: "Task added successfully",
    });
  } catch (error) {
  console.log(error,"error")
    res.status(500).json({
      message: "Error adding task",
    });
  }
});

router.get("/all-list", async (req: Request, res: Response) => {
  try {
    const list = await prisma.todo.findMany();
    res.status(200).json({
      list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding task",
    });
  }
});

router.delete("/delete-list/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
    });
  }
});

router.put("/update-list/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { task } = req.body;
  try {
    await prisma.todo.update({
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
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
    });
  }
});

router.put("/checked/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { checked } = req.body;
  try {
    await prisma.todo.update({
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
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
    });
  }
});

module.exports = router;
