import { Link } from "react-router";
import styles from "./Shop.module.css";
import { useParams } from "react-router";
import { products } from "../../data/products";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((product) => product.slug === slug);
  return (
    <main className={styles.productDetailMain}>
      <Link to="/shop">Back to all products</Link>
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </main>
  );
};

export default ProductDetail;
