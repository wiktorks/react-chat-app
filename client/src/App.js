import React from "react";
// import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import MainView from "./components/Main/MainView";
import Registration from "./components/Authentication/Registration";
import Login from "./components/Authentication/Login";
import Chat from "./components/ChatView/Chat/Chat";

const App = () => (
    <Router>
      <Route path="/" exact component={MainView} />
      <Route path="/registration" exact component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/chat" exact component={Chat} />


    </Router>
);

export default App;