import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CreateButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export const CreateButton = ({ children, onClick }: CreateButtonProps) => {
  return (
    <Button variant="surface" onClick={onClick}>
      {children}
    </Button>
  );
};
