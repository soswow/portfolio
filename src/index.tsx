/** @jsx jsx */
import { jsx } from "@emotion/react";
import css from "@emotion/css";
import {colors} from '@atlaskit/theme';
import Page from '@atlaskit/page';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import { AboutMePage } from './aboutme-page';
import { PortfolioPage } from './portforlio-page';

const topCss = css`
  padding: 10px;
  height: 100px;
  background: ${colors.N10};
`

const tabsStyle = css`
  background: ${colors.N10};
`

export const PortfolioWebsite = () => {
  return (
    <Page>
      <div css={topCss}>
        <h1>Sasha's Portfolio</h1>
      </div>
      <Tabs
          id="portfolio-tabs"
          defaultSelected={1}
        >
          <div css={tabsStyle}>
          <TabList>
            <Tab>About me</Tab>
            <Tab>Things I've made</Tab>
          </TabList> 
          </div>
          <TabPanel>
            <AboutMePage />
          </TabPanel>
          <TabPanel>
            <PortfolioPage />
          </TabPanel>
        </Tabs>
    </Page>
  );
}