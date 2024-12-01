import React from "react";
import styles from "./Features.module.css";
import { useOutletContext } from "react-router-dom";

const Features = () => {
  const { camper } = useOutletContext();

  if (!camper) {
    return <div>No details available.</div>;
  }

  return (
    <div className={styles.featuresIcon}>
      <ul className={styles.features}>
        {camper.transmission === "automatic" && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-avtom"></use>
            </svg>
            Automatic
          </li>
        )}
        {camper.engine === "petrol" && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-petrol"></use>
            </svg>
            Petrol
          </li>
        )}
        {camper.kitchen && (
          <li className={styles.featureItom}>
            {" "}
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-Group"></use>
            </svg>
            Kitchen
          </li>
        )}
        {camper.AC && (
          <li className={styles.featureItom}>
            {" "}
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-ac"></use>
            </svg>
            AC
          </li>
        )}
        {camper.radio === true && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-ui-radios"></use>
            </svg>
            Radio
          </li>
        )}
        {camper.TV === true && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-tv"></use>
            </svg>
            TV
          </li>
        )}
        {camper.bathroom === true && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-badrom"></use>
            </svg>
            Bathroom
          </li>
        )}
        {camper.water === true && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#woter"></use>
            </svg>
            Water
          </li>
        )}
        {camper.refrigerator === true && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#icon-solar-refreg"></use>
            </svg>
            Refrigerator
          </li>
        )}
        {camper.microwave === true && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#microv"></use>
            </svg>
            Microwave
          </li>
        )}
        {camper.gas === true && (
          <li className={styles.featureItom}>
            <svg className={styles.icon} width="20" height="20">
              <use href="/sprite.svg#gas"></use>
            </svg>
            Gas
          </li>
        )}
      </ul>
      <h3 className={styles.sectionTitle}>Vehicle Details</h3>
      <div className={styles.divPalka}>
        <svg className={styles.icon2} width="527" height="2">
          <use href="/sprite.svg#icon-palka2"></use>
        </svg>
      </div>
      <ul className={styles.detailsList}>
        <li className={styles.detailItem}>
          <span className={styles.detailLabel}>Form</span>
          <span className={styles.detailValue}>{camper.form}</span>
        </li>
        <li className={styles.detailItem}>
          <span className={styles.detailLabel}>Length</span>
          <span className={styles.detailValue}>{camper.length}</span>
        </li>
        <li className={styles.detailItem}>
          <span className={styles.detailLabel}>Width</span>
          <span className={styles.detailValue}>{camper.width}</span>
        </li>
        <li className={styles.detailItem}>
          <span className={styles.detailLabel}>Height</span>
          <span className={styles.detailValue}>{camper.height}</span>
        </li>
        <li className={styles.detailItem}>
          <span className={styles.detailLabel}>Tank</span>
          <span className={styles.detailValue}>{camper.tank}</span>
        </li>
        <li className={styles.detailItem}>
          <span className={styles.detailLabel}>Consumption</span>
          <span className={styles.detailValue}>{camper.consumption}</span>
        </li>
      </ul>
    </div>
  );
};

export default Features;
