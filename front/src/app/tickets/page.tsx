"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

const Tickets = () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Session id",
      type: "number",
      placeholder: String(rowData.sessionId),
      name: "sessionId",
    },

    {
      label: "User id",
      type: "number",
      placeholder: String(rowData.userId),
      name: "userId",
    },

    {
      label: "Row",
      type: "number",
      placeholder: String(rowData.row),
      name: "row",
    },

    {
      label: "Column",
      type: "number",
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

export default Tickets;
