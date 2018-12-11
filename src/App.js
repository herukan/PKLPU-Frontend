import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';
import axios from "axios";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Appku extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      token: JSON.parse(localStorage["appState"]).user.auth_token,
      users: []
    };
  }

  _logoutUser = () => {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    // save app state with user date in local storage
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
  };


  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/users/list?token=${this.state.token}`)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          this.setState({ users: json.data.data });
          //alert("Login Successful!");
        } else alert("Login Failed!");
      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
      });
  }

  render() {
    return (
      // <div style={styles}>
      //   <h2>Welcome Home {this.props.user.name} </h2>
      //   <p>List of all users on the system</p>
      //   <ul>{this.state.users.map(user => <ol style={{padding:15,border:"1px solid #cccccc", width:250, textAlign:"left",marginBottom:15,marginLeft:"auto", marginRight:"auto"}}><p>Name: {user.name}</p><p>Email: {user.email}</p><p>NIP: {user.nip}</p></ol>)}</ul>
      //   <button
      //     style={{ padding: 10, backgroundColor: "red", color: "white" }}
      //     onClick={this.props.logoutUser}
      //   >
      //     Logout{" "}
      //   </button>
      // </div>

      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          {/* <Route path="/" name="Home" component={DefaultLayout} /> */}

          <Route
  path='/'
  render={(props) => <DefaultLayout {...props} logoutUser={this.props.logoutUser}
  user={this.props.user} isAuthed={true} />}
/>

        </Switch>
      </HashRouter>
    );
  }
}

export default Appku;
