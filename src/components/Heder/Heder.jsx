import { Link, useLocation } from "react-router-dom";
import styles from "./Heder.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="public/img/Logo.jpg" alt="" className={styles.logoImage} />
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
