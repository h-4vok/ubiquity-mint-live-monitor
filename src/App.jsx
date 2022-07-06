import { PureComponent } from "react";
import { Container } from '@mui/material';
import Router from "./Router";

export class App extends PureComponent {
  render() {
    return (
      <>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <Container className="content">
          <Router />
        </Container>
      </>
    );
  }
}

export default App;
