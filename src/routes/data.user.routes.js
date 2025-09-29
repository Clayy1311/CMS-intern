import { createuser, deleteUser, findUserByid, getAllUser } from "./data.user.controller.js";

import { Router } from "express";

const router = Router();


router.get("/getAll", getAllUser)

router.get("/user/:id", findUserByid)

router.post("/create", createuser)

router.delete("/delete/:id", deleteUser)

export default router;