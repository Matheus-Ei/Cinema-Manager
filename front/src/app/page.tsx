"use client";

import { LinkButton } from "@/components/atoms/LinkButton";
import { Flex } from "@chakra-ui/react";

const Root = () => {
  return (
    <Flex direction="column" alignItems="center" gapY={2} p={10}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Cinema manager</h1>

      <p style={{ marginBottom: "1rem" }}>
        Here you can find all of the routes for this simple crud.
        <br />
        Created to learn react.Js, express.Js and Typescript
      </p>

      <Flex gapX={5}>
        <Flex direction="column" gapY={3} alignItems="center">
          <LinkButton text="Login" href="login" />
          <LinkButton text="Tickets" href="tickets" />
          <LinkButton text="Users" href="users" />
          <LinkButton text="Movies" href="movies" />
        </Flex>

        <Flex direction="column" gapY={3} alignItems="center">
          <LinkButton text="Rooms" href="rooms" />
          <LinkButton text="Sessions" href="sessions" />
          <LinkButton text="Places" href="places" />
          <LinkButton text="Place patterns" href="place-patterns" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Root;
