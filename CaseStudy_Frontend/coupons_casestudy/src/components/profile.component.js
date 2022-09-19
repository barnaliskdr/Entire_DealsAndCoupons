import React, { Component } from "react";
import AuthService from "../services/auth.service";
import "./profile.component.css"
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="profileback">
      <br></br>
      <br></br>
      <br></br>
      <center><div className="basedesign"  style={{justifyContent: 'center'}}>
        <header className="jumbotron">
          <h3>
            <strong style={{color:"Highlight", fontFamily:"cursive", color:"brown"}}>{currentUser.username}</strong> Profile
          </h3>
        </header>
        {/* <p>
          <strong style={{color:"Highlight"}}>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
        <p>
          <strong style={{color:"Highlight"}}>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong style={{color:"Highlight"}}>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong style={{color:"Highlight"}}>Authorities:</strong>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </div>
        </center>
      </div>
    );
  }
}