import { TableCell } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import Link from "next/link";
import { TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table";

type Collaborator = {
    status: string;
    role: string;
    user: {
      id: number;
      fullName: string;
    };
  };
  
  type Props = {
    data?: Collaborator[];
  };
  
  



  export default function TableCollaborator({ data = [] }: Props) {
    if (!data.length) {
      return <p className="p-4 text-gray-500">No collaborator found</p>;
    }
  
    return (
      <div className="border border-gray-300 rounded-lg mt-2">
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={`${item.user.id}-${index}`} className="border-b">
                
                {/* NAME */}
                <TableCell>
                  {item.user.fullName}
                </TableCell>
  
                {/* ROLE */}
                <TableCell>
                  {item.role}
                </TableCell>
  
                {/* STATUS */}
                <TableCell>
                  {item.status}
                </TableCell>
  
                {/* ACTION */}
                {/* <TableCell>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.user.id)}
                  >
                    Hapus
                  </Button>
                </TableCell> */}
  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  