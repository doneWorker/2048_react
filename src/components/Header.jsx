import Score from "./Score";
import styles from "./Header.module.css";

export default function Header({ score }) {
  return (
    <header className={styles.header}>
      <Score value={score} />
      <button className={styles.button}>New game</button>
    </header>
  );
}
