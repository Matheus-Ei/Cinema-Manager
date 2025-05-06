import { Heading } from "@chakra-ui/react";
import { BiTask } from "react-icons/bi";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Heading display="flex" alignItems="center" mb={2}>
      <BiTask style={{ marginRight: 8 }} />

      <p>{title}</p>
    </Heading>
  );
};
