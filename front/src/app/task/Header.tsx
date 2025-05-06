import { Heading } from "@chakra-ui/react";
import { BiTask } from "react-icons/bi";

export const Header = () => {
  return (
    <Heading display="flex" alignItems="center" mb={2}>
      <BiTask style={{ marginRight: 8 }} />
      Task list
    </Heading>
  );
};
