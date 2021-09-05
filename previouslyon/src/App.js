import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import Login from "./components/auth/Login";
import News from "./components/News/News";
import FriendsList from "./components/Friends/FriendsList";
import Allseries from "./components/Series/Allseries";
import Allmovies from "./components/Movies/Allmovies";
import Series from "./components/Series/Series";
import Movies from "./components/Movies/Movies";
import Profil from "./components/Profil/Profil";
import Error from "./components/Error";

import MoviesUser from "./components/Movies/MoviesUser";
import SeriesUser from "./components/Series/SeriesUser";


export default class App extends React.Component {
  state = {
      total: null,
      next: null,
      operation: null,
  };

  render() {
      return (
          <div>
              <Router>
                  <div>
                      <NavBar/>
                        <Switch>
                          <Route path="/error" component={Error} />
                          <Route exact path="/" component={Home} />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/profil" component={Profil} />
                          <Route exact path="/friendslist" component={FriendsList} />
                          <Route path="/news/:numberOfSeries/:tailored" component={News} />
                          <Route path="/shows/:id" component={Series} />
                          <Route path="/movies/:id" component={Movies} />
                          <Route path="/mymovies" component={MoviesUser} />
                          <Route path="/myshows" component={SeriesUser} />
                          <Route path="/series" component={Allseries} />
                          <Route path="/allmovies" component={Allmovies} />
                      </Switch>
                  </div>
                  <Footer/>
              </Router>
          </div>
      )
  }
}