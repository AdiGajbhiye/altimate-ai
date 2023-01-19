import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/dashboard" className="header-item">
        Dashboard
      </Link>
      <Link to="/form" className="header-item">
        Form
      </Link>
      <Link to="/chart" className="header-item">
        Chart
      </Link>
      <Link to="/paginate" className="header-item">
        Paginate
      </Link>
    </div>
  );
};

export { Header };
