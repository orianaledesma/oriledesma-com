import { PILLARS } from "~/content/library";
import type { LibraryPiece } from "~/content/schema";
import { ArrowLink } from "~/shared/ui/ArrowLink";
import { Card, CardFooter } from "~/shared/ui/Card";
import { Chip, ChipList } from "~/shared/ui/Chip";
import { SocialPost } from "~/shared/ui/SocialPost";
import { Pending } from "~/shared/ui/Text";
import styles from "./LearnPage.module.css";

export function PieceCard({ piece }: { piece: LibraryPiece }) {
  return (
    <Card as="li">
      <SocialPost tag={piece.tag} title={piece.title} tone={piece.tone} shape="square" />
      <ChipList>
        <Chip tone="pillar">{PILLARS[piece.pillar].label}</Chip>
        <Chip>Nivel {piece.level}</Chip>
        {piece.withNumbers && <Chip tone="numbers">Con números</Chip>}
      </ChipList>
      <p className={styles.format}>{piece.format}</p>
      <h3>{piece.title}</h3>
      <p className={styles.summary}>{piece.summary}</p>
      <CardFooter>
        {piece.url === "pending" ? (
          <span className={styles.pendingLink}>
            Ver <Pending>[link]</Pending>
          </span>
        ) : (
          <ArrowLink href={piece.url} aria-label={`Ver: ${piece.title}`}>
            Ver
          </ArrowLink>
        )}
      </CardFooter>
    </Card>
  );
}
