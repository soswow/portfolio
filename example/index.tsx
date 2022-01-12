import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import '@atlaskit/css-reset';

import { PortfolioWebsite } from '../src';

ReactDOM.render(<HashRouter><PortfolioWebsite /></HashRouter>, document.getElementById('app'));
