import { createIssueSchema, patchIssueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { error } from "console";
import delay from "delay";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  // const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  if (body.assignedIssueId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedIssueId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }

  const issues = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issues)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issues.id,
    },
    data: {
      title: body.title,
      description: body.description,
      assignedUserID: body.assignedIssueId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({});
}
