"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Container, Grid, TextField } from "@radix-ui/themes";
import becrypt from "bcrypt";
import prisma from "@/prisma/client";
import axios from "axios";
import { Image } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { registerSchema } from "../validationSchema";
import { useRouter } from "next/navigation";

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const onSubmit = async (data: RegisterForm) => {
    try {
      await axios.post("/api/register", data);
      router.push("/");
    } catch (error) {
      setError("Unexpected error occured");
    }
  };
  return (
    <Card className="max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root mb="2">
          <TextField.Input placeholder="Name" {...register("name")} />
        </TextField.Root>
        <TextField.Root mb="2">
          <TextField.Input placeholder="Email" {...register("email")} />
        </TextField.Root>

        <TextField.Root mb="2">
          <TextField.Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </TextField.Root>
        <Button style={{ cursor: "pointer" }} disabled={isSubmitting}>
          Register {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Card>
  );
};

export default RegisterPage;
