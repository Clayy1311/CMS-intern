import prisma from "../../db";
import bcrypt from "bcrypt";


export async function getAllUsers(){
    const users = await prisma.users.findMany({
       select : {
        id : true,
        fullName : true,
        email : true,
        job : true,
        country : true,
        isVerified : true,
        company : true,
        avatar : true,
       }
    })

    return users
}

export async function getUserById(userId : number){
    const user = await prisma.users.findUnique({
        where : {
            id : userId
        },
        select : {
            id : true,
            fullName : true,
            email : true,
            job : true,
            country : true,
            isVerified : true,
            company : true,
            avatar : true,
        }
    })

    return user
}

export async function editUserById(userId : number, isVerified : boolean){
    const user = await prisma.users.update({
        where : {
            id : userId
        },data : {
            isVerified
        }
    })

    return user
}

export async function addUser(data: {fullName: string, email: string, job: string, country: string, company: string, avatar?: string, password?: string, isVerified: boolean}) {

   const {fullName, email, job, country, company, avatar, password, isVerified} = data;

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

   const user = await prisma.users.create({
    data : {
        fullName,
        email,
        job,
        country,
        company,
        avatar,
        password : hashedPassword,
        isVerified,
    }
   })
return user
}


export async function deletedUserById(userId : number){

    const user  = await prisma.users.delete({
        where : {
            id : userId
        }
    })
    return user
}