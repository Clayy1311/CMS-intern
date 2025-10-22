import express from "express";
import dotenv from "dotenv";
import authUser from "./routes/auth.routes";
import userData from "./routes/data.user.routes";
import profile from "./routes/profile.routes";
import home from "./routes/home.routes";
import { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import organizationsRoutes from "./routes/organizations.routes";
const app = express();

app.use(express.json());

dotenv.config();
app.get("/", (req: Request, res:Response) => {
    res.send("Halo")
});

app.use("/api/auth", authUser);
app.use("/api/g", userData);
app.use("/api/dashboard", authMiddleware, profile, home);

//Organizations
app.use("/api",authMiddleware,organizationsRoutes)
const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
});
