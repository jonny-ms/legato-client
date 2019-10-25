import React, { Component } from "react";
import "./App.css";
import Nav from "./components/_nav";
import About from "./About";
import Search from "./Search";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/Search" component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
