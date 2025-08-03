import { PrismaClient } from "@prisma/client";
import cloudinary, { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";

const client = new PrismaClient();
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

export const uploadAvatar = async (req: Request, res: Response) => {
  if (req.file) {
    const uploadResult: UploadApiResponse = await new Promise((resolve) => {
      cloudinary.v2.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            res.status(400).json({ message: "Something went wrong" });
            return;
          }
          return resolve(uploadResult as UploadApiResponse);
        })
        .end(req.file?.buffer);
    });
    if (uploadResult) {
      const { id } = req.user;
      const user = await client.user.update({
        where: { id },
        data: { avatar: uploadResult.secure_url },
      });
      if (user) {
        res.status(200).json({ url: user.avatar });
        return;
      }
    }
  }
};
