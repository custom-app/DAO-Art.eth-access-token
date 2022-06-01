import React from 'react';
import ReactDOM from 'react-dom/client';
import "antd/dist/antd.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MoralisProvider} from 'react-moralis'
import AppThemeProvider from './theme/app-theme-provider';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppThemeProvider>
      {
        APP_ID && SERVER_URL && (
          <MoralisProvider
            appId={APP_ID}
            serverUrl={SERVER_URL}
          >
            <App/>
          </MoralisProvider>
        )
      }
    </AppThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
