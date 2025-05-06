import { Tooltip } from "@/components/ui/tooltip";
import { SetStateType } from "@/types/global";
import { Storage } from "@/utils/storage";
import { Button, Dialog, Portal, CloseButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { TaskType } from "./Task";
import { useState } from "react";

interface ClearTasksButtonProps {
  setTasks: SetStateType<TaskType[]>;
}

export const ClearTasksButton = ({ setTasks }: ClearTasksButtonProps) => {
  const [isOpen, setIsOpen] = useState<{open: boolean}>({open: false});

  const handleClear = () => {
    setTasks([]);
    Storage.set("tasks", []);

    setIsOpen({open: false});
  };

  return (
    <Dialog.Root role="alertdialog" open={isOpen.open} onOpenChange={setIsOpen}>
      <Tooltip content="Clear tasks">
        <Dialog.Trigger asChild>
          <Button variant="surface">
            <FaTrash />
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
                This action cannot be undone. This will permanently delete all
                tasks from our system.
              </p>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleClear}>
                Clear
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
