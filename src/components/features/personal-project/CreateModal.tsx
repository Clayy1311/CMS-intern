"use client";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { handleCreatePersonalProject } from "@/service/personal-project/personalProject.service";

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}
type Project = {
    name: string;
}


export default function CreatePersonalProjectModal({open, onClose, onSuccess} : Props) {
    const [name, setName] = useState("");

    const handleCreate = async() => {
        await handleCreatePersonalProject({name});
        onClose();
        onSuccess();
    }
    return (
       <Dialog open= {open} onOpenChange={onClose}>
        <DialogContent>
            <DialogTitle className="text-bold text-center">
                Create Personal project
            </DialogTitle>
          <Label htmlFor="name">Nama Project</Label>
          <Input 
          type="text"
          name="name"
          value={name}
          placeholder="Name Project..."
          onChange={(e) => setName(e.target.value)}
          className="border border-blue-600"/>
          <Button onClick={handleCreate} className="bg-[#3A7AC3] text-white py-1" type="button">Create</Button>
        </DialogContent>

       </Dialog>
    );
}