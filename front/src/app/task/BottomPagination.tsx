import { SetStateType } from "@/types/global";
import {
  ButtonGroup,
  IconButton,
  Pagination,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface BottomPaginationProps {
  count: number;
  pageSize: number;
  setPageSize: SetStateType<number>;
  currentPage: number;
  setCurrentPage: SetStateType<number>;
}

export const BottomPagination = ({
  count,
  pageSize,
  currentPage,
  setPageSize,
  setCurrentPage,
}: BottomPaginationProps) => {
  const pageSizes = createListCollection({
    items: [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 },
    ],
  });

  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={currentPage}
      onPageChange={(e) => setCurrentPage(e.page)}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="full"
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>

      <Select.Root
        collection={pageSizes}
        marginLeft={4}
        size="sm"
        width="80px"
        onValueChange={(details) => {
          setPageSize(Number(details?.value));
        }}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={String(pageSize)} />
          </Select.Trigger>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              {pageSizes.items.map((ps) => (
                <Select.Item item={ps} key={ps.value}>
                  {ps.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Pagination.Root>
  );
};
