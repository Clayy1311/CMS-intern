// "use client";
// //pindahkan usefetct ke const 
// //kirim callback ke modal
// //definiskan dulu modal dan panggil

// import { useEffect, useState } from "react";
// import TableComponents from "@/components/features/organization/Table";
// import { error } from "console";
// import SearchInput from "@/components/features/organization/SearchInput";
// import CreateProjectModal from "@/components/features/organization/CreateModal";
// import { organiaztion } from "@/types/organization";

// export default function OrganizationClient() {
//     const [data, setData] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
//     const [openEdit, setOpenEdit] = useState(false);
//       const handleEdit = (org: Organization) => {
//         setSelectedOrg(org);
//         setOpenEdit(true);
//       };
//    const fecthOrganization = async() => {
//     const res = await fetch("http://localhost:3001/api/resources/all",{
//         credentials: "include",
//         headers:{
//             "Content-type" : "application/json"
//         }
//     })

//     const data = await res.json();
//     setData(data.data);

//     useEffect(() => {
//         fecthOrganization();
//     }, [])
//  }
//     useEffect(() => {
//         fetch("http://localhost:3001/api/resources/all", {
//             credentials: "include",
//         })
//             .then((res) => res.json())
//             .then((res) => setData(res.data));
//     }, []);

//     return (
//         <main>
//             <h1>Organizational Project</h1>
//             <section className="min-h-screen bg-white w-full p-x20 px-15">
//                 <div className="flex w-full pt-20">
//                 <SearchInput onCreateClick={() => setOpen(true)} />
//                 <CreateProjectModal
//                  open={open}
//                  onClose={() => setOpen(false)}
//                  onSuccess={fecthOrganization}
//                    />
//                 </div>
//                 <TableComponents 
//                   onEdit={handleEdit}          
//                data={data} />
//             </section>

//         </main>
//     )
// }


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

"use client";

import { useEffect, useState } from "react";
import TableComponents from "@/components/features/organization/Table";
import SearchInput from "@/components/features/organization/SearchInput";
import CreateProjectModal from "@/components/features/organization/CreateModal";
import { organization } from "@/types/organization";
import { handleDeleteService } from "@/service/organization/organization.service";

type Organization = {
    id: string;
    name: string;
};

export default function OrganizationClient() {
    const [data, setData] = useState<Organization[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    // 🔹 FETCH DATA (SATU SUMBER)
    const fetchOrganization = async () => {
        const res = await fetch("http://localhost:3001/api/resources/all", {
            credentials: "include",
        });
        const json = await res.json();
        setData(json.data);
    };

    useEffect(() => {
        fetchOrganization();
    }, []);


    const handleCreate = () => {
        setSelectedOrg(null);
        setOpen(true);
    };


    const handleEdit = (org: Organization) => {
        setSelectedOrg(org);
        setOpen(true);
    };

    
const handleDelete = async (org: Organization) => {
    const confirmDelete = confirm(
      `Yakin hapus organization "${org.name}"?`
    );
  
    if (!confirmDelete) return;
  
    try {
      await handleDeleteService(org.id);
      await fetchOrganization(); // 🔥 refresh data TANPA reload
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };
  
    return (
        <main>
            <h1>Organizational Project</h1>

            <section className="min-h-screen bg-white px-15">
                <SearchInput onCreateClick={handleCreate} />

                <CreateProjectModal
                    open={open}
                    organization={selectedOrg}
                    onClose={() => setOpen(false)}
                    onSuccess={fetchOrganization}
                />

                <TableComponents
                    data={data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </section>
        </main>
    );
}
