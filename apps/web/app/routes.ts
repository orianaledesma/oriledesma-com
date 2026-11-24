import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_site.tsx", [
    index("routes/home.tsx"),
    route("curso", "routes/course.tsx"),
    route("talleres", "routes/workshops.tsx"),
  ]),
] satisfies RouteConfig;
