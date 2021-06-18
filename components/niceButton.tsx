import styles from "../styles/NiceButton.module.scss";

export const NiceButton: React.FC = ({ children }) => (
  <button className={styles.pushable}>
    <span className={styles.shadow}></span>
    <span className={styles.edge}></span>
    <span className={styles.front}>{children}</span>
  </button>
);
