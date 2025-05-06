import { SetStateType } from "@/types/global";
import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { FaDeleteLeft } from "react-icons/fa6";
import { TaskType } from ".";
import { toaster } from "@/components/ui/toaster";
import { Storage } from "@/utils/storage";
import { Tooltip } from "@/components/ui/tooltip";
import { useState } from "react";

interface DeleteButtonProps {
  setTasks: SetStateType<TaskType[]>;
  realIndex: number;
}

export const DeleteButton = ({ setTasks, realIndex }: DeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState<{open: boolean}>({open: false});

  const handleDelete = () => {
    setTasks((prev) => {
      const prevTasks = [...prev];

      const newTasks = prevTasks.filter((_, i) => {
        return realIndex !== i;
      });

      if (newTasks.length === 0) {
        Storage.set("tasks", []);
      }

      return newTasks;
    });

    setIsOpen({open: false});

    toaster.create({
      description: "Success deleting the task",
      type: "success",
    });
  };

  return (
    <Dialog.Root role="alertdialog" open={isOpen.open} onOpenChange={setIsOpen}>
      <Tooltip content="Delete">
        <Dialog.Trigger asChild>
          <Button variant="outline">
            <FaDeleteLeft />
          </Button>
        </Dialog.Trigger>
      </Tooltip>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete this
                task.
              </p>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleDelete}>
                Delete
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
