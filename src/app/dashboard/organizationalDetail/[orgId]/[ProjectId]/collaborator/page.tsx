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
const {projectId} = useParams()

 const fetchCollaborator = async (projectId: string) => {
    const res = await fetch(`http://localhost:3001/api/collaborators/${projectId}`,{
        credentials : "include"
    });
    const json = await res.json();
    console.log("data", json);
    setData(json.data);
 }
 useEffect(() => {
    if (!projectId) return;
  
    fetchCollaborator(projectId);
  }, [projectId]);
  
  
    return(
        <div>
      
           collaborator projectId {projectId}
           <SearchInput />
           <TableCollaborator data={data ?? []} />
        </div>
    )
}