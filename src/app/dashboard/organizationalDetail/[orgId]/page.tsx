"use client";
import TableComponents from "@/components/features/organization/project/Table";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SearchInput from "@/components/features/organization/project/SearchInputs";
import CreateProjectModal from "@/components/features/organization/project/CreateModal";
import { organization } from "@/types/organization";
import ModalCollaborator from "@/components/features/organization/collaborator/ModalCollaborator";
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
  const { orgId: organizationId } = useParams();
  const [prjid, setPrjId] = useState<string | null>(null);


  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const[modalcollaborator, setModalCollaborator] = useState(false);

  const fetchProject = async () => {
    const res = await fetch(`http://localhost:3001/api/project/get-all/${organizationId}`, {
      credentials: "include"
    });
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

  const handleCollaborator = async (prj: Project) => {
    setModalCollaborator(true);
    const ProjectId = prj.id;
    setPrjId(ProjectId);
    console.log("button clicked with id: ", ProjectId);

  }

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
          modalCollaborator={handleCollaborator}
        />

       
       <ModalCollaborator 
       open={modalcollaborator}
       onClose = {() => setModalCollaborator(false)}
       ProjectId={prjid}
       
       />

      </div>


    </main>
  )
}