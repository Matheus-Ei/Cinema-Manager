"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

export default () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Movie id",
      type: "text",
      placeholder: String(rowData.movieId),
      name: "movieId",
    },

    {
      label: "Room id",
      type: "text",
      placeholder: String(rowData.roomId),
      name: "roomId",
    },

    {
      label: "Price",
      type: "text",
      placeholder: String(rowData.price),
      name: "price",
    },

    {
      label: "Start date",
      type: "text",
      placeholder: String(rowData.startDate),
      name: "startDate",
    },
  ];

  return (
    <Crud
      fields={FIELDS}
      endpoint="sessions"
      rowData={{ value: rowData, set: setRowData }}
    />
  );
};
