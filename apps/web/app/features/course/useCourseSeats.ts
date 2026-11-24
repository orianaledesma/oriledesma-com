import { API_ROUTES, type CourseSeats, courseSeats, seatsRemaining } from "@oriledesma/schemas";
import { useQuery } from "@tanstack/react-query";
import { COURSE } from "~/config/site";
import { getApiUrl, getJson } from "~/shared/api/client";

/**
 * Cupos de la config: es lo que se ve en el HTML prerenderizado, mientras carga la API
 * y, sin back (MVP), el dato definitivo. En ese caso se actualiza a mano `COURSE.seatsSold`.
 */
const FROM_CONFIG: CourseSeats = { total: COURSE.seats, sold: COURSE.seatsSold, simulated: false };

export function useCourseSeats() {
  const hasApi = Boolean(getApiUrl());
  const query = useQuery({
    queryKey: ["course", "seats"],
    enabled: hasApi,
    queryFn: async ({ signal }) => courseSeats.parse(await getJson(API_ROUTES.courseSeats, signal)),
  });
  const seats = query.data ?? FROM_CONFIG;
  return {
    ...seats,
    remaining: seatsRemaining(seats),
    isLoading: hasApi && query.isPending,
  };
}
