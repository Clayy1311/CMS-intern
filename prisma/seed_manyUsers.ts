import prisma from "../src/db";
import bcrypt from "bcrypt";




async function main(){
    
    const hashedPassword = await bcrypt.hash("Hawi123", 10)

    const user = await prisma.users.createMany({
       data : [
        {
             fullName : "Satria Wira Yudha",
            email : "satria@gmail.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp",
            avatar : "https://i.pravatar.cc/150?img=3",
            
        } ,
        {
            fullName : "Bagus Adi Nugraha",
            email : "bagus@gmail.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp",
            avatar : "https://i.pravatar.cc/150?img=3",
        },
          {
            fullName : "Raden Mas Cahya Buwana",
            email : "raden@gmail.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp",
            avatar : "https://i.pravatar.cc/150?img=3",
        },
         {
            fullName : "Galih Pratama Wicaksana",
            email : "galih@gmail.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp",
            avatar : "https://i.pravatar.cc/150?img=3",
        },
         {
            fullName : "Ksatria Jaya Kusuma",
            email : "ksatria@gmail.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp",
            avatar : "https://i.pravatar.cc/150?img=3",
        },
           {
            fullName : "Arjuna Wira Yudha",
            email : "arjuna@gmail.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp",
            avatar : "https://i.pravatar.cc/150?img=3"
        }
         
        
       ]
    })

    console.log("users seeded", + user)
}
main()
.catch(console.error)
.finally(() => prisma.$disconnect)