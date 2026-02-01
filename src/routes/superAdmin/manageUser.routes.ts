import  {Router} from 'express';
import { getUser, getUsers, editUser, addNewUser, deleteUser} from "../../controllers/superAdmin/manageUser.controller"


const router = Router()

router.get("/users", getUsers)
router.get("/user/:userId", getUser)
router.patch("/user/:userId/edit", editUser)
router.post("/user/add", addNewUser)
router.delete("/user/:userId/delete", deleteUser)

export default router;