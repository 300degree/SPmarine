import * as z from "zod";

export const AssignBargeSchema = z.object({
    "load": z.number(),
    "name": z.string(),
});
export type AssignBarge = z.infer<typeof AssignBargeSchema>;

export const dataSchema = z.object({
    "assign_barge": z.array(AssignBargeSchema),
    "barge_load": z.array(z.union([z.number(), z.string()])),
    "id": z.string(),
    "load": z.number(),
    "order": z.string(),
});
export type PlansResponse = z.infer<typeof dataSchema>;
