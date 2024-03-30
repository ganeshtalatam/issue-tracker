import { Button, Link as NextLink, Table, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
// import Link from "next/link";
import React from "react";
import delay from "delay";
import Link from "next/link";

import { Issue, Status } from "@prisma/client";
import IssueButton from "./IssueButton";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import { signOut } from "next-auth/react";
import { Metadata } from "next";
// import dynamic from "next/dynamic";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const columsn: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden sm:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden sm:table-cell",
  },
];

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  // const issueCount = columsn.length;
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const orderBy = columsn
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issue = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <div>
      <IssueButton />
      {issueCount === 0 ? (
        <Text>At present there are no issues</Text>
      ) : (
        <Table.Root variant="surface" mb="3">
          <Table.Header>
            <Table.Row>
              {columsn.map((column) => {
                return (
                  <Table.ColumnHeaderCell
                    key={column.value}
                    className={column.className}
                  >
                    <Link
                      href={{
                        query: { ...searchParams, orderBy: column.value },
                      }}
                    >
                      {column.label}
                    </Link>
                    {column.value === searchParams.orderBy ? (
                      <ArrowUpIcon className="inline mb-1" />
                    ) : null}
                  </Table.ColumnHeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issue.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <NextLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </NextLink>
                  <div className="table-cell sm:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden sm:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">
                  {issue.updatedAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
      <Pagination
        itemsCount={issueCount}
        pageCount={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all project issues",
};
