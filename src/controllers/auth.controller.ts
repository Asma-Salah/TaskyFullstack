import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

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
    return res
      .cookie("authToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json(userDetails);
  } catch (e) {
    return res.status(500).json({ message: "something went wrong!" });
  }
};

export const updatedPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    console.log(req.user);
    const { currentPassword, newPassword } = req.body;
    console.log(req.body);
    const user = await client.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ Message: "Current password incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await client.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    res.status(200).json({ Message: "Password updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops!!. Something went wrong!" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "logout successfully" });
};
