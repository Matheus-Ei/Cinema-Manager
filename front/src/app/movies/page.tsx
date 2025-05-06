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
  const ENDPOINT = "movies";

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
      type: "text",
      name: "duration",
    },

    {
      label: "Image",
      type: "image",
      name: "image",
    },
  ];

  const [updater, toggleUpdater] = useToggle(false);
  const [isOpen, setOpen] = useState<{ open: boolean }>({ open: false });

  const { mutate: create } = useMutation((variables: object) => {
    toggleUpdater();
    setOpen({ open: false });
    return Request.postMultipart(ENDPOINT, variables);
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
      <Header title="Movies" />

      <Flex gapX={4} mb={4}>
        <ReusableDialog
          title="New movie"
          triggerElement={<CreateButton>Create</CreateButton>}
          isOpen={isOpen}
          setOpen={setOpen}
        >
          <FormObj onSubmit={(formData) => create(formData)} fields={FIELDS} />
        </ReusableDialog>
      </Flex>

      <TableObj
        data={visibleItems}
        actions={[
          {
            label: "Delete",
            onClick: (rowData) => remove({ id: Number(rowData?.id) }),
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
