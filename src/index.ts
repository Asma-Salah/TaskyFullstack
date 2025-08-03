import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import tasksRouter from "./routes/tasks.route";
import route from "./routes/profile.route";

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
app.use("/api/tasks", tasksRouter);
app.use("/api/avatar", route);
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`App is live on port ${port}`));
