"use client";

import React, { FC, useState, Key, HTMLProps } from "react";
import Image from "next/image";
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DndProvider, useDrag, useDrop } from "react-dnd";

type TableProps<T extends { id: string }> = {
  data: T[];
  selected?: Key[];
};

export default function PresetTable<T extends { id: string }>({
  data,
}: TableProps<T>) {
  const [tableData, setTableData] = React.useState(data);
  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as T);
    setTableData([...data]);
  };

  const columns: ColumnDef<T>[] = [
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
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

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
          {table.getRowModel().rows.map((row) => (
            <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DraggableRow<T extends object>({
  row,
  reorderRow,
}: {
  row: Row<T>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}) {
  const [, dropRef] = useDrop({
    accept: "row",
    drop: (draggedRow: Row<T>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: "row",
  });

  return (
    <tr
      ref={previewRef} //previewRef could go here
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <td ref={dropRef}>
        <button ref={dragRef}>🟰</button>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}
