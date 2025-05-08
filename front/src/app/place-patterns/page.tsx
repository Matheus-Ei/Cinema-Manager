"use client";

import { Header } from "@/components/atoms/Header";
import { TableObj } from "@/components/atoms/Table";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { Request } from "@/utils/request";
import { Box, Button, Flex } from "@chakra-ui/react";

const PlacePatterns = () => {
  const [updater, toggleUpdater] = useToggle(false);

  const { mutate: create } = useMutation(() => {
    toggleUpdater();
    return Request.post("places/patterns", {});
  });

  const { mutate: remove } = useMutation(
    (variables: { id: number } | undefined) => {
      toggleUpdater();
      return Request.delete(`places/patterns/${variables?.id}`);
    },
  );

  const { data } = useQuery("places/patterns", updater);

  return (
    <Box p={8}>
      <Header title="Place pattern" />

      <Flex gapX={4} mb={4}>
        <Button onClick={() => create({})}>Create</Button>
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

export default PlacePatterns;
