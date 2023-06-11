"use client";

import React, { Key } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PresetTable from "./PresetTable";

type Preset = {
  id: string;
  image: string;
  code: string;
  name: string;
  price: number;
  stock: number;
};

const Preset = () => {
  const data: Preset[] = [
    {
      id: "P01",
      image: "https://picsum.photos/200",
      code: "BA01",
      name: "แป้งพัฟเบอร์1",
      price: 50.0,
      stock: 100,
    },
    {
      id: "P02",
      image: "https://picsum.photos/200",
      code: "BA02",
      name: "แป้งพัฟเบอร์2",
      price: 50.0,
      stock: 100,
    },
    {
      id: "P03",
      image: "https://picsum.photos/200",
      code: "BA03",
      name: "แป้งพัฟเบอร์3",
      price: 50.0,
      stock: 100,
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <p className="text-lg font-bold">สินค้าใน Preset</p>
        <PresetTable data={data} />
      </div>
    </DndProvider>
  );
};

export default Preset;
