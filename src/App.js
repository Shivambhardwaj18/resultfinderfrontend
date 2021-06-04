import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/Home";

const App = () => {
  let routes = (
    <Switch>
      <Route for="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
