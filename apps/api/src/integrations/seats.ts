import type { CourseSeats } from "@oriledesma/schemas";

/** Puerto de cupos del curso. Cuando se elija Stripe o Lemon Squeezy, se implementa acá. */
export interface SeatsProvider {
  getSeats(): Promise<CourseSeats>;
}

/** Cupos fijos por configuración, marcados como simulados. */
export class StaticSeatsProvider implements SeatsProvider {
  constructor(private readonly seats: { total: number; sold: number }) {}

  getSeats(): Promise<CourseSeats> {
    return Promise.resolve({ ...this.seats, simulated: true });
  }
}
