"use client";

import { Card } from "@/components/atoms/Card";
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
    return Request.post(`users/password`, {
      code,
      newPassword: password,
      email,
    })
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
      <Card>
        <h1
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Recover password
        </h1>

        <Input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email..."
          width="15rem"
        />

        <Input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="The new password..."
          width="15rem"
        />

        <Input
          onChange={(event) => setCode(event.target.value)}
          placeholder="Code recived..."
          width="15rem"
          mb={5}
        />

        <Button onClick={() => verify()}>Verify</Button>
      </Card>
    </Flex>
  );
};

export default ForgotPassword;
