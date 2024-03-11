import React, { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import "./MovieProfile.scss";
import { connect } from "react-redux";
import {
  getMovieInfo,
  addFavorite,
  deleteFavorite,
} from "../../actions/actions";
const MovieProfile = (props) => {
  const {
    movie,
    getMovieInfo,
    movieInfo,
    stars_earned,
    stars_not_earned,
    list,
    favorites,
  } = props;
  const [open, setOpen] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (list === "favorites") {
      setIsFavorite(true);
    } else if (list === "recommended") {
      setIsFavorite(
        favorites.filter((favorite) => {
          return favorite.movie_id === Number(movie.movie_id);
        }).length > 0
      );
    } else {
      setIsFavorite(
        favorites.filter((favorite) => {
          return favorite.movie_id === Number(movie.id);
        }).length > 0
      );
    }
  }, [favorites,isFavorite,list,movie]);

  const handleOpen = () => {
    if (list === "favorites") {
      getMovieInfo(movie.movie_id);
    } else {
      getMovieInfo(movie.id);
    }

    setOpen(!open);
  };
  const body = (
    <div className="movie_card" id="bright">
      <div className="info_section">
        <div className="movie_header">
          {/* <img
            className="locandina"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          /> */}
          <h1>{movieInfo.title}</h1>
          <h4>{ movieInfo.release_date}</h4>
          <span className="minutes">{movieInfo.runtime} min</span>
          {movieInfo.genres ? (
            <>
              {movieInfo.genres.map((movie) => (
                <p className="type">{movie.name}</p>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="movie_desc">
          <p className="text">{ movieInfo.overview}</p>
        </div>
        <div className="movie_social">
          <ul>
            <li onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
              Close
            </li>
          </ul>
        </div>
      </div>
      <div
        className="blur_back bright_back"
        style={{
          background: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
        }}
      />
    </div>
  );

  return (
    <>
      <h1 onClick={() => handleOpen()} style={{cursor:"pointer"}}>{movie.title}</h1>
      <p>(Click on title to view profile)</p>
      <p>{list === "recommended" ? movie.vote_average : movie.vote_average}</p>
      <div>
        {stars_earned.map((star) => (
          // <FontAwesomeIcon icon={faStar} color="Gold" />
          <> </>
        ))}
        {stars_not_earned.map((star) => (
          // <FontAwesomeIcon icon={faStar} color="white" />
          <> </>
        ))}
        <p>{movie.overview.length > 150 ? movie.overview.slice(0,149).toString() + "..." : movie.overview}</p>

        {/* {favorites.filter((favorite) => {
          return favorite.movie_id === Number(movie.id);
        }).length > 0 && list !== "favorite" && list !==  ? (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => {
              props.deleteFavorite(movie.id);
              props.deleteRecommedations(movie.id);
            }}
            style={{ cursor: "pointer" }}
            color="red"
          />
        ) 
        
        : 
        list === "favorite" || list === "recommended"
        <FontAwesomeIcon
        icon={faHeart}
        onClick={() => {
          props.deleteFavorite(movie.movie_id);
          props.deleteRecommedations(movie.movie_id);
        }}
        style={{ cursor: "pointer" }}
        color="red"
      />
        :
        (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => {
              props.addFavorite(movie);
              setTimeout(function () {
                props.getRecommended();
              }, 5000);
            }}
            style={{ cursor: "pointer" }}
            color="white"
          />
        )} */}
        {/* {list === "recommended" ? (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={
              !isFavorite
                ? () => {
                    setIsFavorite(!isFavorite);
                    props.addFavorite(movie);
                    setTimeout(function () {
                      props.getRecommended();
                    }, 5000);
                  }
                : () => {
                    setIsFavorite(!isFavorite);
                    props.deleteFavorite(movie.movie_id);
                    props.deleteRecommedations(movie.movie_id);
                  }
            }
            style={{ cursor: "pointer" }}
            color={isFavorite ? "red" : "white"}
          />
        ) : list === "favorites" ? (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => {
              props.deleteFavorite(movie.movie_id);
              props.deleteRecommedations(movie.movie_id);
            }}
            style={{ cursor: "pointer" }}
            color="red"
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={
              !isFavorite
                ? () => {
                    setIsFavorite(!isFavorite);
                    props.addFavorite(movie);
                    setTimeout(function () {
                      props.getRecommended();
                    }, 5000);
                  }
                : () => {
                    setIsFavorite(!isFavorite);
                    props.deleteFavorite(movie.id);
                    props.deleteRecommedations(movie.id);
                  }
            }
            style={{ cursor: "pointer" }}
            color={isFavorite ? "red" : "white"}
          />
        )} */}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};
function mapStateToProps(state) {
  return {
    movieInfo: state.movieInfo,
    favorites: state.favorites,
    recommended: state.recommended
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMovieInfo: (movie) => {
      dispatch(getMovieInfo(movie));
    },
    addFavorite: (id) => {
      dispatch(addFavorite(id));
    },
    deleteFavorite: (id) => {
      dispatch(deleteFavorite(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieProfile);
