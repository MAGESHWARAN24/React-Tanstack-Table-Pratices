import React from "react";
import data from "../assets/data.json";
import {columnDef} from "@/assets/columnDef";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {Button} from "./ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {Input} from "./ui/input";
function BasicTable() {
  const tableData = React.useMemo(() => data, []);
  const col_structure = React.useMemo(() => columnDef, []);
  const [golbalFilter, setGolbalFilter] = React.useState();
  const [sorting, setSorting] = React.useState([]);
  const [rowSelection,setRowSelection] = React.useState({})
  const basicTable = useReactTable({
    columns: col_structure,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: golbalFilter,
      rowSelection: rowSelection
    },
    onGlobalFilterChange: setGolbalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true
  });
  console.log(basicTable.getFilteredSelectedRowModel().rows.map(e => e.original))
  return (
    <>
      <h1>Basic Table</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableCell colSpan={2}>
              <div className="w-full flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => basicTable.setPageIndex(0)}
                >
                  <DoubleArrowLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  disabled={!basicTable.getCanPreviousPage()}
                  onClick={() => {
                    basicTable.previousPage();
                  }}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  disabled={!basicTable.getCanNextPage()}
                  onClick={() => {
                    basicTable.nextPage();
                  }}
                >
                  <ChevronRightIcon />
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    basicTable.setPageIndex(basicTable.getPageCount() - 1)
                  }
                >
                  <DoubleArrowRightIcon />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <Select
                onValueChange={(val) => basicTable.setPageSize(val)}
                defaultValue="10"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell colSpan={3}>
              <Input
                placeholder="Filter the data"
                onChange={(e) => setGolbalFilter(e.target.value)}
              />
            </TableCell>
          </TableRow>
          {basicTable.getHeaderGroups().map((headerEl) => (
            <TableRow key={headerEl.id} className="divide-x divide-solid">
              {headerEl.headers.map((colEl) => {
                return (
                  <TableHead
                    key={colEl.column.id}
                  >
                    <div className="flex flex-row items-center justify-center gap-2">
                      {flexRender(
                        colEl.column.columnDef.header,
                        colEl.getContext()
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {basicTable.getRowModel().rows.map((rowEl) => (
            <TableRow key={rowEl.id} className="divide-x divide-solid">
              {rowEl.getVisibleCells().map((colEl) => {
                return (
                  <TableCell key={colEl.id}>
                    {flexRender(
                      colEl.column.columnDef.cell,
                      colEl.getContext()
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default BasicTable;
