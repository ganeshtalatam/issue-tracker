"use client";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import axios from "axios";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TiInfo } from "react-icons/ti";
import SimpleMDE from "react-simplemde-editor";
import { Issue } from "@prisma/client";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = ({ issues }: { issues?: Issue | null }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const onSubmit = async (data: IssueForm) => {
    try {
      if (issues) await axios.patch("/api/issues/" + issues.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError("Unexpected error occured");
    }
  };
  return (
    <div className="max-w-2xl">
      {error && (
        <Callout.Root className="my-4" color="red">
          <Callout.Icon>
            <TiInfo />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextField.Root>
          <TextField.Input
            placeholder="Title…"
            {...register("title")}
            defaultValue={issues?.title}
          />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          defaultValue={issues?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description…" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button disabled={isSubmitting} style={{ cursor: "pointer" }}>
          {issues ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
