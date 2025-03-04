import { Link } from "react-router-dom";
import "./index.css"; // Import CSS for styling

const MovieCard = ({ movieDetails }) => {
  const { id, posterPath, voteAverage, title } = movieDetails;

  return (
    <li className="movie-item">
      <div
        className="movie-bg"
        style={{
          backgroundImage: `url(${posterPath})`,
        }}
      >
        <div className="movie-overlay">
          <h1 className="movie-title">{title}</h1>
          <p className="movie-rating">Rating:⭐ {voteAverage}</p>
          <Link to={`/movie/${id}`} className="movie-link">
            <button className="movie-button">View Details</button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
