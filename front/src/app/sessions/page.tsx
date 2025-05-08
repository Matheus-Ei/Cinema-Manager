"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

const Sessions = () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Movie id",
      type: "number",
      placeholder: String(rowData.movieId),
      name: "movieId",
    },

    {
      label: "Room id",
      type: "number",
      placeholder: String(rowData.roomId),
      name: "roomId",
    },

    {
      label: "Price",
      type: "number",
      placeholder: String(rowData.price),
      name: "price",
    },

    {
      label: "Start date",
      type: "date",
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

export default Sessions;
