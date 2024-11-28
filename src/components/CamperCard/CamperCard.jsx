import React from "react";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const { name, price, location, rating, gallery, engine, AC } = camper;

  return (
    <div className={styles.card}>
      <img
        src={gallery[0]?.thumb || "/placeholder.jpg"}
        alt={name}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>Location: {location}</p>
        <p>Price: €{price}</p>
        <p>Rating: {rating} ★</p>
        <div className={styles.features}>
          <span>{engine}</span>
          {AC && <span>AC</span>}
        </div>
      </div>
      <button className={styles.showMore}>Show more</button>
    </div>
  );
};

export default CamperCard;
