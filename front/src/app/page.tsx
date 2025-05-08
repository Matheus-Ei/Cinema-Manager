"use client";

import { LinkButton } from "@/components/atoms/LinkButton";
import { Flex } from "@chakra-ui/react";

const Root = () => {
  return (
    <Flex direction="column" alignItems="center" gapY={2}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Cinema manager</h1>

      <Flex direction="column" gapY={2}>
        <LinkButton text="Login" href="login" />
        <LinkButton text="Tickets" href="tickets" />
        <LinkButton text="Users" href="users" />
        <LinkButton text="Movies" href="movies" />
        <LinkButton text="Rooms" href="rooms" />
        <LinkButton text="Sessions" href="sessions" />
        <LinkButton text="Places" href="places" />
        <LinkButton text="Place patterns" href="place-patterns" />
      </Flex>
    </Flex>
  );
};

export default Root;
