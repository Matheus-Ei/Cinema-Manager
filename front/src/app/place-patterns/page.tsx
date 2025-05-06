"use client";

import { CreateButton } from "@/components/atoms/CreateButton";
import { Header } from "@/components/atoms/Header";
import { TableObj } from "@/components/atoms/Table";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { Request } from "@/utils/request";
import { Box, Flex } from "@chakra-ui/react";

export default () => {
  const [updater, toggleUpdater] = useToggle(false);

  const { mutate: create } = useMutation(() => {
    toggleUpdater();
    return Request.post("places/patterns", {});
  });

  const { mutate: remove } = useMutation((variables: { id: number }) => {
    toggleUpdater();
    return Request.delete(`places/patterns/${variables.id}`);
  });

  const { data } = useQuery("places/patterns", updater);

  return (
    <Box p={8}>
      <Header title="Place pattern" />

      <Flex gapX={4} mb={4}>
        <CreateButton onClick={() => create({})}>Create</CreateButton>
      </Flex>

      <TableObj
        data={data}
        actions={[
          {
            label: "Delete",
            onClick: (rowData) => remove({ id: Number(rowData?.id) }),
          },
        ]}
      />
    </Box>
  );
};
