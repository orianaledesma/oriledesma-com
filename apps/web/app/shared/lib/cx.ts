/** Une clases condicionales: `cx("a", cond && "b")`. */
export const cx = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(" ");
