import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MoralisProvider} from 'react-moralis'
import AppThemeProvider from './theme/app-theme-provider';
import {AuthModalContextProvider} from './components/web3/Account/auth-modal-context';
import Moralis from 'moralis';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

Moralis.start({
  appId: APP_ID,
  serverUrl: SERVER_URL
}).then(() => {
  root.render(
    <React.StrictMode>
      {
        APP_ID && SERVER_URL && (
          <MoralisProvider
            appId={APP_ID}
            serverUrl={SERVER_URL}
          >
            <AppThemeProvider>
              <AuthModalContextProvider>
                <App/>
              </AuthModalContextProvider>
            </AppThemeProvider>
          </MoralisProvider>
        )
      }
    </React.StrictMode>
  );
  // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})
