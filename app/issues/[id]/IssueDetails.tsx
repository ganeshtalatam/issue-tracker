import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issues }: { issues: Issue }) => {
  return (
    <>
      <Heading>{issues?.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issues.status} />
        <Text>{issues?.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown>{issues?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
