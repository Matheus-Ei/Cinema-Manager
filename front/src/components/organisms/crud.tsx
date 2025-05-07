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
import { SetStateType } from "@/types/global";

interface CrudProps {
  endpoint: string;
  fields: FormField[];
  rowData: {
    value: Record<string, unknown>;
    set: SetStateType<Record<string, unknown>>;
  };
}

export const Crud = ({ endpoint, fields, rowData }: CrudProps) => {
  const [updater, toggleUpdater] = useToggle(false);

  const [isOpenCreate, setOpenCreate] = useState<{ open: boolean }>({
    open: false,
  });

  const [isOpenUpdate, setOpenUpdate] = useState<{ open: boolean }>({
    open: false,
  });

  const [isOpenDelete, setOpenDelete] = useState<{ open: boolean }>({
    open: false,
  });

  const { mutate: create } = useMutation(async (formData) => {
    return Request.post(endpoint, formData as Record<string, unknown>)
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
      `${endpoint}/${rowData.value.id}`,
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
    return Request.delete(`${endpoint}/${rowData.value.id}`)
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

  const { data } = useQuery(endpoint, updater);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const count = data.length;

  const startRange = (currentPage - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = data.slice(startRange, endRange);

  return (
    <Box p={8}>
      <Header title={endpoint} />

      <Flex gapX={4} mb={4}>
        <Button
          onClick={() => {
            rowData.set({});
            setOpenCreate({ open: true });
          }}
        >
          Create
        </Button>
      </Flex>

      <FormDialog
        title="Create element"
        isOpen={isOpenCreate}
        setIsOpen={setOpenCreate}
        fields={fields}
        onSubmit={create}
      />

      <FormDialog
        title="Update content"
        isOpen={isOpenUpdate}
        setIsOpen={setOpenUpdate}
        fields={fields}
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
            onClick: (rd) => {
              rowData.set(rd as Record<string, unknown>);

              setOpenDelete({ open: true });
            },
          },
          {
            label: "Update",
            onClick: (rd) => {
              rowData.set(rd as Record<string, unknown>);

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
