import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { Home } from "./components/pages/Home";
import NotFound from "./components/pages/Errors/404";
import { homeLink } from "./lib/constants";

const Router = ({ children }) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={homeLink} component={Home} />
        <Route component={NotFound} />
        {children}
      </Switch>
    </HashRouter>
  );
};

export default Router;