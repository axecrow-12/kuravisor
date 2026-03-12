import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.get("/", (_req, res) => {
  res.send("KuraVisor backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});