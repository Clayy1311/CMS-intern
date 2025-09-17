import express from "express";
import dotenv from "dotenv";
import authUser from "./src/auth/auth.routes.js";

const app = express();

app.use(express.json());

dotenv.config();
app.get("/", (res) => {
    res.send("Halo")
});

app.use("/api/auth", authUser);
const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
});
