import styles from "./Loader.module.css";

export const Loader = () => (
  <div className={styles.loader}>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
  </div>
);
