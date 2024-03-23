import React from "react";
import dynamic from "next/dynamic";
import loading from "../list/loading";
import IssueFormSkeleton from "./loading";

const NewIssuePage = dynamic(
  () => import("@/app/issues/[id]/components/NewIssuePage"),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

const NewIssueAddPage = async () => {
  return <NewIssuePage />;
};

export default NewIssueAddPage;
