import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { HomePage, LiveMonitorPage } from "./components/pages";
import NotFound from "./components/pages/Errors/404";
import { homeLink, liveMonitorLink } from "./lib/constants";
import { createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Router = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <Switch>
          <Route exact path={homeLink} component={HomePage} />
          <Route phat={liveMonitorLink} component={LiveMonitorPage} />
          <Route component={NotFound} />
          {children}
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Router;
