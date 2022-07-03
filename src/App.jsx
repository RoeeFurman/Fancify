import React from "react";

import {
  HashRouter,
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen.jsx";
import { HomePage } from "./pages/HomePage.jsx";
const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Router>
          <Switch>
            <Route path="/screen" component={HomeScreen} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </HashRouter>
    </div>
  );
};

export default App;
