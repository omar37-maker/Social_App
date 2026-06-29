import { Router } from "express";
import userService from "./user.service";
import { upload } from "./../../Middlewares";

const userController = Router();

userController.post(
  "/upload-profile",
  upload.single("profile"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await userService.uploadProfilePicture(req.file!);
    return res.status(200).json(result);
  },
);

userController.post(
  "/upload-cover",
  upload.array("cover"),
  async (req, res) => {
    if (!req.files)
      return res.status(400).json({ message: "No files uploaded" });

    const result = await userService.uploadCoverPictures(
      req.files as Express.Multer.File[],
    );
    return res.status(200).json(result);
  },
);

userController.post("/renew-expired-url", async (req, res) => {
  const { keys } = req.body;
  const result = await userService.renewExpiredUrl(keys);
  return res.status(200).json(result);
});

userController.delete("/delete-file", async (req, res) => {
  const { key } = req.body;
  const result = await userService.deleteFile(key);
  return res.status(200).json(result);
});
export default userController;
