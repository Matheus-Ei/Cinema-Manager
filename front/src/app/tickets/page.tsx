"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

export default () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Session id",
      type: "text",
      placeholder: String(rowData.sessionId),
      name: "sessionId",
    },

    {
      label: "User id",
      type: "text",
      placeholder: String(rowData.userId),
      name: "userId",
    },

    {
      label: "Row",
      type: "text",
      placeholder: String(rowData.row),
      name: "row",
    },

    {
      label: "Column",
      type: "text",
      placeholder: String(rowData.column),
      name: "column",
    },
  ];

  return (
    <Crud
      fields={FIELDS}
      endpoint="tickets"
      rowData={{ value: rowData, set: setRowData }}
    />
  );
};
