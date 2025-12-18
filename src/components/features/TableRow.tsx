import Link from "next/link"
import { TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function OrganizationRow({ org }: { org: any }) {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/organizational/${org.id}`}
          className="text-blue-500 hover:underline"
        >
          {org.name}
        </Link>
      </TableCell>

      <TableCell className="text-center">-</TableCell>

      <TableCell>
        <div className="flex gap-2">
          <Button variant="destructive" size="sm">
            Delete
          </Button>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
