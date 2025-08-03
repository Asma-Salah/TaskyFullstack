import { NextFunction, Request, Response } from "express";

function validateTask(req: Request, res: Response, next: NextFunction) {
  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({ message: "Title required" });
    return;
  }
  if (!description) {
    res.status(400).json({ message: "Description required" });
    return;
  }
  next();
}
export default validateTask;
