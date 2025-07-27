import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
// import { Cookie } from "react-router-dom";

const client = new PrismaClient();
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(200).json({ message: "Good job! user created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error!! please try again" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await client.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
    if (!user) {
      return res.status(400).json({ message: " Wrong login credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong login credentials" });
    }

    const {
      password: userPassword,
      dataJoined,
      lastProfileUpdate,
      ...userDetails
    } = user;
    const token = Jwt.sign(userDetails, process.env.JWT_SECRET!);
    res.cookie("authToken", token).json(userDetails);

    res.send(user);

    console.log(emailOrUsername, password);
    res.send("Logging the user in");
  } catch (e) {
    return res.status(500).json({ message: "something went wrong!" });
  }
};
