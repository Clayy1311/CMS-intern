"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { handleCreateProject, hanldeUpdateProject } from "@/service/project/project.service";
type Project = {
  id: string;
  name: string;
  organizationId: string;
  collaborators?: string;

};


type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: Project | null;
  organizationId: string;
};


export default function CreateProjectModal({
  open,
  onClose,
  onSuccess,
  project,
  organizationId,
}: Props) {

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEdit = !!project;
  useEffect(() => {
    if (project) {
      setName(project.name);
    } else {
      setName("");
    }
  }, [project]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Nama project wajib diisi");
      return;
    }

    try {
      setLoading(true);

      if (isEdit && project) {
        await hanldeUpdateProject(
          organizationId,
          project.id,
          { name }
        ); 

      }

      else {
        await handleCreateProject({ name });
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Edit Project" : "Create Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Label htmlFor="name">Nama Project</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Project..."
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#3A7AC3] w-full"
          >
            {loading
              ? "Menyimpan..."
              : isEdit
                ? "Update Project"
                : "Add Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
