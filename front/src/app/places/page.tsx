"use client";

import { BottomPagination } from "@/components/atoms/BottomPagination";
import { FormField } from "@/components/atoms/Form";
import { Header } from "@/components/atoms/Header";
import { TableObj } from "@/components/atoms/Table";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { Request } from "@/utils/request";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FormDialog } from "@/components/molecules/FormDialog";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { toaster } from "@/components/ui/toaster";

export default () => {
  const ENDPOINT = "places";

  const [updater, toggleUpdater] = useToggle(false);

  const [rowData, setRowData] = useState<Record<string, unknown>>({});

  const [isOpenCreate, setOpenCreate] = useState<{ open: boolean }>({
    open: false,
  });

  const [isOpenUpdate, setOpenUpdate] = useState<{ open: boolean }>({
    open: false,
  });

  const [isOpenDelete, setOpenDelete] = useState<{ open: boolean }>({
    open: false,
  });

  const FIELDS: FormField[] = [
    {
      label: "Place pattern id",
      type: "text",
      placeholder: String(rowData.placePatternId),
      name: "placePatternId",
    },

    {
      label: "Column",
      placeholder: String(rowData.column),
      type: "text",
      name: "column",
    },

    {
      label: "Row",
      placeholder: String(rowData.row),
      type: "text",
      name: "row",
    },
  ];

  const { mutate: create } = useMutation(async (formData) => {
    return Request.post(ENDPOINT, formData as Record<string, unknown>)
      .then(() => {
        setOpenCreate({ open: false });
        toggleUpdater();
      })
      .catch(() => {
        toaster.create({
          description: "Error creating this element",
          type: "error",
        });
      });
  });

  const { mutate: update } = useMutation(async (formData) => {
    return Request.patch(
      `${ENDPOINT}/${rowData.id}`,
      formData as Record<string, unknown>,
    )
      .then(() => {
        setOpenUpdate({ open: false });
        toggleUpdater();
      })
      .catch(() => {
        toaster.create({
          description: "Error updating this content",
          type: "error",
        });
      });
  });

  const { mutate: remove } = useMutation(async () => {
    return Request.delete(`${ENDPOINT}/${rowData.id}`)
      .then(() => {
        setOpenDelete({ open: false });
        toggleUpdater();
      })
      .catch(() => {
        toaster.create({
          description: "Error deleting this content",
          type: "error",
        });
      });
  });

  const { data } = useQuery(ENDPOINT, updater);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const count = data.length;

  const startRange = (currentPage - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = data.slice(startRange, endRange);

  return (
    <Box p={8}>
      <Header title={ENDPOINT} />

      <Flex gapX={4} mb={4}>
        <Button onClick={() => setOpenCreate({ open: true })}>Create</Button>
      </Flex>

      <FormDialog
        title="Create element"
        isOpen={isOpenCreate}
        setIsOpen={setOpenCreate}
        fields={FIELDS}
        onSubmit={create}
      />

      <FormDialog
        title="Update content"
        isOpen={isOpenUpdate}
        setIsOpen={setOpenUpdate}
        fields={FIELDS}
        onSubmit={update}
      />

      <ConfirmDialog
        title="Do you really want to delete?"
        setIsOpen={setOpenDelete}
        isOpen={isOpenDelete}
        onConfirm={remove}
      />

      <TableObj
        data={visibleItems}
        actions={[
          {
            label: "Delete",
            onClick: (rowData) => {
              setRowData(rowData as Record<string, unknown>);

              setOpenDelete({ open: true });
            },
          },
          {
            label: "Update",
            onClick: (rowData) => {
              setRowData(rowData as Record<string, unknown>);

              setOpenUpdate({ open: true });
            },
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
