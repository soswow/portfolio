import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import '@atlaskit/css-reset';

import { PortfolioWebsite } from '../src';

const basename = location.host === 'soswow.github.io' ? '/portfolio' : '';
ReactDOM.render(<BrowserRouter basename={basename}><PortfolioWebsite /></BrowserRouter>, document.getElementById('app'));
