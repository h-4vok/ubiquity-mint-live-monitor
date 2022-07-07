import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { HomePage, LiveMonitorPage } from "./components/pages";
import NotFound from "./components/pages/Errors/404";
import { homeLink, liveMonitorLink } from "./lib/constants";

const Router = ({ children }) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={homeLink} component={HomePage} />
        <Route phat={liveMonitorLink} component={LiveMonitorPage} />
        <Route component={NotFound} />
        {children}
      </Switch>
    </HashRouter>
  );
};

export default Router;
