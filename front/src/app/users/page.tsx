"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

export default () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Name",
      type: "text",
      placeholder: String(rowData.name),
      name: "name",
    },

    {
      label: "CPF",
      placeholder: String(rowData.cpf),
      type: "text",
      name: "cpf",
    },

    {
      label: "email",
      placeholder: String(rowData.email),
      type: "text",
      name: "email",
    },

    {
      label: "password",
      placeholder: String(rowData.password),
      type: "text",
      name: "password",
    },
  ];

  return (
    <Crud
      fields={FIELDS}
      endpoint="users"
      rowData={{ value: rowData, set: setRowData }}
    />
  );
};
