import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {CaretSortIcon} from "@radix-ui/react-icons";

const sorting = true;
export const columnDef = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select"
      />
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({row}) => <p>{row.getValue("id")}</p>,
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({row}) => <p>{row.getValue("first_name")}</p>,
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "email",
    header: sorting
      ? ({column}) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              {sorting ? <CaretSortIcon className="ml-2 h-4 w-4" /> : null}
            </Button>
          );
        }
      : "Email",
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell: ({row}) => <Badge>{row.getValue("first_name")}</Badge>,
  },
  {
    accessorKey: "university",
    header: "University",
  },
];
