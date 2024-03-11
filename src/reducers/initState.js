const initState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
  nowPlaying: [],
  popular: [],
  comingSoon: [],
  upcoming: [],
  topRated: [],
  search: [],
  movieInfo: {},
  favorites: [],
  recommended: [],
  favorite_obj:{}
};
export default initState;
