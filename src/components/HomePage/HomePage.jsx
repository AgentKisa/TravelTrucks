import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.banner}>
        <h1 className={styles.title}>
          Discover the Perfect Camper for Your Journey
        </h1>
        <p className={styles.description}>
          Start your adventure with TravelTrucks. Choose from the best selection
          of campers and explore the world in comfort!
        </p>
        <Link to="/catalog" className={styles.button}>
          View Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
