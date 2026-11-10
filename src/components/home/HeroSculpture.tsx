import Image from "next/image";
import styles from "./hero-sculpture.module.css";

export default function HeroSculpture() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/geological-crystal-centerpiece.png"
        alt=""
        width={707}
        height={639}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 58vw, 707px"
        className={styles.centerpieceImg}
      />
    </div>
  );
}
