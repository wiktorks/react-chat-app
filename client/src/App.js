import React from "react";
// import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import MainView from "./components/Main/MainView";
import Registration from "./components/Authentication/Registration";

const App = () => (
    <Router>
      <Route path="/" exact component={MainView} />
      <Route path="/registration" exact component={Registration} />
    </Router>
);

export default App;