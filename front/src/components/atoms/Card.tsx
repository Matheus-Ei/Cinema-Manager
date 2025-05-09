import { Flex } from "@chakra-ui/react";

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <Flex
      direction="column"
      border="sm"
      borderColor="gray"
      borderRadius="10px"
      p={4}
      gapY={2}
      alignItems="center"
    >
      {children}
    </Flex>
  );
};
