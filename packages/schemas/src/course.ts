import { z } from "zod";

/** Estado de cupos de una cohorte. `simulated` indica que no viene de un proveedor de pagos real. */
export const courseSeats = z
  .object({
    total: z.number().int().positive(),
    sold: z.number().int().nonnegative(),
    simulated: z.boolean(),
  })
  .refine((s) => s.sold <= s.total, { error: "sold_exceeds_total" });
export type CourseSeats = z.infer<typeof courseSeats>;

export const seatsRemaining = ({ total, sold }: Pick<CourseSeats, "total" | "sold">) =>
  Math.max(0, total - sold);
