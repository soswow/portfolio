/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PageHeader from '@atlaskit/page-header';

import { ProjectThumbnail } from './project-thumbnail';
import { getProjectList } from "./data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { loadStorageValue } from "./localStorage";
import { Project, Skill } from "./types";

const GAP = 10;
const ITEM_WIDTH = 300;
const ITEM_BORDER = 1;
const WIDTH = (ITEM_WIDTH + ITEM_BORDER * 2) * 3 + GAP * 2;

const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    max-width: ${WIDTH}px;
    margin-top: 15px;
    gap: ${GAP}px;
    align-items: stretch;
`;

const listingPageStyle = css`
    max-width: ${WIDTH}px;
    margin: 0 auto;
    padding-bottom: 20px;
`

interface Props {
    selectedSkills: Record<Skill, boolean>;
}

export const PortfolioPage = ({
    selectedSkills
}: Props) => {
    const [newItems, setNewItems] = useState<string[]>([]);
    const projectList = useMemo(() => {
        const projects = getProjectList();
        return projects.filter(
            ({ skills }) => skills.reduce<boolean>(
                (memo, skill) => (memo || selectedSkills[skill])
                , false
            )
        );
    }, [selectedSkills]);


    useEffect(() => {
        const storageValue = loadStorageValue();
        const newItems = projectList
            .filter(({ name }) => storageValue.seenProjectNames.indexOf(name) === -1)
            .map(({ name }) => name);

        setNewItems(newItems);
    }, [projectList]);

    const renderThumbnail = useCallback((project: Project) => (
        <ProjectThumbnail
            key={project.name}
            project={project}
            isNew={newItems.indexOf(project.name) > -1}
            isMyFavourite={newItems.length === 0 ? (project.myFavourite || false) : false}
        />
    ), [newItems]);

    projectList.sort((projA, projB) => {
        const seenA = newItems.indexOf(projA.name) > -1 ? 1 : 0;
        const seenB = newItems.indexOf(projB.name) > -1 ? 1 : 0;
        const seenDiff = seenB - seenA;
        const favDiff = Number(projB.myFavourite || false) - Number(projA.myFavourite || false);
        return seenDiff === 0 ? favDiff : seenDiff;
    });

    return (
        <div css={listingPageStyle}>
            <PageHeader>
                Things I've made
            </PageHeader>
            <p>Here is a list of projects I've been working on over the past years. Feel free to click and explore each of them.</p>
            <div css={imagesCountainerStyle}>
                {projectList.map(renderThumbnail)}
            </div>
        </div>
    );
}