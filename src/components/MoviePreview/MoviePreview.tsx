import { POSTER_URL_PREFIX } from "../../App";
import { Movie } from "../../models";
import styles from "./MoviePreview.module.css";

const MoviePreview = ({movie}:{movie: Movie}) => {
  const goToMovieDetails = () => {
    window.location.href = `/movie/${movie.id}`;
  };
  const vote_adjusted = Math.floor(movie.vote_average*5/10)
  return <div className={styles.movieCard} onClick={goToMovieDetails}>
    <img src={POSTER_URL_PREFIX + movie.poster_path} height={200} width={150} style={{borderTopLeftRadius:"5px",borderTopRightRadius:"5px"}}/>
    <div>{movie.title}</div>
    <div className={styles.vote}>
      {[...Array(5)].map((_, index) => (
        <div style={{color:`${vote_adjusted<index+1 ? "white" : "yellow"}`
        }}>★</div>
      ))}
    </div>
  </div>;
};

export default MoviePreview;
