import { Tooltip } from "@/components/ui/tooltip";
import { Button, Dialog } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { AddTaskDialog } from "./AddTaskDialog";
import { useState } from "react";
import { TaskType } from "../Task";
import { SetStateType } from "@/types/global";

interface AddTaskButtonProps {
  setTasks: SetStateType<TaskType[]>;
}

export const AddTaskButton = ({ setTasks }: AddTaskButtonProps) => {
  const [showCreateDialog, setCreateDialog] = useState(false);

  return (
    <Dialog.Root>
      <Tooltip content="Add task">
        <Dialog.Trigger asChild>
          <Button variant="solid" onClick={() => setCreateDialog(true)}>
            <FaPlus />
          </Button>
        </Dialog.Trigger>
      </Tooltip>

      <AddTaskDialog
        setTasks={setTasks}
        isVisible={showCreateDialog}
        setIsVisible={setCreateDialog}
      />
    </Dialog.Root>
  );
};
