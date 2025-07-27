import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
async function checkUsernameAndEmailReuse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, email } = req.body;
  const userWithUsername = await client.user.findFirst({
    where: { username },
  });
  if (userWithUsername) {
    return res.status(400).json({ message: "username already exist" });
  }

  const UserWithEmail = await client.user.findFirst({
    where: { email },
  });
  if (UserWithEmail) {
    return res.status(400).json({ message: "email provided in use" });
  }
  next();
}
export default checkUsernameAndEmailReuse;
