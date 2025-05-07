"use client";

import { FormField, FormObj } from "@/components/atoms/Form";
import { toaster } from "@/components/ui/toaster";
import { useMutation } from "@/hooks/useMutation";
import { Request } from "@/utils/request";
import { Storage } from "@/utils/storage";
import { Flex } from "@chakra-ui/react";

export default () => {
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
      <h1
        style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "1.5rem" }}
      >
        Login
      </h1>
      <FormObj submitButtonLabel="Login" fields={FIELDS} onSubmit={login} />
    </Flex>
  );
};
