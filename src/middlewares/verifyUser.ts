import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { UserPayload } from "../types";

function verifyUser(req: Request, res: Response, next: NextFunction) {
  const { authToken } = req.cookies;
  if (!authToken) {
    return res.status(401).json({ message: "unauthorized!! Please login!" });
  }

  jwt.verify(
    authToken,
    process.env.JWT_SECRET!,
    (error: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (error) {
        return res.status(401).json({ messsag: "Unauthorized. please login" });
      }
      req.user = decoded as UserPayload;
      next();
    }
  );
  // return res.send("Verify wether the user is logged in first");
}
export default verifyUser;
