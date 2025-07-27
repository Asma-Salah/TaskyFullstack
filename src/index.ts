import express, { Express, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import cors from "cors";

import cookieParser from "cookie-parser";

import verifyLogInUser from "./middlewares/verifyLoginUser";

import authRouter from "./routes/auth.route";

const client = new PrismaClient();
const app: Express = express();
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>My New Tasky api</h1>");
});

app.use("/api", authRouter);

// app.post("/api/auth/login", verifyLogInUser, async (req, res) => {
//   try {
//     const { emailOrUsername, password } = req.body;
//     const user = await client.user.findFirst({
//       where: {
//         OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
//       },
//     });
//     // console.log(user);
//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);

//     console.log(password);
//     console.log(user.password);
//     console.log(isMatch);
//     if (!user) {
//       return res.status(400).json({ message: "invalid credentials" });
//     }
//     const userDetails = {
//       userId: user.id,
//       email: user.email,
//       username: user.username,
//     };

//     const token = Jwt.sign(
//       {
//         userDetails,
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "1d" },
//     );

//     return res.cookie("authToken", token).json(userDetails);

//     console.log(token);

//     return res.status(200).json({
//       message: "login successful",
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json({ message: "login failed" });
//   }
// });

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`App is live on port ${port}`));
