import { z } from "zod";

export const reflexSubmitSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.string().uuid(),
        selectedOption: z.enum(["A", "B", "C"])
      })
    ).min(1)
  }),
  params: z.object({}),
  query: z.object({})
});

export const progressSchema = z.object({
  body: z.object({
    gameKey: z.string().min(3).max(50),
    score: z.number().int().min(0).max(100),
    progressPercent: z.number().min(0).max(100)
  }),
  params: z.object({}),
  query: z.object({})
});
