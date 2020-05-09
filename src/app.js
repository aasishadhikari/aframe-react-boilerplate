import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import config from './config/general';

const appContainer = document.getElementById('app');

const app = (
  <BrowserRouter>
    <App basePath={config.basePath} />
  </BrowserRouter>
);

render(app, appContainer);
