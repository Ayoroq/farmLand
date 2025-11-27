import styles from "./Card.module.css";
import { Link } from "react-router";

export default function shopCard(props) {
  return (
    <Link to={`/shop/${props.slug}`} className={styles.ShopCard}>
      <div className={styles.ShopCardImgContainer}>
        <img
          src={props.img}
          alt={props.description}
          className={styles.ShopCardImg}
        />
      </div>
      <div className={styles.ShopCardDetailsContainer}>
        <h3>{props.name}</h3>
        <p>
          ${props.price} / <span>{props.unit}</span>
        </p>
      </div>
    </Link>
  );
}