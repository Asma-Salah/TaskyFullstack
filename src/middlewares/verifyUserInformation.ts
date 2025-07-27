import { Request, Response, NextFunction } from "express";

function verifyUserInformation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { firstName, lastName, username, email, password } = req.body;
  if (!firstName) {
    return res.status(400).json({ message: "Enter your firstName" });
  }
  if (!lastName) {
    return res.status(400).json({ message: "Enter your lastName" });
  }
  if (!username) {
    return res.status(400).json({ message: "Enter your username" });
  }
  if (!email) {
    return res.status(400).json({ message: "Enter your email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Enter your password" });
  }
  next();
}
export default verifyUserInformation;
