import React from "react";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

interface Props {
  params: { id: string };
}

const NewIssuePage = dynamic(
  () => import("@/app/issues/[id]/components/NewIssuePage"),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

const NewEditPage = async ({ params }: Props) => {
  const issues = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return <NewIssuePage issues={issues} />;
};

export default NewEditPage;
