"use client";

import { FormField, FormObj } from "@/components/atoms/Form";
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

  const FIELDS: FormField[] = [
    {
      label: "Email",
      type: "email",
      placeholder: "Your email...",
      name: "email",
    },

    {
      label: "Password",
      type: "password",
      placeholder: "Your password...",
      name: "password",
    },
  ];

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Flex direction="column" width="25vw" gapY={2}>
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
        />

        <Input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="The new password..."
          marginBottom={4}
        />

        <Button onClick={() => login({ email, password })}>Login</Button>
        <Button onClick={() => recoverPassword({ email })}>
          Recover password
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
