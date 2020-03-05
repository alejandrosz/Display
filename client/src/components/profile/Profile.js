import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Profile.scss";

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { isSignup: false };
  // }

  // componentDidMount() {
  //   this.setState({
  //     user: this.props.user.username
  //   });
  // }

  render() {
    console.log("user", this.props);
    if (this.props.user) {
      return (
        <div className="Profile-style">
          <div className="Profile-top">
            <h1>perfil de {this.props.user.username}</h1>
            <Link to="/">
              <h1>X</h1>
            </Link>
          </div>
          <div className="Profile-body">
            <p>texto dentro del perfil de {this.props.user.username}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Profile-style">
          <div className="Profile-top">
            <h1>perfil de hola</h1>
            <Link to="/">
              <h1>X</h1>
            </Link>
          </div>
          <div className="Profile-body">
            <p>texto dentro del perfil de </p>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
