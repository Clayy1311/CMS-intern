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
import { useState } from "react";
import { handleCreateOrganization } from "@/service/organization/organization.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onEdit: () => void;
};

export default function CreateProjectModal({ open, onClose, onSuccess,onEdit }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Nama organization wajib diisi");
      return;
    }
    try {
      setLoading(true);
      await handleCreateOrganization({ name });
      onSuccess();
      onClose(); 
      setName("");
    } catch (err: any) {
      setError(err.message || "Gagal membuat organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Create Organization
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
            onClick={handleCreate}
            disabled={loading}
            className="bg-[#3A7AC3] w-full"
          >
            {loading ? "Menyimpan..." : "Add Organization"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
