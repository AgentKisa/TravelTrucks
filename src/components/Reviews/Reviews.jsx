import React from "react";
import styles from "./Reviews.module.css";
import { useOutletContext } from "react-router-dom";

const Reviews = () => {
  const { camper } = useOutletContext(); // Получаем данные через Outlet context

  // Проверяем, есть ли camper и есть ли у него свойство reviews
  if (!camper || !camper.reviews) {
    return <div>No reviews available.</div>;
  }

  return (
    <div className={styles.reviews}>
      <h3>Reviews</h3>
      {camper.reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <p>{review.comment}</p>
          <span>
            {review.reviewer_name} - Rating: {review.reviewer_rating} / 5
          </span>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
