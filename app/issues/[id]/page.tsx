import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Grid, Box, Flex } from "@radix-ui/themes";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AssigneeSelectButton from "./AssigneeSelectButton";
import { Metadata } from "next";
import { title } from "process";
import { Issue } from "@prisma/client";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const NewIssueShowingPage = async ({ params }: Props) => {
  const issues = await fetchUser(parseInt(params.id));

  const session = await getServerSession(authOptions);

  if (!issues) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issues={issues} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <EditButton issueId={issues.id} />
            <DeleteIssueButton issueId={issues.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default NewIssueShowingPage;
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.description,
  };
}
