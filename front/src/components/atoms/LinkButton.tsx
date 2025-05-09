import { Button } from "@chakra-ui/react";
import Link from "next/link";

interface LinkButtonProps {
  text: string;
  href: string;
}

export const LinkButton = ({ text, href }: LinkButtonProps) => {
  return (
    <Button variant="surface" width="7rem" height="2rem">
      <Link href={href}>{text}</Link>
    </Button>
  );
};
