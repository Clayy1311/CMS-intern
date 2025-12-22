"use client";
//pindahkan usefetct ke const 
//kirim callback ke modal
//definiskan dulu modal dan panggil

import { useEffect, useState } from "react";
import TableComponents from "@/components/features/organization/Table";
import { error } from "console";
import SearchInput from "@/components/features/organization/SearchInput";
import CreateProjectModal from "@/components/features/organization/CreateModal";

export default function OrganizationClient() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState();
    
   const fecthOrganization = async() => {
    const res = await fetch("http://localhost:3001/api/resources/all",{
        credentials: "include",
        headers:{
            "Content-type" : "application/json"
        }
    })
    const data = await res.json();
    setData(data.data);

    useEffect(() => {
        fecthOrganization();
    }, [])
 }
    useEffect(() => {
        fetch("http://localhost:3001/api/resources/all", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => setData(res.data));
    }, []);

    return (
        <main>
            <h1>Organizational Project</h1>
            <section className="min-h-screen bg-white w-full p-x20 px-15">
                <div className="flex w-full pt-20">
                <SearchInput onCreateClick={() => setOpen(true)} />
                <CreateProjectModal
                 open={open}
                 onClose={() => setOpen(false)}
                 onSuccess={fecthOrganization}
                   />
                </div>
                <TableComponents onEdit ={ setEdit} data={data} />
            </section>

        </main>
    )
}


// if use server componens

// export default async function OrgPage(){
//     const res = await fetch("http://localhost:3001/api/resources/all",{
//         method: "GET",
//     })
  
//     if(!res){
//         throw new Error("gagal fecth")
//     };
//     const data = await res.json()
//   return(
//     <TableComponents data={data.data} />
//   )
// }
