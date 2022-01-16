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
import FolderFilledIcon from '@atlaskit/icon/glyph/folder-filled';
import PersonIcon from '@atlaskit/icon/glyph/person';

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
  flex-shrink: 0;
  position: fixed;
  height: 100%;
  z-index: 10;
  > nav {
    min-width: 0;
  }
  @media screen and (max-width: 1160px) {
    > nav a {
      padding-right: 2px;
      padding-left: 2px;
    }
  }

  width: 60px;
  @media screen and (min-width: 1160px) {
    width: 240px;
  }
`;

const contentStyle = css`
  margin-left: 80px;
  @media screen and (min-width: 1160px) {
    margin-left: 260px;
  }
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

const navSectionHeaderButtonStyle = css`
  float: right;
  margin-top: -2px;
`;

const hideWhenSmallStyle = css`
  @media screen and (max-width: 1160px) {
    display: none;
  }
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
  const allSkillsSelectedRecord = Object.fromEntries(skills.map(skill => [skill, true])) as Record<Skill, boolean>;
  const [selectedSkills, setSelectedSkills] = useState<Record<Skill, boolean>>(
    storedSelectedSkills && JSON.parse(storedSelectedSkills) ||
    allSkillsSelectedRecord
  );

  useEffect(() => {
    sessionStorage.setItem(SELECTED_SKILLS_STORAGE_KEY, JSON.stringify(selectedSkills));
  }, [selectedSkills]);

  const onSkillToggleChange = useCallback((skill: Skill) => () => {
    selectedSkills[skill] = !selectedSkills[skill];
    setSelectedSkills({ ...selectedSkills });
  }, [selectedSkills]);

  const onRemoveAllSkills = useCallback(() => {
    setSelectedSkills({ ...Object.fromEntries(skills.map(skill => [skill, false])) as Record<Skill, boolean> });
  }, []);

  const onSelectAllSkills = useCallback(() => {
    setSelectedSkills({ ...allSkillsSelectedRecord });
  }, [skills]);

  const areAllSkillsSelected = Object.values(selectedSkills).reduce((memo: boolean, bool: boolean) => memo && bool, true);
  const [isSkillFiltersOpen, setIsSkillFiltersOpen] = useState(!areAllSkillsSelected);

  const toggleSkillsFilterVisibility = useCallback(() => {
    setIsSkillFiltersOpen(!isSkillFiltersOpen);
  }, [isSkillFiltersOpen]);

  return (
    <div css={mainWrapperStyle}>
      <div css={navWrapperStyle}>
        <div css={navStyle}>
          <SideNavigation label="project">
            <NavigationHeader>
              <Header iconBefore={<img src="/assets/logo.png" width={24} height={24} />} description={<div css={hideWhenSmallStyle}>Come and pat my ego 😜</div>}><div css={hideWhenSmallStyle}>Sasha Makes</div></Header>
            </NavigationHeader>
            <NavigationContent>
              <Section hasSeparator={true}>
                <div css={hideWhenSmallStyle}>
                  <HeadingItem>Places to visit</HeadingItem>
                </div>
                <NavigationContent>
                  <CustomItem iconBefore={<PersonIcon label="about-me-page" />} component={RouteLink} href={URLto.aboutMe} isSelected={pathname.startsWith(URLto.aboutMe)}><div css={hideWhenSmallStyle}>About me</div></CustomItem>
                  <CustomItem iconBefore={<FolderFilledIcon label="things-page" />} component={RouteLink} href={URLto.things} isSelected={pathname.startsWith(URLto.things)}><div css={hideWhenSmallStyle}>Things I've made</div></CustomItem>
                </NavigationContent>
              </Section>
              <Routes>
                <Route path={URLto.things} element={

                  <Section>
                    <div css={hideWhenSmallStyle}>
                      <HeadingItem>Skill filters <div css={navSectionHeaderButtonStyle}><Button spacing="compact" onClick={toggleSkillsFilterVisibility}>{isSkillFiltersOpen ? "Hide" : "Show"}</Button></div></HeadingItem>
                    </div>
                    {isSkillFiltersOpen ?
                      <div css={hideWhenSmallStyle}>
                        <NavigationContent>
                          <i>(Must have one of these skills)</i>
                          <div css={navFormStyle}>
                            {skills.map(skill => (
                              <div css={skillFilterToggleRowStyle}>
                                <label htmlFor={`skill-toggle-${skill}`}>{skill} [{skillCount[skill]}]</label>
                                <Toggle
                                  id={`skill-toggle-${skill}`}
                                  isChecked={selectedSkills[skill]}
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
                      </div>
                      : null}
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