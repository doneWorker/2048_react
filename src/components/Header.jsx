import Score from "./Score";
import styles from "./Header.module.css";

export default function Header({ score, onNewGame }) {
  return (
    <header className={styles.header}>
      <Score value={score} />
      <button className={styles.button} onClick={onNewGame}>
        New game
      </button>
    </header>
  );
}
