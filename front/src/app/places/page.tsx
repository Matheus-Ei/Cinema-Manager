"use client";

import { CreateButton } from "@/components/atoms/CreateButton";
import { BottomPagination } from "@/components/atoms/BottomPagination";
import { ReusableDialog } from "@/components/atoms/Dialog";
import { FormField, FormObj } from "@/components/atoms/Form";
import { Header } from "@/components/atoms/Header";
import { TableObj } from "@/components/atoms/Table";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { Request } from "@/utils/request";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default () => {
  const ENDPOINT = "places";

  const FIELDS: FormField[] = [
    {
      label: "Place pattern id",
      type: "text",
      name: "placePatternId",
    },

    {
      label: "Column",
      type: "text",
      name: "column",
    },

    {
      label: "Row",
      type: "text",
      name: "row",
    },
  ];

  const [updater, toggleUpdater] = useToggle(false);
  const [isOpenCreate, setOpenCreate] = useState<{ open: boolean }>({
    open: false,
  });

  const { mutate: create } = useMutation((variables: object) => {
    toggleUpdater();
    setOpenCreate({ open: false });
    return Request.post(ENDPOINT, variables);
  });

  const { mutate: remove } = useMutation((variables: { id: number }) => {
    toggleUpdater();
    return Request.delete(`${ENDPOINT}/${variables.id}`);
  });

  const { data } = useQuery(ENDPOINT, updater);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // const [search, setSearch] = useState<string | null>(null);

  /*   const count = search
    ? data.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .length
    : data.length; */

  const count = data.length;

  const startRange = (currentPage - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = data.slice(startRange, endRange);

  return (
    <Box p={8}>
      <Header title="Places" />

      <Flex gapX={4} mb={4}>
        <ReusableDialog
          title="New place"
          triggerElement={<CreateButton>Create</CreateButton>}
          isOpen={isOpenCreate}
          setOpen={setOpenCreate}
        >
          <FormObj onSubmit={(formData) => create(formData)} fields={FIELDS} />
        </ReusableDialog>
      </Flex>

      <TableObj
        data={visibleItems}
        actions={[
          {
            label: "Delete",
            onClick: (rowData) => remove(rowData),
          },
        ]}
      />

      <BottomPagination
        count={count}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};
