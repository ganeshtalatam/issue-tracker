import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const registerSchema = z.object({
  name: z.string().min(5).optional(),
  email: z.string().email(),
  password: z.string().min(5),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65436)
    .optional(),
  assignedIssueId: z.string().min(1).max(255).optional().nullable(),
});
