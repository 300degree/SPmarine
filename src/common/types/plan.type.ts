import { z } from 'zod';

const dataSchema = z.object({
  order: z.string(),
  load: z.number(),
  assing_barge: z.array(z.union([z.string(), z.number()])),
  barge_load: z.array(z.union([z.string(), z.number()])),
  id: z.string(),
});

export type PlansResponse = z.infer<typeof dataSchema>;
