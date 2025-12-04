import { Link } from 'react-router';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/shop" className={styles.homeLink}>
          Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default NotFound;