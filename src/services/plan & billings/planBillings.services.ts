import prisma from "../../db";
import { InformationPackage } from "../../types/subscription";


export async function informationPackage(data:InformationPackage ){
    
    const information = await prisma.subscriptions.findMany({
        where : {
            userId : data.userId,
        },
        select : {
            status  : true,
            startAt : true,
            endAt : true,
            invoiceUrl : true,
            createdAt : true,
            updatedAt : true,
            plan : {
                select : {
                    id : true,
                    code : true,
                    name : true,
                    description : true,
                    price : true,
                    currency : true,
                    interval : true
                }
            }, user : {
                select : {
                    fullName : true,
                    email : true,
                    country : true,
                    job : true,
                    company: true
                }
            }
        }
    })

    return information
}