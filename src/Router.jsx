import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import NotFound from "./components/pages/Errors/404";
import { homeLink } from "./lib/constants";

const Router = ({ children }) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={homeLink} component={HomePage} />
        <Route component={NotFound} />
        {children}
      </Switch>
    </HashRouter>
  );
};

export default Router;
