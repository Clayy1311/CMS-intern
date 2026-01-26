import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
type Organization = {
  id: number;
  name: string;
  collaboratorCount: number;
};

type Props = {
  data: Organization[];
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export default function TableComponents({ data, onEdit, onDelete }: Props) {


  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden mt-2">
    <Table>
      <TableHeader>
        <TableRow className="bg-[#3A7AC3] text-white h-14">
          <TableHead className="py-4 text-white">ID</TableHead>
          <TableHead className="py-4 text-white">Organization</TableHead>
          <TableHead className="py-4 text-center text-white">
            Collaborators
          </TableHead>
          <TableHead className="py-4 text-center text-white">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

        <TableBody>
          {data.map((org) => (
            <TableRow key={org.id} className="border-b last:border-b-0">

              <TableCell className="py-3 px-6">
                {org.id}
              </TableCell>

              <TableCell>
                <Link
                  href={`/dashboard/organizationalDetail/${org.id}?name=${org.name}`}
                  className="text-blue-600 hover:underline"
                >
                  {org.name}
                </Link>
              </TableCell>

              {/* 🔥 INI YANG KAMU MAU */}
              <TableCell className="text-center font-medium">
                {org.collaboratorCount}
              </TableCell>

              <TableCell className="space-x-2 text-center">
                <button onClick={() => onEdit(org)}>
                 <Pencil className="text-yellow-600" size={18} />
                </button>
                <button onClick={() => onDelete(org)}>
                <Trash2 className="text-red-600" size={18} />
                </button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>

  );
}
