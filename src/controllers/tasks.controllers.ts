import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const client = new PrismaClient();
export const createTasks = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;
    await client.task.create({
      data: { title, description, userId: id },
    });
    res.status(201).json({ Message: "New task created successfully" });
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const tasks = await client.task.findMany({
      where: { userId: id, isCompleted: false, isDeleted: false },
    });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await client.task.update({
      where: { id: taskId },
      data: { isDeleted: true },
    });
    res.status(200).json({ message: "task deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { id } = req.user;
    const task = await client.task.findFirst({
      where: {
        AND: [{ id: taskId }, { userId: id }, { isDeleted: false }],
      },
    });
    if (!task) {
      res.status(404).json({ Message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;
    await client.task.update({
      where: { id: taskId },
      data: {
        title: title && title,
        description: description && description,
      },
    });
    res.status(200).json({ message: "Task Created Successfully!" });
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const markComplete = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    if (taskId) {
      const TaskIsCompleted = req.body?.isCompleted;
      if (TaskIsCompleted == undefined) {
        res.status(400).json({ Message: "specify isCompleted" });
      }
      const { isCompleted } = await client.task.update({
        where: { id: taskId },
        data: { isCompleted: TaskIsCompleted },
      });

      res.status(200).json({ message: "task completed", isCompleted });
    }
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const getCompletedTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const tasks = await client.task.findMany({
      where: { userId: id, isCompleted: true, isDeleted: false },
    });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const restore = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    if (taskId) {
      const task = await client.task.update({
        where: { id: taskId, isDeleted: true },
        data: { isDeleted: false },
      });

      res.status(200).json(task);
    }
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const getTrash = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const tasks = await client.task.findMany({
      where: { userId: id, isDeleted: true },
    });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const getSpecificUser = async (req: Request, res: Response) => {
  try {
    console.log("run specific user");
    const { id } = req.user;
    const user = await client.user.findUnique({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.status(200).json({ message: "user retrieved successfully", user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, username, email } = req.body;
    console.log(req.body);
    const updatedUser = await client.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        username,
        email,
      },
    });

    res
      .status(200)
      .json({ message: "profile updated successfully", updatedUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};
