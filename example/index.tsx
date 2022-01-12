import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import '@atlaskit/css-reset';

import { PortfolioWebsite } from '../src';

ReactDOM.render(<BrowserRouter><PortfolioWebsite /></BrowserRouter>, document.getElementById('app'));
