import axios from "axios";

export function getNowPlaying(id = 1) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=${id}`
      )
      .then((res) => {
        dispatch({ type: "GET_NOW_PLAYING", nowPlaying: res.data });
      });
  };
}

export function getPopular(id = 1) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=${id}`
      )
      .then((res) => {
        dispatch({ type: "GET_POPULAR", popular: res.data });
      });
  };
}
export function getUpcoming(id = 1) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=${id}`
      )
      .then((res) => {
        dispatch({ type: "GET_UPCOMING", upcoming: res.data });
      });
  };
}
export function getSearch(movie) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&query=${movie}&page=1`
      )
      .then((res) => {
        dispatch({ type: "GET_SEARCH", search: res.data });
      });
  };
}
export function getTopRated() {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=1`
      )
      .then((res) => {
        dispatch({ type: "GET_TOP_RATED", topRated: res.data });
      })
  };
}
export function getMovieInfo(id) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US`
      )
      .then((res) => {
        dispatch({ type: "GET_MOVIE_INFO", movieInfo: res.data });
      });
  };
}
export function getFavorites() {
  console.log("getFavorties",JSON.parse(localStorage.getItem("user")).id)
  return (dispatch) => {
    axios.get(`https://movie-app-be-bsn.vercel.app/ savedMovies/${localStorage.getItem("id")}`)
      .then((res) => {
        let obj = {}
        console.log("res.data",res.data)
        res.data.movies.map(item => obj[item.movie_id] = true)
        console.log("obj",obj)
        dispatch({ type: "GET_FAVORITES", payload: res.data.movies,obj:obj });
      });
  }
}
export function addFavorite(movie) {
  console.log(movie)
  return (dispatch) => {
    axios
      .post(`https://movie-app-be-bsn.vercel.app/ savedMovies`, movie)
      .then((res) => {
        let obj = {}
        console.log("res.data",res.data)
        res.data.movies.map(item => obj[item.movie_id] = true)
        dispatch({ type: "ADD_FAVORITE", payload: res.data.movies,obj:obj })
      })
      .catch(err => console.log(err.response));
  }
}
export function deleteFavorite(movie_id) {
  console.log(movie_id)
  return (dispatch) => {
    axios
      .delete(
        `https://movie-app-be-bsn.vercel.app/ savedMovies/${movie_id}`)
      .then((res) => {
        let obj = {}
        console.log("res.data",res.data)
        res.data.movies.map(item => obj[item.movie_id] = true)
        dispatch({ type: "DELETE_FAVORITE", payload: res.data.movies,obj:obj});
      })
      .catch(err => console.log(err.response))
  };
}

export function recommedations(movie, recommended_movie) {
  let new_movie = {
    user_id: Number(localStorage.getItem("id")),
    movie_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    overview: movie.overview,
    recommended_movie_id: recommended_movie,
    release_date: movie.release_date
  };

  axios
    .post(`https://movie-app-be-bsn.vercel.app/ recommendedMovies`, new_movie)
    .then((res) => {
      console.log(res.data);
    });
}
export function deleteRecommedations(movie_id) {
  return (dispatch) => {
    axios
      .delete(
        `https://movie-app-be-bsn.vercel.app/ ${movie_id}/${Number(
          localStorage.getItem("id")
        )}`
      )
      .then((res) => {
        dispatch({ type: "DELETE_RECOMMENDED", recommended_movie: movie_id });
      });
  };
}

export function getUser() {
  console.log(localStorage.getItem("id"))
  return (dispatch) => {
    axios
      .get(
        `https://movie-app-be-bsn.vercel.app/ users/${localStorage.getItem("id")}`
      )
      .then((res) => {
        console.log(res.data)
        dispatch({ type: "GET_USER", user: res.data });
      });
  };
}
export function editUser(user) {
  
  return (dispatch) => {
    axios
      .put(`https://movie-app-be-bsn.vercel.app/ users/${localStorage.getItem("id")}`, user)
      .then((res) => {
        localStorage.setItem("user",JSON.stringify(user))
        dispatch({ type: "UPDATE_USER", updated_user: res.data.user});
      });
  };
}
