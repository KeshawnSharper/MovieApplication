import React, { useEffect} from "react";
import "./styles.css";
import Home from "./components/Home/Home";
import Login from "./components/Authenication/Login";
import Register from "./components/Authenication/Register";
import { useNavigate } from "react-router-dom";

import {
  getNowPlaying,
  getTopRated,
  getPopular,
  getUpcoming,
  getFavorites,
  getUser
} from "./actions/actions";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { connect } from "react-redux";
function App(props) {
  useEffect(() => {
    console.log("App", props);

    props.getNowPlaying();
    props.getPopular();
    props.getUpcoming();
    props.getTopRated();
    if (localStorage.getItem("id")){
      props.getFavorites();
      props.getUser();
    }
  }, [localStorage.getItem("user")]);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* <Provider> */}
          <Route exact path="/" element={localStorage.getItem("token")  ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )}
/>
          <Route exact path="/register" element={<Register />}>
            
          </Route>
          <Route exact path="/login" element={<Login />}>
          </Route>
          <Route exact path="/home" element={<Home />} />

          {/* <Route exact path="/search/:num" component={Search} />
    //     <Route exact path="/product/:num" component={Product} /> */}
        {/* </Provider> */}
        </Routes>

      </BrowserRouter>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    user: state.user,
    nowPlaying: state.nowPlaying,
    upcoming: state.upcoming,
    topRated: state.topRated,
    favorites: state.favorites,
    recommended: state.recommended
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getNowPlaying: () => {
      dispatch(getNowPlaying());
    },
    getPopular: () => {
      dispatch(getPopular());
    },
    getUpcoming: () => {
      dispatch(getUpcoming());
    },
    getTopRated: () => {
      dispatch(getTopRated());
    },
    getFavorites: () => {
      dispatch(getFavorites());
    },
    getUser: () => {
      dispatch(getUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
