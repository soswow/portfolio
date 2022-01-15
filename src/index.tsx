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
  Section,
  HeadingItem,
} from '@atlaskit/side-navigation';
import Button, { ButtonGroup } from '@atlaskit/button';
import Toggle from '@atlaskit/toggle';


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
import { getProjectList } from "./data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sortSkills } from "./common";
import { Skill } from "./types";

const SELECTED_SKILLS_STORAGE_KEY = 'sasha-makes-selected-skills';

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
  position: fixed;
  height: 100%;
`;

const contentStyle = css`
  margin-left: 260px
`;

const navFormStyle = css`
  margin: 0 8px;
`;

const skillFilterToggleRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const skillFilterButtonsStyle = css`
  margin-top: 5px;
`

type CustomProps = CustomItemComponentProps & { href: string };
const RouteLink = (props: CustomProps) => {
  const {
    children,
    href,
    ...rest
  } = props;

  return <Link to={href} {...rest}>{children}</Link>;
};

export const PortfolioWebsite = () => {
  const { pathname } = useLocation();

  const [skills, skillCount] = useMemo(() => {
    const allSkills: Skill[] = [];
    const skillCount: Partial<Record<Skill, number>> = {};

    getProjectList()
      .forEach(({ skills: projectSkills }) =>
        projectSkills.forEach(skill => {
          if (allSkills.indexOf(skill) === -1) {
            allSkills.push(skill);
          }
          skillCount[skill] = skillCount[skill] === undefined ? 1 : (skillCount[skill] || 0) + 1;
        })
      );
    sortSkills(allSkills);
    return [allSkills, skillCount];
  }, []);

  const storedSelectedSkills = sessionStorage.getItem(SELECTED_SKILLS_STORAGE_KEY);
  const [selectedSkills, setSelectedSkills] = useState(
    storedSelectedSkills && JSON.parse(storedSelectedSkills) ||
    skills
  );

  useEffect(() => {
    sessionStorage.setItem(SELECTED_SKILLS_STORAGE_KEY, JSON.stringify(selectedSkills));
  }, [selectedSkills]);

  const onSkillToggleChange = useCallback((skill: Skill) => () => {
    const newSelectedSkills = [...selectedSkills];
    const index = newSelectedSkills.indexOf(skill);
    if (index > -1) {
      newSelectedSkills.splice(index, 1);
    } else {
      newSelectedSkills.push(skill);
    }
    setSelectedSkills(newSelectedSkills);
  }, [selectedSkills]);

  const onRemoveAllSkills = useCallback(() => {
    setSelectedSkills([]);
  }, []);

  const onSelectAllSkills = useCallback(() => {
    setSelectedSkills([...skills]);
  }, [skills]);

  return (
    <div css={mainWrapperStyle}>
      <div css={navWrapperStyle}>
        <div css={navStyle}>
          <SideNavigation label="project">
            <NavigationHeader>
              <Header iconBefore={<img src="assets/logo.png" width={24} height={24} />} description={"Come and pat my ego"}>Sasha Makes</Header>
            </NavigationHeader>
            <NavigationContent>
              <Section hasSeparator={true}>
                <HeadingItem>Places to visit</HeadingItem>
                <NavigationContent>
                  <CustomItem component={RouteLink} href={URLto.aboutMe} isSelected={pathname.startsWith(URLto.aboutMe)}>About me</CustomItem>
                  <CustomItem component={RouteLink} href={URLto.things} isSelected={pathname.startsWith(URLto.things)}>Things I've made</CustomItem>
                </NavigationContent>
              </Section>
              <Routes>
                <Route path={URLto.things} element={
                  <Section>
                    <HeadingItem>Tags</HeadingItem>
                    <NavigationContent>
                      <i>(Must have one of these skills)</i>
                      <div css={navFormStyle}>
                        {skills.map(skill => (
                          <div css={skillFilterToggleRowStyle}>
                            <label htmlFor={`skill-toggle-${skill}`}>{skill} [{skillCount[skill]}]</label>
                            <Toggle
                              id={`skill-toggle-${skill}`}
                              isChecked={selectedSkills.indexOf(skill) > -1}
                              onChange={onSkillToggleChange(skill)}
                            />
                          </div>
                        ))}
                        <div css={skillFilterButtonsStyle}>
                          <ButtonGroup>
                            <Button spacing="compact" onClick={onRemoveAllSkills}>Remove all</Button>
                            <Button spacing="compact" onClick={onSelectAllSkills}>Select all</Button>
                          </ButtonGroup>
                        </div>
                      </div>
                    </NavigationContent>
                  </Section>
                } />
              </Routes>
            </NavigationContent>
          </SideNavigation>
        </div>
        <div css={contentStyle}>
          <Routes>
            <Route path="/" element={<Navigate to={URLto.things} />} />
            <Route path={URLto.aboutMe} element={<AboutMePage />} />
            <Route path={URLto.things} element={<PortfolioPage selectedSkills={selectedSkills} />} />
            <Route path={URLto.thing} element={<ProjectPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}