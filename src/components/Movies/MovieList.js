import React, { useState } from "react";
import { makeStyles } from 'tss-react/mui';
import Grid from '@mui/material/Grid';
import MovieCard from "./MovieCard";
import { connect } from "react-redux";

import {
  getNowPlaying,
  getTopRated,
  getPopular,
  getUpcoming,
  getSearch
} from "../../actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const MovieList = (props) => {
  const {
    nowPlaying,
    search,
    popular,
    movieList,
    upcoming,
    topRated,
    favorites,
    recommended,
    changePage,
    page
  } = props;
  const classes = useStyles();
  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={3}></Grid>
        {movieList === "nowPlaying" ? (
          <>
            {nowPlaying[0] ? (
              <>
                {nowPlaying[0].results.slice((page - 1) * 12,(page * 12 - 1) + 1).map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"nowPlaying"} movie={movie} />
                  </Grid>
                ))}
                <div style={{"display":"block","width":"100%"}}>
              <span style={{"marginRight":"5px"}}>Page</span> {range(1,Math.ceil(Number(nowPlaying[0].results.length / 12))).map(i => <span style={{"marginRight":"5px","cursor":"pointer","color":page === i ? "red" : "black"}} onClick={() => changePage(i)}>{i}</span>)}
              </div>
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "popular" ? (
          <>
            {popular[0] ? (
              <>
                {popular[0].results.slice((page - 1) * 12,(page * 12 - 1) + 1).map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"popular"} movie={movie} />
                  </Grid>
                ))}
              <div style={{"display":"block","width":"100%"}}>
              <span style={{"marginRight":"5px"}}>Page</span> {range(1,Math.ceil(Number(popular[0].results.length / 12))).map(i => <span style={{"marginRight":"5px","cursor":"pointer","color":page === i ? "red" : "black"}} onClick={() => changePage(i)}>{i}</span>)}
              </div>
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "upcoming" ? (
          <>
            {upcoming[0] ? (
              <>
                {upcoming[0].results.slice((page - 1) * 12,(page * 12 - 1) + 1).map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard movie={movie} list={"upcoming"} />
                  </Grid>
                ))}
                <div style={{"display":"block","width":"100%"}}>
              <span style={{"marginRight":"5px"}}>Page</span> {range(1,Math.ceil(Number(upcoming[0].results.length / 12))).map(i => <span style={{"marginRight":"5px","cursor":"pointer","color":page === i ? "red" : "black"}} onClick={() => changePage(i)}>{i}</span>)}
              </div>
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "topRated" ? (
          <>
            {topRated[0] ? (
              <>
                {topRated[0].results.slice((page - 1) * 12,(page * 12 - 1) + 1).map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"topRated"} movie={movie} />
                  </Grid>
                ))}
                 <div style={{"display":"block","width":"100%"}}>
              <span style={{"marginRight":"5px"}}>Page</span> {range(1,Math.ceil(Number(topRated[0].results.length / 12))).map(i => <span style={{"marginRight":"5px","cursor":"pointer","color":page === i ? "red" : "black"}} onClick={() => changePage(i)}>{i}</span>)}
              </div>
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "search" ? (
          <>
            {search[0] ? (
              <>
                {search ? search[0].results.slice((page - 1) * 12,(page * 12 - 1) + 1).map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"search"} movie={movie} />
                  </Grid>
                )) : null}
              </>
            ) : (
              <div></div>
            )}
             <div style={{"display":"block","width":"100%"}}>
               {search[0] ? (
                 <>
              <span style={{"marginRight":"5px"}}>Page</span> {range(1,Math.ceil(Number(search[0].results.length / 12))).map(i => <span style={{"marginRight":"5px","cursor":"pointer","color":page === i ? "red" : "black"}} onClick={() => changePage(i)}>{i}</span>)}
               </>
               )
              :
              null
               }
              </div>
          </>
        ) : movieList === "favorites" ? (
          <>
            {favorites ? (
              <>
                {favorites.slice((page - 1) * 12,(page * 12 - 1) + 1).map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"favorites"} movie={movie} />
                  </Grid>
                ))}
                <div style={{"display":"block","width":"100%"}}>
              <span style={{"marginRight":"5px"}}>Page</span> {range(1,Math.ceil(Number(favorites.length / 12))).map(i => <span style={{"marginRight":"5px","cursor":"pointer","color":page === i ? "red" : "black"}}onClick={() => changePage(i)}>{i}</span>)}
              </div>
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : movieList === "recommended" ? (
            
          <>
            {recommended ? (
              <>
                {recommended.slice((page - 1) * 12,(page * 12 - 1) + 1).map((movie) => (
                  <Grid item xs={12} md={4} spacing={12}>
                    <MovieCard list={"recommended"} movie={movie} />
                  </Grid>
                ))}
                <div style={{"display":"block","width":"100%"}}>
              <span style={{"marginRight":"5px"}}>Page</span> {range(1,Math.ceil(Number(recommended.length / 12))).map(i => <span style={{"marginRight":"5px","cursor":"pointer","color":page === i ? "red" : "black"}} onClick={() => changePage(i)}>{i}</span>)}
              </div>
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    user: state.user,
    nowPlaying: state.nowPlaying,
    popular: state.popular,
    upcoming: state.upcoming,
    topRated: state.topRated,
    search: state.search,
    favorites: state.favorites,
    recommended: state.recommended
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getNowPlaying: (id) => {
      dispatch(getNowPlaying());
    },
    getPopular: (id) => {
      dispatch(getPopular());
    },
    getUpcoming: (id) => {
      dispatch(getUpcoming());
    },
    getTopRated: (id) => {
      dispatch(getTopRated(id));
    },
    getSearch: (id) => {
      dispatch(getSearch(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
