const { Router } = require("express");
const router = new Router();
import { Request, Response } from "express";
import client from "../db/db";

router.post("/add", async (req: Request, res: Response) => {
  const { task } = req.body;
  const insetQuery = "INSERT INTO todo (task) VALUES ($1) RETURNING *";
  const values = [task];
  try {
    await client.query(insetQuery, values);
    res.status(200).json({
      message: "Task added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding task",
    });
  }
});

router.get("/all-list", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT * FROM todo");
    res.status(200).json({
      list: result.rows,
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
    await client.query("DELETE FROM todo WHERE id = $1", [id]);
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
    await client.query("UPDATE todo SET task = $1 WHERE id = $2 RETURNING *", [task, id]);
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
    await client.query("UPDATE todo SET checked = $1 WHERE id = $2 RETURNING *", [checked, id]);
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
