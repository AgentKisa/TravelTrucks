import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  resetCampers,
  fetchCampers,
} from "../../redux/campersSlice";
import styles from "./Filters.module.css";
import icon from "/public/sprite.svg";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.campers.filters);

  const handleFilterChange = (key, value) => {
    const newValue = value ? value : null;
    dispatch(setFilter({ [key]: newValue }));
  };

  const handleSearch = () => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ filters, page: 1 }));
  };

  return (
    <div className={styles.filters}>
      <div className={styles.locationFilter}>
        <p className={styles.location}>Location</p>
        <input
          type="text"
          value={filters.location}
          placeholder="City"
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className={styles.filterInput}
        />
        <svg className={styles.icon2} width="16" height="16">
          <use href="/sprite.svg#icon-Map-2"></use>
        </svg>
      </div>
      <p className={styles.filter}>Filters</p>
      <div className={styles.filterGroup}>
        <p className={styles.filterTitle}>Vehicle equipment</p>
        <div className={styles.svgStick}>
          <svg className={styles.icon} width="360" height="2">
            <use href="/sprite.svg#icon-divider"></use>
          </svg>
        </div>
        <ul className={styles.filterList}>
          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.AC ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.AC}
                onChange={(e) => handleFilterChange("AC", e.target.checked)}
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-ac"></use>
              </svg>
              <p className={styles.checkboxText}>AC</p>
            </label>
          </li>
          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.transmission === "automatic" ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.transmission === "automatic"}
                onChange={(e) =>
                  handleFilterChange(
                    "transmission",
                    e.target.checked ? "automatic" : null
                  )
                }
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-avtom"></use>
              </svg>
              <p className={styles.checkboxText}>Automatic</p>
            </label>
          </li>
          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.kitchen ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.kitchen}
                onChange={(e) =>
                  handleFilterChange("kitchen", e.target.checked)
                }
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-Group"></use>
              </svg>
              <p className={styles.checkboxText}>Kitchen</p>
            </label>
          </li>
          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.TV ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.TV}
                onChange={(e) => handleFilterChange("TV", e.target.checked)}
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-tv"></use>
              </svg>
              <p className={styles.checkboxText}>TV</p>
            </label>
          </li>
          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.bathroom ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.bathroom}
                onChange={(e) =>
                  handleFilterChange("bathroom", e.target.checked)
                }
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-badrom"></use>
              </svg>
              <p className={styles.checkboxText}>Bathroom</p>
            </label>
          </li>
        </ul>
      </div>
      <div className={styles.radioGroup}>
        <p className={styles.filterTitle}>Vehicle type</p>
        <div className={styles.svgStick}>
          <svg className={styles.icon} width="360" height="2">
            <use href="/sprite.svg#icon-divider"></use>
          </svg>
        </div>
        <ul className={styles.filterList}>
          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.form === "panelTruck" ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                value="panelTruck"
                className={styles.checkboxInput}
                checked={filters.form === "panelTruck"}
                onChange={() =>
                  handleFilterChange(
                    "form",
                    filters.form === "panelTruck" ? null : "panelTruck"
                  )
                }
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-bi-van"></use>
              </svg>
              <p className={styles.checkboxText}>Van</p>
            </label>
          </li>

          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.form === "fullyIntegrated" ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                value="fullyIntegrated"
                className={styles.checkboxInput}
                checked={filters.form === "fullyIntegrated"}
                onChange={() =>
                  handleFilterChange(
                    "form",
                    filters.form === "fullyIntegrated"
                      ? null
                      : "fullyIntegrated"
                  )
                }
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-bi-fulll"></use>
              </svg>
              <p className={styles.checkboxText}>Fully Integrated</p>
            </label>
          </li>
          <li>
            <label
              className={`${styles.checkboxLabel} ${
                filters.form === "alcove" ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                value="alcove"
                className={styles.checkboxInput}
                checked={filters.form === "alcove"}
                onChange={() =>
                  handleFilterChange(
                    "form",
                    filters.form === "alcove" ? null : "alcove"
                  )
                }
              />
              <svg className={styles.checkboxIcon} width="32" height="32">
                <use href="/sprite.svg#icon-bi-alcove"></use>
              </svg>
              <p className={styles.checkboxText}>Alcove</p>
            </label>
          </li>
        </ul>
      </div>
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default Filters;
