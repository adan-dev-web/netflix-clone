import spinner from "../../assets/netflix_spinner.gif";
import "./Loader.css";

const Loader = () => (
  <div className="netflix-loader-overlay">
    <img src={spinner} alt="Chargement..." className="netflix-spinner" />
  </div>
);

export default Loader;
