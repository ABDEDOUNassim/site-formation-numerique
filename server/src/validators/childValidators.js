import { z } from "zod";

export const childStoryCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(140),
    content: z.string().min(10).max(5000)
  }),
  params: z.object({}),
  query: z.object({})
});

export const childStoryUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(140).optional(),
    content: z.string().min(10).max(5000).optional()
  }),
  params: z.object({
    id: z.string().uuid()
  }),
  query: z.object({})
});

export const childStoryDeleteSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: z.string().uuid()
  }),
  query: z.object({})
});
