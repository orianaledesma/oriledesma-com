import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_site.tsx", [
    index("routes/home.tsx"),
    route("curso", "routes/course.tsx"),
    route("talleres", "routes/workshops.tsx"),
    route("implementacion", "routes/implementation.tsx"),
    route("en/implementation", "routes/implementation.en.tsx"),
    route("vivos", "routes/lives.tsx"),
    route("aprende", "routes/learn.tsx"),
    route("en-publico", "routes/public-numbers.tsx"),
  ]),
] satisfies RouteConfig;
