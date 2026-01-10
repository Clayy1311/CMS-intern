import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrgDetail = {
  id: number;
  name: string;
  lastUpdated: string;
  collaborators: any[];
  collaboratorCount: number;
};
import { Button } from "@/components/ui/button";
type Props = {
  data?: OrgDetail[];
  onEdit: (org: OrgDetail) => void;
  onDelete: (org: OrgDetail) => void;
};

export default function TableComponents({ data = [], onEdit, onDelete }: Props) {
  return (
    <div className="border border-gray-300 rounded-lg mt-2">
      <Table>
        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow>
            <TableHead>Nama Project</TableHead>
            <TableHead>Jumlah Collaborator</TableHead>
            <TableHead>Terakhir Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            data.map((prj) => (
              <TableRow key={prj.id} className="border-b last:border-b-0">
                <TableCell className="py-3 px-6">
                  {prj.id}
                  {prj.name}
                </TableCell>
                <TableCell>
                  {prj.collaboratorCount}
                </TableCell>
                <TableCell className="space-x-2">
                 <Button onClick={() => onEdit(prj)} className="bg-yellow-500">
                 Edit 
                  </Button>
                 <Button
                 onClick={() => onDelete(prj)}
                 className="bg-red-700">
                  Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
