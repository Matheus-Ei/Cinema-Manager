"use client";

import { FormField } from "@/components/atoms/Form";
import { useState } from "react";
import { Crud } from "@/components/organisms/crud";

const Users = () => {
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

    {
      label: "Is Student",
      type: "checkbox",
      name: "isStudent",
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

export default Users;
