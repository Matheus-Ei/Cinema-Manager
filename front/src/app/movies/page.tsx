"use client";

import { FormField } from "@/components/atoms/Form";
import { Crud } from "@/components/organisms/crud";
import { useState } from "react";

const Movies = () => {
  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const FIELDS: FormField[] = [
    {
      label: "Title",
      type: "text",
      name: "title",
    },

    {
      label: "Description",
      type: "text",
      name: "description",
    },

    {
      label: "Duration",
      type: "number",
      name: "duration",
    },

    {
      label: "Image",
      type: "image",
      name: "image",
    },
  ];

  return (
    <Crud
      fields={FIELDS}
      endpoint="movies"
      rowData={{ value: rowData, set: setRowData }}
    />
  );
};

export default Movies;
