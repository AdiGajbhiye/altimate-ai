import { Link } from "react-router-dom";
import styles from "./style.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/dashboard" className={styles.header_item}>
        Dashboard
      </Link>
      <Link to="/form" className={styles.header_item}>
        Form
      </Link>
      <Link to="/chart" className={styles.header_item}>
        Chart
      </Link>
      <Link to="/paginate" className={styles.header_item}>
        Paginate
      </Link>
    </div>
  );
};

export { Header };
