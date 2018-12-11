import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import axios from "axios";

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      token: JSON.parse(localStorage["appState"]).user.auth_token,
      user: {}
    };
  }

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
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader {...this.props} user={this.props.user} logoutUser={this.props.logoutUser}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} logoutUser={this.props.logoutUser}
                        user={this.props.user} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
               {/* <div >
        <h2>Welcome Home {"\u2728"}</h2>
        <p>List of all users on the system</p>
        <ul>{this.state.users.map(user => <ol style={{padding:15,border:"1px solid #cccccc", width:250, textAlign:"left",marginBottom:15,marginLeft:"auto", marginRight:"auto"}}><p>Name: {user.name}</p><p>Email: {user.email}</p><p>NIP: {user.nip}</p></ol>)}</ul>
        <button
          style={{ padding: 10, backgroundColor: "red", color: "white" }}
          onClick={this.props.logoutUser}
        >
          Logout{" "}
        </button>
      </div> */}
            </Container>
          </main>
          <AppAside fixed>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
