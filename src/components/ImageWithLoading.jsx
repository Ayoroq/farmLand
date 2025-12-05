import { useState, useEffect } from 'react';
import styles from './ImageWithLoading.module.css';

const ImageWithLoading = ({ src, alt, className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    // Check if image is already cached
    if (img.complete) {
      setLoading(false);
    }
  }, [src]);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {loading && (
        <div className={styles.skeleton}>
          <div className={styles.shimmer}></div>
        </div>
      )}
      {error ? (
        <div className={styles.errorPlaceholder}>
          <span>Image not found</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${styles.image} ${loading ? styles.hidden : ''}`}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithLoading;