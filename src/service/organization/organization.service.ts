import { organization } from "@/types/organization";
import { Delete } from "lucide-react";

export const handleCreateOrganization = async (
  data: organization
) => {
  try {
    const res = await fetch(
      "http://localhost:3001/api/resources/organizations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // penting kalau pakai cookie auth
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to create organization");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};


export const handleUpdateOrganization = async(id: string, data: organization) => {
 try{
  const res = await fetch(`http://localhost:3001/api/resources/organizations/${id}`, {
    method : "PUT",
    credentials: "include",
    headers: {
      "Content-type" : "application/json"
    },
    body: JSON.stringify(data)

  })
  const text = await res.text();
  console.log("sad",text);
 }
 catch(error){
  throw error;
 }
}

export const handleDeleteService = async (id: number) => {
   try{
    const res = await fetch(`http://localhost:3001/api/resources/organizations/${id}/delete`,{
      method: "Delete",
      credentials: "include",
    })
    return await res.json();
   } catch(error){
    throw error;
   }
}