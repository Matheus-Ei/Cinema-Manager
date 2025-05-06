"use-client";

import { Button, Flex, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { MdSend } from "react-icons/md";
import { TaskType } from "../Task";

interface TaskTitleProps {
  title: string;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  index: number;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
}

export const TaskTitle = ({
  title,
  isEditing,
  setIsEditing,
  index,
  setTasks,
}: TaskTitleProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    titleRef.current.value = title;
  }, [isEditing, title, titleRef]);

  const handleSetTitle = () => {
    setIsEditing(false);

    if (!titleRef.current) return;

    const newValue = titleRef.current.value;

    setTasks((prev) => {
      const prevTasks = [...prev];

      prevTasks[index] = { title: newValue, isDone: prev[index].isDone };

      return prevTasks;
    });
  };

  if (isEditing)
    return (
      <Flex gapX={2}>
        <Input
          placeholder={title}
          ref={titleRef}
          onKeyDown={(event) => {
            event.key === "Enter" && handleSetTitle();
          }}
        />

        <Button onClick={handleSetTitle}>
          <MdSend />
        </Button>
      </Flex>
    );

  return <>{title}</>;
};
