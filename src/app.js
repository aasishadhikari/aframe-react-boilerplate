import {render} from 'react-dom';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';


const appContainer = document.getElementById('app');


const app = <BrowserRouter><App basePath={config.basePath} /></BrowserRouter>;


render(app, appContainer);
