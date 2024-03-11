import React from "react";
import GoogleLogin from "@leecheuk/react-google-login";
// import firebase from "./config";

export default class Google extends React.Component {
  // The component's Local state.
  

  responseGoogle = (response) => {
    console.log(response)
    localStorage.setItem("google_temp_user",JSON.stringify(response))
    this.props.SubmitGoogleUser();
  };
  render() {
    return (
      <div>
        <GoogleLogin
          clientId="745854033473-bi5dc7madr0oonlt24b8cpd2nu5qh3au.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}
