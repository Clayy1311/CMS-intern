import prisma from "../db";

export async function alluser(){
    const user = await prisma.users.findMany()

    return user
}