"use client";
import { Box, Flex, Input, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Task, TaskType } from "./Task";
import { Storage } from "@/utils/storage";
import { AddTaskButton } from "./AddTask/AddTaskButton";
import { ClearTasksButton } from "./ClearTasksButton";
import { BottomPagination } from "./BottomPagination";
import { Header } from "./Header";

export default () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [search, setSearch] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const count = search
    ? tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .length
    : tasks.length;

  const startRange = (currentPage - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = tasks.slice(startRange, endRange);

  // When the tasks change, update the local storage
  useEffect(() => {
    if (tasks.length !== 0) {
      Storage.set("tasks", tasks);
    }
  }, [tasks]);

  // Load the tasks from local storage
  useEffect(() => {
    setTasks(Storage.get("tasks") || ([] as TaskType[]));
  }, []);

  const renderTasks = ({ title, isDone }: TaskType, index: number) => {
    return (
      <Task
        title={title}
        itemsPerPage={pageSize}
        currentPage={currentPage}
        isDone={isDone}
        index={index}
        setTasks={setTasks}
        key={index}
      />
    );
  };

  return (
    <Box p={8}>
      <Header />

      <Flex gapX={4} mb={4}>
        <Input
          variant="flushed"
          placeholder="The task name you want to search..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          mb={8}
        />

        <AddTaskButton setTasks={setTasks} />

        <ClearTasksButton setTasks={setTasks} />
      </Flex>

      <Table.Root variant="outline" mb={4}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Task</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {search
            ? tasks
                .filter((t) =>
                  t.title.toLowerCase().includes(search.toLowerCase()),
                )
                .map(renderTasks)
            : visibleItems.map(renderTasks)}
        </Table.Body>
      </Table.Root>

      <BottomPagination
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Box>
  );
};
