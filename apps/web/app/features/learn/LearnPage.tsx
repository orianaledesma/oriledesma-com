import { useSearchParams } from "react-router";
import { LIBRARY } from "~/content/library";
import { useHydrated } from "~/shared/lib/useHydrated";
import { Button } from "~/shared/ui/Button";
import { Container } from "~/shared/ui/Container";
import { Grid } from "~/shared/ui/Layout";
import { Section } from "~/shared/ui/Section";
import { Accent, Lead, Pill, Signature } from "~/shared/ui/Text";
import { FilterBar } from "./FilterBar";
import {
  DEFAULT_FILTERS,
  filterPieces,
  type LibraryFilters,
  parseFilters,
  toSearchParams,
} from "./filters";
import styles from "./LearnPage.module.css";
import { PieceCard } from "./PieceCard";

/**
 * Contenedor: los filtros viven en la URL (?pilar=&nivel=&numeros=), así un filtro se
 * comparte por link y sobrevive al refresh. El HTML prerenderizado muestra todo.
 */
export function LearnPage() {
  const [params, setParams] = useSearchParams();
  const hydrated = useHydrated();
  const filters = hydrated ? parseFilters(params) : DEFAULT_FILTERS;
  const pieces = filterPieces(LIBRARY, filters);

  const update = (next: LibraryFilters) => {
    setParams(toSearchParams(next), { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <Section variant="hero" surface="celeste" labelledBy="aprende-h1">
        <Container>
          <Pill>Biblioteca</Pill>
          <h1 id="aprende-h1">
            Aprendé a tu <Accent>nivel</Accent>
          </h1>
          <Lead>
            Todo lo que publico, ordenado por pilar y por nivel. Elegí desde dónde arrancás y
            filtrá.
          </Lead>
        </Container>
      </Section>

      <Section labelledBy="biblioteca-titulo">
        <Container>
          <h2 id="biblioteca-titulo" className="sr-only">
            Contenido filtrable
          </h2>
          <FilterBar filters={filters} onChange={update} />
          <p className={styles.count} aria-live="polite">
            {pieces.length} {pieces.length === 1 ? "pieza" : "piezas"}
          </p>
          {pieces.length > 0 ? (
            <Grid cols={3} as="ul">
              {pieces.map((piece) => (
                <PieceCard key={piece.id} piece={piece} />
              ))}
            </Grid>
          ) : (
            <div className={styles.empty}>
              <p>No hay piezas con esos filtros todavía.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  update(DEFAULT_FILTERS);
                }}
              >
                Ver todo
              </Button>
            </div>
          )}
          <Signature>Yo lo pruebo, vos lo aplicás.</Signature>
        </Container>
      </Section>
    </>
  );
}
