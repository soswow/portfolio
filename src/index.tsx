/** @jsx jsx */
import { jsx } from "@emotion/react";
import css from "@emotion/css";
import { colors } from '@atlaskit/theme';
import {
  SideNavigation,
  NavigationHeader,
  Header,
  NavigationContent,
  CustomItem,
  CustomItemComponentProps,
} from '@atlaskit/side-navigation';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AboutMePage } from './aboutme-page';
import { PortfolioPage } from './portforlio-page';
import { ProjectPage } from "./project-page";
import { URLto } from "./urlto";

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
  console.log(pathname);
  
  return (
      <div css={mainWrapperStyle}>
        <div css={navWrapperStyle}>
          <div css={navStyle}>
            <SideNavigation label="project">
              <NavigationHeader>
                <Header>Sasha's Portfolio</Header>
              </NavigationHeader>
              <NavigationContent>
                <CustomItem component={RouteLink} href={URLto.aboutMe} isSelected={pathname.startsWith(URLto.aboutMe)}>About me</CustomItem>
                <CustomItem component={RouteLink} href={URLto.things}  isSelected={pathname.startsWith(URLto.things)}>Things I've made</CustomItem>
              </NavigationContent>
            </SideNavigation>
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to={URLto.things} />} />
              <Route path={URLto.aboutMe} element={<AboutMePage />} />
              <Route path={URLto.things} element={<PortfolioPage />} />
              <Route path={URLto.thing} element={<ProjectPage />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}