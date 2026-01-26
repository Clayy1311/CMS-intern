"use client";

import { cache, useEffect, useState } from "react";
import SearchInput from "@/components/features/personal-project/SearchInput";
import TablePersonalProject from "@/components/features/personal-project/Table";
import { handleDeletePersonalProject } from "@/service/personal-project/personalProject.service";
import CreatePersonalProjectModal from "@/components/features/personal-project/CreateModal";
type PersonalProject = {
    id: string;
    name: string;
    lastUpdated: string;
};

export default function PersonalPage() {
    const [data, setData] = useState<PersonalProject[]>([]);
    const [openmodal, setOpenModal] = useState(false);
    const [selectedmodal, setSelectedModal] = useState();

    const fetchPersonalProject = async () => {
        const res = await fetch("http://localhost:3001/api/personal-projects", {
            credentials: "include",

        })
        const json = await res.json();
        console.log("data personal project", json)
        setData(json.data);
    }
    const handleDelete = async (pprj: PersonalProject) => {
        const confirmDelete = window.confirm(`Yakin delete"${pprj.name}?"`);
        if (!confirmDelete) return;

        try {
            await handleDeletePersonalProject(pprj.id);
            await fetchPersonalProject();
            console.log("clicked delete")

        } catch (err) {
            console.error(err);
            alert("gagal menghapus data")
        }
    }
    const handleCreate = async() => {
      setOpenModal(true);
    }
    useEffect(() => {

        fetchPersonalProject();
    }, [])


    return (
        <main>
            <section className="min-h-screen bg-white px-15 py-12">
                <SearchInput
                onCreateClick={handleCreate}
                />
                <section className="mt-7">
                    <TablePersonalProject
                        data={data}
                        handleDelete={handleDelete}
                    />
                    <CreatePersonalProjectModal
                    open={openmodal}
                    onClose={() => setOpenModal(false)}
                    onSuccess={fetchPersonalProject}
                   />

                </section>
            </section>

        </main>
    );
}