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
import {
  handleCreateOrganization,
  handleUpdateOrganization,
} from "@/service/organization/organization.service";

type Organization = {
  id: string;
  name: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  organization?: Organization | null;
};

export default function CreateProjectModal({
  open,
  onClose,
  onSuccess,
  organization,
}: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEdit = !!organization;  
  useEffect(() => {
    if (organization) {
      setName(organization.name);
    } else {
      setName("");
    }
  }, [organization]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Nama organization wajib diisi");
      return;
    } 

    try {
      setLoading(true);

      if (isEdit && organization) {
        await handleUpdateOrganization(organization.id, { name });
      } else {
        await handleCreateOrganization({ name });
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
            {isEdit ? "Edit Organization" : "Create Organization"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Label htmlFor="name">Nama Organization</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama organization..."
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
              ? "Update Organization"
              : "Add Organization"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
