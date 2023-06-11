"use client";

import React, { useState, Key, HTMLProps } from "react";
import Image from "next/image";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableProps<T extends object> = {
  data: T[];
  selected?: Key[];
};

export default function ProductTable<T extends object>({
  data,
}: TableProps<T>) {
  const [rowSelection, setRowSelection] = useState({});
  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      accessorKey: "image",
      header: "",
      cell: ({ getValue }) => {
        const image = getValue() as string;
        return <Image width={34} height={34} src={image} alt={image} />;
      },
    },
    {
      accessorKey: "code",
      header: "รหัสสินค้า",
    },
    {
      accessorKey: "name",
      header: "ชื่อสินค้า",
    },
    {
      accessorKey: "price",
      header: "ราคา",
    },
    {
      accessorKey: "stock",
      header: "สต็อก",
    },
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getSelectedRowModel());
  console.log(rowSelection);

  return (
    <div className="p-2 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="p-2">
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
