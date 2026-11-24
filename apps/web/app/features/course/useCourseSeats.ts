import { API_ROUTES, type CourseSeats, courseSeats, seatsRemaining } from "@oriledesma/schemas";
import { useQuery } from "@tanstack/react-query";
import { COURSE } from "~/config/site";
import { getJson } from "~/shared/api/client";

/** Mientras carga (y en el HTML prerenderizado) se muestran los cupos de la config. */
const PLACEHOLDER: CourseSeats = { total: COURSE.seats, sold: 0, simulated: true };

export function useCourseSeats() {
  const query = useQuery({
    queryKey: ["course", "seats"],
    queryFn: async ({ signal }) => courseSeats.parse(await getJson(API_ROUTES.courseSeats, signal)),
  });
  const seats = query.data ?? PLACEHOLDER;
  return {
    ...seats,
    remaining: seatsRemaining(seats),
    isLoading: query.isPending,
  };
}
