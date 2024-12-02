import React from "react";
import styles from "./Reviews.module.css";
import { useOutletContext } from "react-router-dom";

const Reviews = () => {
  const { camper } = useOutletContext();

  if (!camper || !camper.reviews) {
    return <div>No reviews available.</div>;
  }

  return (
    <div className={styles.reviews}>
      {camper.reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <div className={styles.reviewer}>
            <div className={styles.avatar}>{review.reviewer_name[0]}</div>
            <div>
              <p className={styles.name}>{review.reviewer_name}</p>
              <div className={styles.rating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    className={
                      i < review.reviewer_rating
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  >
                    <use href="/sprite.svg#icon-star2"></use>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
