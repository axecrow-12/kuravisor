import { Router, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", authenticateToken, (req: AuthRequest, res: Response) => {
  res.status(200).json({
    message: "Protected route accessed successfully.",
    user: req.user,
  });
});

export default router;