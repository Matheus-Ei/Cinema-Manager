import { ReusableDialog } from "@/components/atoms/Dialog";
import { SetStateType } from "@/types/global";
import { Button, Flex } from "@chakra-ui/react";

interface ConfirmDialogProps {
  isOpen: { open: boolean };
  setIsOpen: SetStateType<{ open: boolean }>;
  title: string;
  onConfirm: () => Promise<void> | void;
}

export const ConfirmDialog = ({
  isOpen,
  setIsOpen,
  onConfirm,
  title,
}: ConfirmDialogProps) => {
  return (
    <ReusableDialog title={title} isOpen={isOpen} setOpen={setIsOpen} size="sm">
      <Flex gapX={2}>
        <Button variant="outline" onClick={onConfirm}>
          Delete
        </Button>

        <Button variant="outline" onClick={() => setIsOpen({ open: false })}>
          Cancel
        </Button>
      </Flex>
    </ReusableDialog>
  );
};
