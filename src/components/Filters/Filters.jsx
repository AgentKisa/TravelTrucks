import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  resetCampers,
  fetchCampers,
} from "../../redux/campersSlice";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.campers.filters);

  const handleFilterChange = (key, value) => {
    // Устанавливаем null для снятых чекбоксов, чтобы удалить параметр
    const newValue = value ? value : null;
    dispatch(setFilter({ [key]: newValue }));
  };

  const handleSearch = () => {
    dispatch(resetCampers()); // Сбрасываем текущие данные
    dispatch(fetchCampers({ filters, page: 1 })); // Загружаем данные с фильтрами
  };

  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Location"
        value={filters.location}
        onChange={(e) => handleFilterChange("location", e.target.value)}
        className={styles.filterInput}
      />
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="form"
            value="alcove"
            checked={filters.form === "alcove"}
            onChange={(e) => handleFilterChange("form", e.target.value)}
          />
          Alcove
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="fullyIntegrated"
            checked={filters.form === "fullyIntegrated"}
            onChange={(e) => handleFilterChange("form", e.target.value)}
          />
          Fully Integrated
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="panelTruck"
            checked={filters.form === "panelTruck"}
            onChange={(e) => handleFilterChange("form", e.target.value)}
          />
          Panel Truck
        </label>
      </div>
      <label>
        <input
          type="checkbox"
          checked={filters.AC}
          onChange={(e) => handleFilterChange("AC", e.target.checked)}
        />
        AC
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.kitchen}
          onChange={(e) => handleFilterChange("kitchen", e.target.checked)}
        />
        Kitchen
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.TV}
          onChange={(e) => handleFilterChange("TV", e.target.checked)}
        />
        TV
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.bathroom}
          onChange={(e) => handleFilterChange("bathroom", e.target.checked)}
        />
        Bathroom
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.transmission === "automatic"}
          onChange={(e) =>
            handleFilterChange(
              "transmission",
              e.target.checked ? "automatic" : null
            )
          }
        />
        Automatic Transmission
      </label>
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default Filters;
