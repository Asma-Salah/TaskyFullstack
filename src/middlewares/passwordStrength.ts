import { Request, Response, NextFunction } from "express";
import zxcvbn from "zxcvbn";

function passwordStrength(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;
  const result = zxcvbn(password);
  if (result.score < 3) {
    return res.status(400).json({ message: "please pick stronger password" });
  }
  next();
}
export default passwordStrength;
