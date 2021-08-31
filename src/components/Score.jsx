import styles from "./Score.module.css";

export default function Score({ value }) {
  return (
    <div className={styles.score}>
      <span>Score:</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
