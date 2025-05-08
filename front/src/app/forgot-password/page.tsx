"use client";

import { toaster } from "@/components/ui/toaster";
import { useMutation } from "@/hooks/useMutation";
import { Request } from "@/utils/request";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

const ForgotPassword = () => {
  const [code, setCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { mutate: verify } = useMutation(async () => {
    return Request.post(`users/auth`, { code, newPassword: password, email })
      .then(() => {
        toaster.create({
          description: "Success changing the password",
          type: "success",
        });
      })
      .catch(() => {
        toaster.create({
          description: "Error in this code",
          type: "error",
        });
      });
  });

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Flex direction="column" width="25vw" gapY={2}>
        <Input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email..."
        />

        <Input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="The new password..."
        />

        <Input
          onChange={(event) => setCode(event.target.value)}
          placeholder="Code recived..."
        />

        <Button onClick={() => verify()}>Verify</Button>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
