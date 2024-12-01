import { Link, useLocation } from "react-router-dom";
import styles from "./Heder.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <svg className={styles.logoImage} width="136" height="16">
            <use href="/sprite.svg#icon-Logo"></use>
          </svg>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="/"
              className={`${styles.navLink} ${
                location.pathname === "/" ? styles.active : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/catalog"
              className={`${styles.navLink} ${
                location.pathname === "/catalog" ? styles.active : ""
              }`}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
