"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

export default () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Place pattern id",
      type: "text",
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
