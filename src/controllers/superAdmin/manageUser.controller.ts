import { getAllUsers, getUserById, editUserById,addUser, deletedUserById} from "../../services/superAdmin/userManagement.services";
import { Request, Response } from "express";


export async function getUsers(req:Request, res:Response){

    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getUser(req:Request, res:Response){
    const userId = parseInt(req.params.userId);
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function editUser(req:Request, res:Response){
    const userId = parseInt(req.params.userId);
    const { isVerified } = req.body;
    try {
        const user = await editUserById(userId, Boolean(isVerified));
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export async function addNewUser(req:Request, res:Response){
    const {fullName, email, job, country, company, avatar, password, isVerified} = req.body;

    try {
        const user = await addUser({fullName, email, job, country, company, avatar, password, isVerified})

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteUser(req:Request, res:Response){
    const userId =  parseInt(req.params.userId);

    try{
        const user = await deletedUserById(userId)

        if(!user){
            return res.status(404).json({error : "User not found"})
        }

        res.json({success : true, message : "user deleted successfully"})
    }catch(error){
        res.status(500).json({ error: "Internal Server Error" });
    }
}
