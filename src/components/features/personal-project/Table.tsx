import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  } from "@/components/ui/table";
import { handleCreateOrganization } from "@/service/organization/organization.service";
  import { Trash2 } from "lucide-react";
  import { ArrowRight } from "lucide-react";
  type PersonalProject = {
    id: string;
    name: string;
    lastUpdated: string;
  };
  
  type Props = {
    data: PersonalProject[];
    handleDelete: (pprj: PersonalProject)=> void;
  };
  export default function TablePersonalProject({ data, handleDelete }: Props) {
    const formatDate = (dateString: string) =>
      new Date(dateString).toLocaleDateString("id-ID");
  
    return (
      <Table className="overflow-hidden rounded-md border ">
        <TableHeader className="bg-[#3A7AC3] rounded-md border">
          <TableRow>
            <TableHead className="text-white text-center">
                no
            </TableHead>
            <TableHead className="text-white text-center">
              Nama Project
            </TableHead>
            <TableHead className="text-white text-center">
              Last Update
            </TableHead>
            <TableHead className="text-white text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
  
        <TableBody className="pt-6 text-center">
          {data.map((pprj) => (
            <TableRow key={pprj.id}>
                <TableCell>{pprj.id}</TableCell>
              <TableCell>{pprj.name}</TableCell>
              <TableCell className="text-center">
                {formatDate(pprj.lastUpdated)}
              </TableCell>
              <TableCell className="">
                <button onClick={() => {handleDelete(pprj)}}>
                <Trash2 className="mx-auto text-red-600 cursor-pointer" size={18} />
                </button>
               <button>
               <ArrowRight className="mx-auto text-blue-500 cursor-pointer" size={18} />
               </button>
               
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  