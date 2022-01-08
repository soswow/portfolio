/** @jsx jsx */
import { jsx } from "@emotion/react";
import {GHCorner} from 'react-gh-corner';
import {PortfolioWebsite} from '../src';

const repoUrl = 'https://github.com/';

const App = () => {
  return (
    <div>
      <GHCorner openInNewTab href={repoUrl} />
      <PortfolioWebsite />
    </div>
  )
}

export default App