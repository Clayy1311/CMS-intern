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
type Organization = {
  id: string;
  name: string;
};
type Props = {
  data: Organization[];
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export default function TableComponents({ data, onEdit, onDelete }: Props) {


  return (
    <div className="border border-gray-300 rounded-lg mt-2">
      <Table>
        <TableBody>
          {data.map((org) => (
            <TableRow key={org.id} className="border-b last:border-b-0">
              <TableCell className="py-3 px-6">
                {org.id}
                <Link
                  href={`/dashboard/organizationalDetail/${org.id}?name=${org.name}`} >
                  {org.name}
                </Link>

              </TableCell>
              <TableCell className="space-x-2">
                <Button onClick={() => onEdit(org)} className="bg-yellow-500">Edit</Button>
                <Button onClick={() => onDelete(org)} className="bg-red-700">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
}
