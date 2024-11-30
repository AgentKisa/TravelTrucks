import React from "react";
import styles from "./Features.module.css";
import { useOutletContext } from "react-router-dom";

const Features = () => {
  const { camper } = useOutletContext();
  if (!camper || !camper.reviews) {
    return <div>No reviews available.</div>;
  }

  return (
    <div className={styles.features}>
      <h3>Vehicle Details</h3>
      <ul>
        <li>Length: {camper.length}</li>
        <li>Width: {camper.width}</li>
        <li>Height: {camper.height}</li>
        <li>Consumption: {camper.consumption}</li>
      </ul>
    </div>
  );
};

export default Features;
