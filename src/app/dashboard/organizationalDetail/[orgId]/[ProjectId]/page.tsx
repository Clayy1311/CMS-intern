"use client";
import { useState } from "react"
import { useParams } from "next/navigation";
import { useEffect } from "react";
import TableCollaborator from "@/components/features/organization/collaborator/table";
import SearchInput from "@/components/features/organization/collaborator/SearchInput";
type Props = {
    CollaboratorId : string;
}
export default function PageCollaborator({CollaboratorId} : Props) {

const [data, setData]= useState()
const {id} = useParams()

 const fetchCollaborator = async (id: string) => {
    const res = await fetch(`http://localhost:3001/api/collaborators/${id}`,{
        credentials : "include"
    });
    const json = await res.json();
    console.log("data", json);
    setData(json.data);
 }
 useEffect(() => {
    if (!id) return;
  
    fetchCollaborator(id);
  }, [id]);
  
  
    return(
        <div>
           collaborator id {id}
           <SearchInput />
           <TableCollaborator data={data ?? []} />
        </div>
    )
}