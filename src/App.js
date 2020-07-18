import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Comic from "./components/comic.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div className="justin-background">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to={"/comic/search"} className="nav-link">
                  Search
                </NavLink>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <NavLink to={"/mod"} className="nav-link">
                    Moderator Board
                  </NavLink>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <NavLink to={"/comic/admin"} className="nav-link">
                    Add Comics
                  </NavLink>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <NavLink to={"/wantlist"} className="nav-link">
                    Wantlist
                  </NavLink>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to={"/register"} className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/comic/search"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/wantlist" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route exact path="/comic/admin" component={BoardAdmin} />
              <Route path="/comic/admin/:id" component={Comic} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;