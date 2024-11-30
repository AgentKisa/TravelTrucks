import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.banner}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.description}>
          You can find everything you want in our catalog
        </p>
        <Link to="/catalog" className={styles.button}>
          View Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
