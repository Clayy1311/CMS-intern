"use client";
import TableComponents from "@/components/features/organization/project/Table";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SearchInput from "@/components/features/organization/project/SearchInputs";
import CreateProjectModal from "@/components/features/organization/project/CreateModal";
import { organization } from "@/types/organization";
import { handleDeleteProject } from "@/service/project/project.service";
type Project = {
  id: string;
  name: string;
  collaborators?: string;
};
type Props = {
  organizationId: string;
}

export default function OrgDetailPage({ } : Props) {
  const [data, setData] = useState<Project[]>([]);
  const { id: organizationId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProject = async () => {
    const res = await fetch(`http://localhost:3001/api/project/get-all/${organizationId}`, {
      credentials: "include"
    });
    console.log()
    const json = await res.json();
    console.log("data", json);
    setData(json.data);
  };
  const handleCreate = () => {
    setSelectedProject(null); 
    setOpen(true);
  };
  const handleDelete = async(prj: Project) => {
    const idOrg = organizationId;
    console.log("data", idOrg,prj.id)
     const confirmDelete = confirm(`Yakin hapus project ini?`);

     if(!confirmDelete)return; 
     
      try{
        await handleDeleteProject(idOrg,prj.id);
        await fetchProject();
      } catch(err){
        console.log(err);
        alert("gagal menghapus data")
      }
     
  };

  const handleEdit = (prj: Project) => {
    setSelectedProject(prj);
    setOpen(true);
    console.log("EDIT PROJECT:", prj);
  };

  useEffect(() => {
    fetchProject();
  }, []);


  return (
    <main>
      <h1>Orgnaization Project {organizationId}</h1>
      <div className="m-12 min-h-screen bg-white p-8">
        <SearchInput
          onCreateClick={handleCreate}
        />
        <CreateProjectModal
          open={open}
          project={selectedProject}
          organizationId={organizationId as string}
          onClose={() => setOpen(false)}
          onSuccess={fetchProject}
        />

        <TableComponents
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>


    </main>
  )
}