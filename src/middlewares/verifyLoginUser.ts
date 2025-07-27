import { Request, Response, NextFunction } from "express";

function verifyLogInUser(req: Request, res: Response, next: NextFunction) {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername) {
    return res.status(400).json({ message: "emailOrUsername needed" });
  }
  if (!password) {
    return res.status(400).json({ message: "password needed" });
  }
  next();
}
export default verifyLogInUser;
