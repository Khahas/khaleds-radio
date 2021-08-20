import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Channels from "./components/Channels.js";
import Navbar from "./components/Navbar.js";
import Login from "./components/Login";
import Landingpage from "./components/Landingpage";
import Category from "./components/Category";
import Favorite from "./components/Favorite";
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken();
 
  return (
    <div className="wrapper">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/channels">
            <Channels />
          </Route>
          <Route exact path="/category">
            <Category />
          </Route>
          <Route exact path="/favorite">
            <Favorite />
          </Route> 
          <Route exact path="/login">
          <Login setToken={setToken} />
          </Route>
          <Route exact path="/">
            <Landingpage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
