import { SetStateType } from "@/types/global";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";

type ChakraDialogProps = React.ComponentProps<typeof Dialog.Root>;

interface ReusableDialogProps {
  triggerElement?: React.ReactElement;
  title: string;
  children: React.ReactNode;
  isOpen?: { open: boolean };
  setOpen?: SetStateType<{ open: boolean }>;
  size?: ChakraDialogProps["size"];
  placement?: ChakraDialogProps["placement"];
  motionPreset?: ChakraDialogProps["motionPreset"];
  hideCloseButton?: boolean;
}

export const ReusableDialog = ({
  triggerElement,
  title,
  children,
  isOpen,
  setOpen,
  size = "md",
  placement = "center",
  motionPreset = "slide-in-bottom",
  hideCloseButton = false,
}: ReusableDialogProps) => {
  const isControlled = isOpen !== undefined;

  const dialogContentElements = (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            {!hideCloseButton && (
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            )}
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );

  if (isControlled) {
    return (
      <Dialog.Root
        open={isOpen.open}
        onOpenChange={setOpen}
        size={size}
        placement={placement}
        motionPreset={motionPreset}
      >
        <Dialog.Trigger asChild>
          {triggerElement || (
            <Button variant="outline" size="sm">
              Open Dialog
            </Button>
          )}
        </Dialog.Trigger>

        {dialogContentElements}
      </Dialog.Root>
    );
  }

  return (
    <Dialog.Root size={size} placement={placement} motionPreset={motionPreset}>
      <Dialog.Trigger asChild>
        {triggerElement || (
          <Button variant="outline" size="sm">
            Open Dialog
          </Button>
        )}
      </Dialog.Trigger>
      {dialogContentElements}
    </Dialog.Root>
  );
};
