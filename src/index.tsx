/** @jsx jsx */
import { jsx } from "@emotion/react";
import css from "@emotion/css";
import { colors } from '@atlaskit/theme';
import Page from '@atlaskit/page';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import {
  SideNavigation,
  Section,
  NavigationHeader,
  Header,
  NestableNavigationContent,
  ButtonItem,
  NestingItem,
  Footer,
  NavigationFooter,
  NavigationContent,
  LinkItem,
  CustomItem,
  CustomItemProps,
  CustomItemComponentProps,
} from '@atlaskit/side-navigation';
import {
  Router,
//   BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
//   useRouteMatch
} from "react-router-dom";

import { AboutMePage } from './aboutme-page';
import { PortfolioPage } from './portforlio-page';
import { forwardRef } from "react";
import { ProjectPage } from "./project-page";

const topCss = css`
  padding: 10px;
  height: 100px;
  background: ${colors.N10};
`

const tabsStyle = css`
  background: ${colors.N10};
`

const mainWrapperStyle = css`
  height: 100%;
`;

const navWrapperStyle = css`
  height: 100%;
  display: flex;
  gap: 20px
`;
const navStyle = css`
  width: 240px;
  flex-shrink: 0;
`;


type CustomProps = CustomItemComponentProps & {href: string};
const RouteLink = (props: CustomProps) => {
  const {
    children,
    href,
    ...rest
  } = props;
  
  return <Link to={href} {...rest}>{children}</Link>;
};

export const PortfolioWebsite = () => {
  const {pathname} = useLocation();
  return (
      <div css={mainWrapperStyle}>
        <div css={navWrapperStyle}>
          <div css={navStyle}>
            <SideNavigation label="project">
              <NavigationHeader>
                <Header>Sasha's Portfolio</Header>
              </NavigationHeader>
              <NavigationContent>
                <CustomItem component={RouteLink} href="/about-me" isSelected={pathname == '/about-me'}>About me</CustomItem>
                <CustomItem component={RouteLink} href="/things"  isSelected={pathname == '/things'}>Things I've made</CustomItem>
              </NavigationContent>
            </SideNavigation>
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/things" />} />
              <Route path="/about-me" element={<AboutMePage />} />
              <Route path="/things" element={<PortfolioPage />} />
              <Route path="/things/:projectName" element={<ProjectPage />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}