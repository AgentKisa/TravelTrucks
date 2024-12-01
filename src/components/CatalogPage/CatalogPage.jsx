import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampers, resetCampers } from "../../redux/campersSlice";
import CamperCard from "../CamperCard/CamperCard";
import Filters from "../Filters/Filters";
import styles from "./CatalogPage.module.css";
import { DNA } from "react-loader-spinner";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { campers, isLoading, error, filters, page, hasMore } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    if (campers.length === 0 && hasMore && !isLoading) {
      dispatch(fetchCampers({ filters, page: 1 }));
    }
  }, [dispatch, campers.length, filters, hasMore, isLoading, page]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      dispatch(fetchCampers({ filters, page }));
    }
  };

  return (
    <div className={styles.catalogPage}>
      <div className={styles.page}>
        <Filters />
        <div className={styles.campersList}>
          {campers.length === 0 && !isLoading && !hasMore ? (
            <p className={styles.notFound}>Not found!</p>
          ) : (
            campers.map((camper, index) => (
              <CamperCard key={`${camper.id}-${index}`} camper={camper} />
            ))
          )}
        </div>
      </div>
      {hasMore && campers.length > 0 && (
        <button onClick={handleLoadMore} className={styles.loadMore}>
          {isLoading ? (
            <DNA
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          ) : (
            "Load more"
          )}
        </button>
      )}
      {isLoading && campers.length === 0 && (
        <p className={styles.loaderContainer}>
          <DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </p>
      )}
    </div>
  );
};

export default CatalogPage;
