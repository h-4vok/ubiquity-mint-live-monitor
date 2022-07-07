import React from 'react';
import ReactDOM from 'react-dom/client';
import pkg from '../package.json';
import './index.css';
import './background.css';
import './gradientShadow.css';
import App from './App';
import Loading from './components/common/Loading'
import CacheBuster from 'react-cache-buster';
import reportWebVitals from './reportWebVitals';
import { NFTHandlerProvider } from './lib/nftHandler'

const isProduction = process.env.NODE_ENV === 'production'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CacheBuster
    currentVersion={pkg.version}
    isEnabled={isProduction} //If false, the library is disabled.
    isVerboseMode={false} //If true, the library writes verbose logs to console.
    loadingComponent={<Loading open={true} />} //If not pass, nothing appears at the time of new version check.
  >
    <NFTHandlerProvider>
      <App />
    </NFTHandlerProvider>
  </CacheBuster>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
