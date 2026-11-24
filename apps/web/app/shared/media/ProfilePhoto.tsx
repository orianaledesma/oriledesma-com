import symbol from "~/assets/logo/simbolo-marino-mono.svg";
import { cx } from "~/shared/lib/cx";
import { Picture } from "./Picture";
import { PHOTOS } from "./photos";
import styles from "./ProfilePhoto.module.css";

type Props = { alt: string; round?: boolean; sizes: string; className?: string | undefined };

/** Foto de perfil: Celeste + símbolo al 22 % + recorte, como en las redes. */
export function ProfilePhoto({ alt, round = false, sizes, className }: Props) {
  return (
    <div className={cx(styles.photo, round && styles.round, className)}>
      <img className={styles.symbol} src={symbol} alt="" width="528" height="446" />
      <Picture photo={PHOTOS.perfil} alt={alt} sizes={sizes} className={styles.img} />
    </div>
  );
}
