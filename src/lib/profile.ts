import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  bio: z.string().trim().min(20, "Bio should be at least 20 characters").max(1000),
  skills: z
    .string()
    .trim()
    .min(2, "Add at least one skill")
    .max(800),
  timezone: z.string().trim().min(3, "Timezone is required").max(80),
  githubHandle: z
    .string()
    .trim()
    .min(1, "GitHub handle is required")
    .max(39)
    .regex(/^[A-Za-z0-9-]+$/, "GitHub handle can only include letters, numbers, and hyphens"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function normalizeSkills(rawSkills: string): string[] {
  return Array.from(
    new Set(
      rawSkills
        .split(/[\n,]/)
        .map((skill) => skill.trim())
        .filter(Boolean),
    ),
  ).slice(0, 20);
}

export function normalizeGithubHandle(rawHandle: string): string {
  return rawHandle.trim().replace(/^@/, "");
}
