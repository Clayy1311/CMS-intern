
// "use client";

// import { useEffect, useState } from "react";
// import TableComponents from "@/components/features/organization/Table";
// import SearchInput from "@/components/features/organization/SearchInput";
// import CreateProjectModal from "@/components/features/organization/CreateModal";
// import { organization } from "@/types/organization";
// import { handleDeleteService } from "@/service/organization/organization.service";

// type Organization = {
//     id: string;
//     name: string;
// };

// export default function OrganizationClient() {
//     const [data, setData] = useState<Organization[]>([]);
//     const [open, setOpen] = useState(false);
//     const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    
//     const fetchOrganization = async () => {
//         const res = await fetch("http://localhost:3001/api/resources/all", {
//             credentials: "include",
//         });
//         const json = await res.json();
//         setData(json.data);
//     };

//     useEffect(() => {
//         fetchOrganization();
//     }, []);


//     const handleCreate = () => {
//         setSelectedOrg(null);
//         setOpen(true);
//     };


//     const handleEdit = (org: Organization) => {
//         setSelectedOrg(org);
//         setOpen(true);
//     };

    
//    const handleDelete = async (org: Organization) => {
//     const confirmDelete = confirm(
//       `Yakin hapus organization "${org.name}"?`
//     );
  
//     if (!confirmDelete) return;
  
//     try {
//       await handleDeleteService(org.id);
//       await fetchOrganization(); 
//     } catch (err) {
//       console.error(err);
//       alert("Gagal menghapus data");
//     }
//   };
  
//     return (
//         <main>
//             <h1>Organizational Project</h1>

//             <section className="min-h-screen bg-white px-15 py-12">
//                 <SearchInput onCreateClick={handleCreate} />

//                 <CreateProjectModal
//                     open={open}
//                     organization={selectedOrg}
//                     onClose={() => setOpen(false)}
//                     onSuccess={fetchOrganization}
//                 />

//                 <TableComponents
//                     data={data}
//                     onEdit={handleEdit}
//                     onDelete={handleDelete}
//                 />
//             </section>
//         </main>
//     );
// }
