import { Button, CloseButton, Dialog, Input, Portal } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useRef } from "react";
import { TaskType } from "../Task";
import { SetStateType } from "@/types/global";

interface AddTaskDialogProps {
  setTasks: SetStateType<TaskType[]>;
  isVisible: boolean;
  setIsVisible: SetStateType<boolean>;
}

export const AddTaskDialog = ({
  isVisible,
  setTasks,
  setIsVisible,
}: AddTaskDialogProps) => {
  if (!isVisible) return null;

  const titleRef = useRef<HTMLInputElement | null>(null);

  const handleCreateTask = () => {
    if (!titleRef.current) return null;

    const titleValue = titleRef.current.value;

    setTasks((prev) => {
      const prevTasks = [...prev];

      prevTasks.push({ title: titleValue, isDone: false });

      return prevTasks;
    });

    titleRef.current.value = "";
    setIsVisible(false);

    toaster.create({
      description: "Success creating the task",
      type: "success",
    });
  };

  return (
    <Portal>
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add a new task</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Input
              variant="outline"
              placeholder="Your task title..."
              ref={titleRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleCreateTask();
              }}
            />
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.ActionTrigger>

            <Button onClick={handleCreateTask}>Save</Button>
          </Dialog.Footer>

          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};
