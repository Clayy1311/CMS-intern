import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Organization = {
  id: string;
  name: string;
};

export default function TableComponents({ data,}: { data: Organization[];
}) {
  return (
    <div className="border border-gray-300 rounded-lg mt-2">
      <Table>
        <TableBody>
          {data.map((org) => (
            <TableRow key={org.id} className="border-b last:border-b-0">
              <TableCell className="py-3 px-6">{org.name}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
}
