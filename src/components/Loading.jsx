import styles from './Loading.module.css';

const Loading = ({ size = 'medium', text = 'Loading...' }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Loading;