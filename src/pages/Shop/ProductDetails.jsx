import { Link } from "react-router";
import styles from "./ProductDetails.module.css";
import { useParams, useNavigate } from "react-router";
import { products } from "../../data/products";
import { useContext, useState } from "react";
import { BasketContext } from "../../context/BasketContext";
import NotFound from "../NotFound/NotFound";
import ImageWithLoading from "../../components/ImageWithLoading";
import SEO from "../../components/SEO";
import { MAX_QTY } from "../../context/BasketContext";

const ProductDetail = () => {
  const basket = useContext(BasketContext);
  const Navigate = useNavigate();
  const { slug } = useParams();
  const [localQuantity, setLocalQuantity] = useState(1);

  const product = products.find(
    (product) => product.slug === slug.toLowerCase()
  );

  if (!product) {
    return <NotFound />;
  }

  const basketItem = basket.basket.find((item) => item.id === product.id);
  const currentQuantity = basketItem?.quantity || localQuantity;
  const currentPrice = product.price * currentQuantity;

  function incrementQuantity() {
  if (basketItem) {
    if (basketItem.quantity < MAX_QTY) {
      basket.changeQuantity(product, basketItem.quantity + 1);
    }
  } else if (localQuantity < MAX_QTY) {
    setLocalQuantity(prev => prev + 1);
  }
}

  function decrementQuantity() {
    if (basketItem) {
      if (basketItem.quantity <= 1) {
        basket.removeFromBasket(product);
      } else {
        basket.changeQuantity(product, basketItem.quantity - 1);
      }
    } else {
      if (localQuantity > 1) {
        setLocalQuantity((prev) => prev - 1);
      }
    }
  }

  function toggleBasket() {
    if (basketItem) {
      basket.removeFromBasket(product);
    } else {
      basket.addToBasket(product, localQuantity);
    }
  }

  function buyNow() {
    if (!basketItem) {
      basket.addToBasket(product, localQuantity);
    }
    Navigate("/basket");
  }

  return (
    <>
      <SEO 
        title={`${product.name} - Fresh Organic Produce | FarmLand`}
        description={`${product.details} Buy fresh organic ${product.name.toLowerCase()} for $${product.price}/${product.unit}. Add to cart and enjoy premium quality produce.`}
        keywords={`${product.name.toLowerCase()}, organic ${product.category}, fresh produce, ${product.name} price`}
      />
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
      <div className={styles.productDetail}>
        <ImageWithLoading
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <div className={styles.productInfoHeader}>
            <div className={styles.productName}>
              <h2>{product.name}</h2>
              <p>
                ${product.price} / <span>{product.unit}</span>
              </p>
            </div>
            <p>{product.details}</p>
            <p>${currentPrice.toFixed(2)}</p>
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.QuantityButtons}>
              <button
                className={`${styles.QuantityButton} ${styles.QuantityButtonSub}`}
                onClick={decrementQuantity}
                aria-label="decreaseQuantity"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="remove">
                    <path
                      id="Vector"
                      d="M10 25.5V22.5H38V25.5H10Z"
                      fill="currentcolor"
                    />
                  </g>
                </svg>
              </button>
              <p className={styles.CartCardQuantityLabel}>
                <input
                  type="text"
                  readOnly
                  min={0}
                  size={currentQuantity.toString().length}
                  className={styles.quantityInput}
                  value={currentQuantity}
                />
              </p>
              <button
                className={`${styles.QuantityButton} ${styles.QuantityButtonAdd}`}
                onClick={incrementQuantity}
                aria-label="addQuantity"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="add">
                    <path
                      id="Vector"
                      d="M22.5 42V25.5H6V22.5H22.5V6H25.5V22.5H42V25.5H25.5V42H22.5Z"
                      fill="currentcolor"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className={styles.purchaseButtons}>
              <button className={styles.buyNowButton} onClick={buyNow}>
                Buy Now
              </button>
              <button className={styles.addToCartButton} onClick={toggleBasket}>
                {basket.basket.some((item) => item.id === product.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
      </main>
    </>
  );
};

export default ProductDetail;
