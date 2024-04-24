import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Clapperboard, Search } from "lucide-react";

export const Header = () => {
  return (
    <nav className={styles.navbar}>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <div className={styles.logo} style={{ color: "white" }}>
          <Clapperboard size={32} />
          <h2>Cine-Catalog</h2>
        </div>
      </Link>
      <Link
        to={`/favorites`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <h3>Mes films</h3>
      </Link>

      <div className={styles.searchBar}>
        <div className={styles.searchBarContainer}>
          <Search size={24} />
          <input
            className={styles.searchBarInput}
            type="text"
            placeholder="Recherche ton film préféré..."
          />
        </div>
      </div>
    </nav>
  );
};
