import { PureComponent } from "react";
import logo from '../../../logo.svg';
import './Home.css';
import { Monitor } from "../../../lib/monitor";

export class Home extends PureComponent {

  async componentDidMount() {
    console.log(process.env)
    const monitor = new Monitor(process.env.REACT_APP_API_KEY, process.env.REACT_APP_BLOCK_NUMBER);
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

export default Home;