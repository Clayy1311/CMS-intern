import express from "express";
import dotenv from "dotenv";
import authUser from "./src/auth/auth.routes.js";
import userData from "./src/datauser/data.user.routes.js";
import profile from "./src/profile/profile.routes.js";
import home from "./src/home/home.routes.js"


const app = express();

app.use(express.json());

dotenv.config();
app.get("/", (res) => {
    res.send("Halo")
});

app.use("/api/auth", authUser);
app.use("/api/g", userData);
app.use("/api/dashboard", profile, home);


const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
});
