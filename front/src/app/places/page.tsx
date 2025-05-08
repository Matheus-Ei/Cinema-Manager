"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

const Places = () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Place pattern id",
      type: "number",
      placeholder: String(rowData.placePatternId),
      name: "placePatternId",
    },

    {
      label: "Column",
      placeholder: String(rowData.column),
      type: "number",
      name: "column",
    },

    {
      label: "Row",
      placeholder: String(rowData.row),
      type: "number",
      name: "row",
    },
  ];

  return (
    <Crud
      fields={FIELDS}
      endpoint="places"
      rowData={{ value: rowData, set: setRowData }}
    />
  );
};

export default Places;
