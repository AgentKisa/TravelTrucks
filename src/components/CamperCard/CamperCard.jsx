import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/campersSlice";
import styles from "./CamperCard.module.css";
import { Navigate, useNavigate } from "react-router-dom";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.campers);
  const isFavorite = favorites.some((fav) => fav.id === camper.id);
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate(`/catalog/${camper.id}`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(camper));
    } else {
      dispatch(addToFavorites(camper));
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={camper.gallery[0]?.thumb || "/placeholder.jpg"}
        alt={camper.name}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.name}>{camper.name}</h3>
          <div className={styles.footer}>
            <p className={styles.price}>€{camper.price}</p>
            <button
              className={styles.favoriteButton}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <svg width="26" height="24">
                  <use href="/sprite.svg#icon-heart2"></use>
                </svg>
              ) : (
                <svg width="26" height="24">
                  <use href="/sprite.svg#icon-heart"></use>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={styles.location}>
          <div className={styles.rating}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-star"></use>
            </svg>
            {camper.rating} ({camper.reviews.length} Reviews)
          </div>
          <div>
            <svg className={styles.icon} width="16" height="16">
              <use href="/sprite.svg#icon-map"></use>
            </svg>
            {camper.location}
          </div>
        </div>
        <p className={styles.description}>{camper.description}</p>
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
        </ul>
        <button className={styles.showMore} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
