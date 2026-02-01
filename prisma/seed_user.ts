import prisma from "../src/db";
import bcrypt from "bcrypt";

async function main(){


    const hashedPassword = await bcrypt.hash("hawi123", 10)

    const user = await prisma.users.create({
        data : {
            fullName : "Hawimaru",
            email : "hawimaru@gmail.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp",
            avatar : "https://i.pravatar.cc/150?img=3",
            role : {
                connect : { id : 6}
            }
        }
    })
    console.log("user seeded", user)


}
main()
.catch(console.error)
.finally(() => prisma.$disconnect());