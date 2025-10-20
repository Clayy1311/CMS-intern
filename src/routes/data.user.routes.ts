import { createUser, deleteUser, findUserById, getAllUser } from "../controllers/data.user.controller"

import { Router } from "express";

const router = Router();


router.get("/getAll", getAllUser)

router.get("/user/:id", findUserById)

router.post("/create", createUser)

router.delete("/delete/:id", deleteUser)

export default router;