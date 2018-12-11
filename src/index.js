import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "./polyfill";
import React from "react";
// import ReactDOM from 'react-dom';
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";

import { render } from "react-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import $ from "jquery";
import { DefaultLayout } from "./containers";
import Appku from "./App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//DEFAULT COREUI ONLY THIS
// ReactDOM.render(<App />, document.getElementById('root'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.notifydel = this.notifydel.bind(this);
    this.notify = this.notify.bind(this);

    this.state = {
      isLoggedIn: false,
      user: [],
      nama: "",
      id: "",
      nip: "",
      email: ""
    };
  }

  notifydel = string => {
    toast.error(string, {
      position: toast.POSITION.BOTTOM_CENTER,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  notify = string => {
    toast.success(string, {
      position: toast.POSITION.BOTTOM_CENTER,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  _loginUser = (email, password) => {
    $("#login-form button")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost:8000/api/user/login/", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          // alert("Login Successful!");

          this.setState({
            nama: json.data.data.name,
            id: json.data.data.id,
            nip: json.data.data.nip,
            email: json.data.data.email
          });

          // alert("Welcome!"+json.data.data.name);

          toast("Selamat Datang " + json.data.data.name, {
            position: toast.POSITION.BOTTOM_CENTER,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            nip: json.data.data.nip,
            email: json.data.data.email,
            auth_token: json.data.data.auth_token,
            timestamp: new Date().toString()
          };

          let appState = {
            isLoggedIn: true,
            user: userData
          };

          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
        } else {
          this.notifydel("Login gagal, email atau password salah!");
          // alert("Login Failed!");
        }

        $("#login-form button")
          .removeAttr("disabled")
          .html("Login");
      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
        $("#login-form button")
          .removeAttr("disabled")
          .html("Login");
      });
  };

  _registerUser = (name, email, password, nip) => {
    $("#email-login-btn")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );

    var formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("nip", nip);

    axios
      .post("http://localhost:8000/api/user/register", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert(`Registration Successful!`);

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            auth_token: json.data.data.auth_token,
            timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
        } else {
          alert(`Registration Failed!`);
          $("#email-login-btn")
            .removeAttr("disabled")
            .html("Register");
        }
      })
      .catch(error => {
        alert("An Error Occured!" + error);
        console.log(`${formData} ${error}`);
        $("#email-login-btn")
          .removeAttr("disabled")
          .html("Register");
      });
  };

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
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      console.log("INI" + AppState);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
    }
  }

  render() {
    document.getElementById("root");
    console.log(this.state.isLoggedIn);
    console.log("path name: " + this.props.location.pathname);
    if (
      !this.state.isLoggedIn &&
      this.props.location.pathname !== "/login" &&
      this.props.location.pathname !== "/register"
    ) {
      // this.notifydel("you are not loggedin and are not visiting login or register, so go to login page");
      console.log(
        "you are not loggedin and are not visiting login or register, so go to login page"
      );
      this.props.history.push("/login");
    }
    if (
      this.state.isLoggedIn &&
      (this.props.location.pathname === "/login" ||
        this.props.location.pathname === "/register")
    ) {
      // this.notifydel("you are either going to login or register but youre logged in");
      console.log(
        "you are either going to login or register but youre logged in"
      );
      this.props.history.push("/");
    }
    return (
      <Switch data="data">
        <div id="main">
          <ToastContainer />
          {/* <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  logoutUser={this._logoutUser}
                  user={this.state.user}
                />
              )}
            /> */}

          <Route
            exact
            path="/"
            render={props => (
              <Appku
                {...props}
                nama={this.state.nama}
                id={this.state.id}
                nip={this.state.nip}
                email={this.state.email}
                logoutUser={this._logoutUser}
                user={this.state.user}
              />
            )}
          />

          <Route
            path="/login"
            render={props => <Login {...props} loginUser={this._loginUser} />}
          />

          <Route
            path="/register"
            render={props => (
              <Register {...props} registerUser={this._registerUser} />
            )}
          />
        </div>
      </Switch>

      // <HashRouter>
      //   <Switch>
      //     <Route exact path="/login" name="Login Page" component={Login} />
      //     <Route exact path="/register" name="Register Page" component={Register} />
      //     <Route exact path="/404" name="Page 404" component={Page404} />
      //     <Route exact path="/500" name="Page 500" component={Page500} />
      //     <Route path="/" name="Home" component={DefaultLayout} />
      //   </Switch>
      // </HashRouter>
    );
  }
}

const AppContainer = withRouter(props => <App {...props} />);
// console.log(store.getState())
render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
