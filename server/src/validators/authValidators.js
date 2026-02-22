import { z } from "zod";

export const registerChildSchema = z.object({
  body: z.object({
    pseudo: z.string().min(3).max(40),
    password: z.string().min(8).max(120),
    ageBandId: z.string().uuid(),
    birthYear: z.number().int().min(2000).max(2020).optional()
  }),
  params: z.object({}),
  query: z.object({})
});

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(3).max(120),
    password: z.string().min(8).max(120)
  }),
  params: z.object({}),
  query: z.object({})
});
