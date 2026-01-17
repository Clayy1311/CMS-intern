"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Collaborator = {
    id: number;
    status: string;
    role: string;
    user: {
        id: number;
        fullName: string;
    };
};


type User = {
    id: number;
    email: string;
};


type Props = {
    open: boolean;
    onClose: () => void;
    ProjectId: string | null;
};

export default function ModalCollaborator({
    open,
    onClose,
    ProjectId,
}: Props) {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    /* ================= FETCH COLLABORATOR ================= */
    const fetchCollaborators = async () => {
        if (!ProjectId) return;

        const res = await fetch(
            `http://localhost:3001/api/collaborators/${ProjectId}`,
            { credentials: "include" }
        );

        const json = await res.json();
        setCollaborators(json.data);
    };

    /* ================= FETCH USER (UNTUK DROPDOWN) ================= */
    const fetchUsers = async () => {
        const res = await fetch(`http://localhost:3001/api/g/getAll`, {
            credentials: "include",
        });
        const json = await res.json();
        setUsers(json.user);
    };

    /* ================= ADD COLLABORATOR ================= */
    const handleAdd = async () => {
        if (!selectedUserId || !ProjectId) return;

        await fetch(`http://localhost:3001/api/collaborators/${ProjectId}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                projectId: ProjectId,
                userId: selectedUserId,
            }),
        });

        setSelectedUserId("");
        fetchCollaborators();
    };

    /* ================= DELETE COLLABORATOR ================= */
    const handleDelete = async (CollaboratorId: number, UserId: number) => {
        if (!ProjectId) return;

        const confirmDelete = confirm("Hapus collaborator?");
        if (!confirmDelete) return;

        await fetch(
            `http://localhost:3001/api/collaborators/${ProjectId}/${CollaboratorId}/${UserId}/delete`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        fetchCollaborators();
    };

    useEffect(() => {
        if (!open || !ProjectId) return;

        fetchCollaborators();
        fetchUsers();
    }, [open, ProjectId]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Collaborators</DialogTitle>
                </DialogHeader>

                {/* ===== ADD COLLABORATOR ===== */}
                <div className="flex gap-2 mb-4">
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    >
                        <option value="">Pilih user</option>

                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.email}
                            </option>
                        ))}
                    </select>


                    <Button onClick={handleAdd}>Add</Button>
                </div>

                {/* ===== TABLE COLLABORATOR ===== */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {collaborators.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
                                    No collaborators
                                </TableCell>
                            </TableRow>
                        ) : (
                            collaborators.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.user.fullName}, 
                                        {item.id}</TableCell>
                                    <TableCell>{item.role}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(item.id, item.user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
}
