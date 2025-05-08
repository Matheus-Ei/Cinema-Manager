"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

const Rooms = () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Place pattern id",
      type: "number",
      placeholder: String(rowData.placePatternId),
      name: "placePatternId",
    },

    {
      label: "Description",
      placeholder: String(rowData.description),
      type: "text",
      name: "description",
    },
  ];

  return (
    <Crud
      fields={FIELDS}
      endpoint="rooms"
      rowData={{ value: rowData, set: setRowData }}
    />
  );
};

export default Rooms
