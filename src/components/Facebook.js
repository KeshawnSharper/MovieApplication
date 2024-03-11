import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

export default class Facebook extends Component {
  constructor(props){
    super(props)
    this.SubmitFacebookUser = this.props.SubmitFacebookUser()
    this.responseFacebook = this.responseFacebook.bind(this)
  }
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };
  componentClicked = (response) => {
    console.log(response);
   
  };
  responseFacebook = (response) => {
    localStorage.setItem("Facebook_Temp_User",JSON.stringify(response))
    this.props.SubmitFacebookUser();
    // console.log(response);
  };
  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="607120073633986"
          buttonText="Facebook"
          height="50%"
          autoLoad={true}
          fields="name,email,picture"
          callback={(response) => this.responseFacebook(response)}
        />
      );
    }
    return <div style={{ width: "50%", height: "50%" }}>{fbContent}</div>;
  }
}
