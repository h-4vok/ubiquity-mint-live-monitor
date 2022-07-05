import { PureComponent } from "react";
import logo from './logo.svg';
import './App.css';
import { Monitor } from "./monitor";

export class App extends PureComponent {

  async componentDidMount() {
    const monitor = new Monitor(process.env.REACT_APP_API_KEY);
    await monitor.start();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
