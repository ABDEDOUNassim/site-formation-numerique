import { z } from "zod";

export const contactSchema = z.object({
  body: z.object({
    organizationName: z.string().min(2).max(140),
    organizationType: z.string().min(2).max(50),
    contactName: z.string().min(2).max(120),
    contactEmail: z.string().email(),
    contactPhone: z.string().max(30).optional(),
    message: z.string().min(10).max(4000),
    expectedParticipants: z.number().int().min(1).max(1000).optional(),
    preferredDays: z.string().max(120).optional()
  }),
  params: z.object({}),
  query: z.object({})
});
