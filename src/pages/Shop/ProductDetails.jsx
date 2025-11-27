import { Link } from "react-router";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router";
import { products } from "../../data/products";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((product) => product.slug === slug);
  return (
    <main className={styles.productDetailMain}>
      <div className={styles.backContaine}>
        <Link to="/shop">
          <svg
            width="25"
            height="25"
            viewBox="0 0 22 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Arrow 1"
              d="M21 8.36401C21.5523 8.36401 22 7.9163 22 7.36401C22 6.81173 21.5523 6.36401 21 6.36401V7.36401V8.36401ZM0.292893 6.65691C-0.0976311 7.04743 -0.0976311 7.6806 0.292893 8.07112L6.65685 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41421 7.36401L8.07107 1.70716C8.46159 1.31664 8.46159 0.68347 8.07107 0.292946C7.68054 -0.0975784 7.04738 -0.0975784 6.65685 0.292946L0.292893 6.65691ZM21 7.36401V6.36401L1 6.36401V7.36401L1 8.36401L21 8.36401V7.36401Z"
              fill="currentcolor"
            />
          </svg>
        </Link>
      </div>
      <div className={styles.ProductDetail}>
        <img src={product.image} alt={product.name} />
        <div className={styles.ProductInfo}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
