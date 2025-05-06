"use-client";

import { Button, Checkbox, Flex, Table } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { TaskTitle } from "./TaskTitle";
import { Storage } from "@/utils/storage";
import { MdCancel } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";
import { toaster } from "@/components/ui/toaster";
import { DeleteButton } from "./DeleteButton";

export interface TaskType {
  title: string;
  isDone: boolean;
}

interface TaskProps {
  title: string;
  isDone: boolean;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  index: number;
  currentPage: number;
  itemsPerPage: number;
}

export const Task = ({
  title,
  isDone,
  setTasks,
  index,
  itemsPerPage,
  currentPage,
}: TaskProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const realIndex = (currentPage - 1) * itemsPerPage + index;

  const handleStatusUpdate = () => {
    setTasks((prev) => {
      const prevTasks = [...prev];

      const newIsDone = prev[realIndex].isDone ? false : true;

      prevTasks[realIndex] = {
        title: prev[realIndex].title,
        isDone: newIsDone,
      };

      return prevTasks;
    });
  };

  const handleUpdate = () => {
    if (isEditing) {
      setIsEditing(false);
      return;
    }

    setIsEditing(true);
  };

  return (
    <Table.Row key={realIndex}>
      <Table.Cell width="85%">
        <TaskTitle
          isEditing={isEditing}
          title={title}
          setIsEditing={setIsEditing}
          setTasks={setTasks}
          index={realIndex}
        />
      </Table.Cell>

      <Table.Cell width="5%">
        <Checkbox.Root onChange={handleStatusUpdate} defaultChecked={isDone}>
          <Checkbox.HiddenInput />

          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>

      <Table.Cell width="10%">
        <Flex gapX={2}>
          <DeleteButton setTasks={setTasks} realIndex={realIndex} />

          <Tooltip content="Edit">
            <Button variant="outline" onClick={handleUpdate}>
              {isEditing ? <MdCancel /> : <FaEdit />}
            </Button>
          </Tooltip>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
