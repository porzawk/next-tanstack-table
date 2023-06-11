"use client";

import React, { Key } from "react";
import ProductTable from "./ProductTable";

type Product = {
  id: string;
  image: string;
  code: string;
  name: string;
  price: number;
  stock: number;
};

const Product = () => {
  const data: Product[] = [
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
      code: "BA01",
      name: "แป้งพัฟเบอร์1",
      price: 50.0,
      stock: 100,
    },
    {
      id: "P03",
      image: "https://picsum.photos/200",
      code: "BA01",
      name: "แป้งพัฟเบอร์1",
      price: 50.0,
      stock: 100,
    },
  ];

  return (
    <div>
      <p className="text-lg font-bold">เพิ่มสินค้าใน Preset</p>
      <ProductTable data={data} />
    </div>
  );
};

export default Product;
