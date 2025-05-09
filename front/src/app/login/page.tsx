"use client";

import { Card } from "@/components/atoms/Card";
import { toaster } from "@/components/ui/toaster";
import { useMutation } from "@/hooks/useMutation";
import { Request } from "@/utils/request";
import { Storage } from "@/utils/storage";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { mutate: login } = useMutation(async (formData) => {
    return Request.post(`users/auth`, formData as Record<string, unknown>)
      .then((res) => {
        const resp = res as { resource?: string };
        Storage.set("access_token", String(resp?.resource));

        toaster.create({
          description: "Success making the login",
          type: "success",
        });
      })
      .catch(() => {
        toaster.create({
          description: "Error in the login",
          type: "error",
        });
      });
  });

  const { mutate: recoverPassword } = useMutation(async (body) => {
    return Request.post(`users/recover`, body as Record<string, unknown>)
      .then(() => {
        toaster.create({
          description: "Success sending the code, verify your email",
          type: "success",
        });
      })
      .catch(() => {
        toaster.create({
          description: "Error sending the code",
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
          Login
        </h1>

        <Input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email..."
          width="15rem"
        />

        <Input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="The new password..."
          marginBottom={4}
          width="15rem"
          mb={5}
        />

        <Button onClick={() => login({ email, password })} variant="surface">
          Login
        </Button>
        <Button onClick={() => recoverPassword({ email })} variant="plain">
          Recover password
        </Button>
      </Card>
    </Flex>
  );
};

export default Login;
