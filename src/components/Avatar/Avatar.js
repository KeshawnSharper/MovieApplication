import React, { useState, useEffect } from "react";
import "../Home/Home.scss";
import { makeStyles } from 'tss-react/mui';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { connect } from "react-redux";
import { editUser } from "../../actions/actions";
import { useNavigate } from "react-router-dom";
import "./Avatar.css";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function Avatar(props) {
  const { user, editUser } = props;
  console.log("avatar",user.picture) 
  let [updatedUser, setUpdatedUser] = useState(
user);
  let [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
   
  }, [props.user,props,user.first_name, user.last_name, user.picture,user.user_name]);
  console.log(updatedUser);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenLogOut = () => {
    setOpenLogOut(true);
  };

  const handleCloseLogOut = () => {
    setOpenLogOut(false);
  };
  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
    console.log(updatedUser);
  };
  const uploadFile = (e) => {
    let formData = new FormData();
    formData.append("file", e[0]);
    formData.append("upload_preset", "zdtazmlq");
    setIsLoading(true);

    axios
      .post(`https://api.cloudinary.com/v1_1/di449masi/image/upload`, formData)
      .then((res) => {
        setIsLoading(false);

        setUpdatedUser({
          ...updatedUser,
          picture: res.data.url
        });
      });
  };
  const reset = (e) => {
    setUpdatedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      picture: user.picture
    });
    handleClose();
  };
  const submitEditUser = (e) => {
    e.preventDefault();
    updatedUser.id = localStorage.getItem("id")
    updatedUser.email = localStorage.getItem("email")
    editUser(updatedUser);
    handleClose();
  };
  const logOutBody = (
    <div style={{"position":"absolute",
    "left": "30%",
    "bottom": "50%",
    "backgroundColor":"white",
    "padding":"15px",
    "border":"2px solid black"
    }}  >
      <h3>Are You sure you want to log out ?</h3>
      <div >
      <button style={{"padding":"2px"}} onClick={() => {
        localStorage.clear()
        navigate("/login");
        window.location.reload(false)
      }}>Yes</button>
      <button style={{"padding":"2px"}} onClick={handleCloseLogOut}>No</button>
      </div>
    </div>
  );
  const body = (
    <div style={{"position":"absolute",
    "left": "10%",
    "bottom": "50%",
    "backgroundColor":"gray",
    "width":"70%",
    "padding":"10px",
    "border":"2px solid black"
    }}  className={classes.paper}>
      {isLoading ? (
        <div class="loader"></div>
      ) : (
        <form>
          <div style={{ display: "inline-flex" }}>
            First Name :
            <input
              onChange={(e) => handleChange(e)}
              value={updatedUser.first_name}
              name={"first_name"}
            />
          </div>
          <div style={{ display: "inline-flex" }}>
            Last Name :
            <input
              onChange={(e) => handleChange(e)}
              value={updatedUser.last_name}
              name={"last_name"}
            />
          </div>
          <div style={{ display: "inline-flex" }}>
            User name :
            <input
              onChange={(e) => handleChange(e)}
              value={updatedUser.user_name}
              name={"user_name"}
            />
          </div>
          {user.picture === updatedUser.picture ? (
            <input onChange={(e) => uploadFile(e.target.files)} type="file" />
          ) : (
            <p> Picture uploaded </p>
          )}
          <br />
          <button style={{ marginRight: "200px" }} onClick={reset}>
            Reset{" "}
          </button>
          <button onClick={(e) => submitEditUser(e)}>Submit </button>
        </form>
      )}
    </div>
  );
  return (
    <>
    <div style={{"display":"inline-flex"}}>
    <div className="icon-div">
   
      </div>
      <img
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50px",
        }}
        alt="Avatar Icon"
        className="user-icon"
        
        src={user.picture ? props.user.picture : null}
      />
       <h3 className="nav-text" onClick={handleOpen}>Edit User </h3>
 <h3 className="nav-text" onClick={handleOpenLogOut}>Log Out </h3>
      </div>
     
     
      <Modal
        open={open}
        style={{"marginTop":"-100px"}}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Modal
        open={openLogOut}
        onClose={handleCloseLogOut}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {logOutBody}
      </Modal>

    </>
  );
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (edit) => {
      dispatch(editUser(edit));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
