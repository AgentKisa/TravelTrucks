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
        <h3>{camper.name}</h3>
        <p>Location: {camper.location}</p>
        <p>Price: €{camper.price}</p>
        <p>Rating: {camper.rating} ★</p>
        <div className={styles.features}>
          <span>{camper.engine}</span>
          {camper.AC && <span>AC</span>}
        </div>
        <button
          className={styles.favoriteButton}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      <button className={styles.showMore} onClick={handleShowMore}>
        Show more
      </button>
    </div>
  );
};

export default CamperCard;
