/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PageHeader from '@atlaskit/page-header';

import { ProjectThumbnail } from './project-thumbnail';
import { getProjectList } from "./data";
import { useCallback, useEffect, useMemo, useState } from "react";
import { loadStorageValue } from "./localStorage";

const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 915px;
    margin-top: 15px;
`;

const listingPageStyle = css`
    width: 915px;
    margin: 0 auto;
`

const thumbnailStyle = css`
    padding: 5px 5px 0 0;
`;

export const PortfolioPage = () => {
    const [newItems, setNewItems] = useState<string[]>([]);
    const [projectList] = useState(getProjectList());

    useEffect(() => {
        const storageValue = loadStorageValue();
        const newItems = projectList
            .filter(({name}) => storageValue.seenProjectNames.indexOf(name) === -1)
            .map(({name}) => name);

        setNewItems(newItems);
    }, [projectList]);

    const renderThumbnail = useCallback(project => (
        <div css={thumbnailStyle}>
            <ProjectThumbnail key={project.name} project={project} isNew={newItems.indexOf(project.name) > -1} />
        </div>
    ), [newItems]);
    
    projectList.sort((A, B) => {
        const seenA = newItems.indexOf(A.name) > -1 ? 1 : 0;
        const seenB = newItems.indexOf(B.name) > -1 ? 1 : 0;
        return seenB - seenA;
    });

    return (
        <div css={listingPageStyle}>
            <PageHeader>
                Things I've made
            </PageHeader>
            <p>Here is a list of projects I've been working over past years. Feel free to click and explore each of them.</p>
            <div css={imagesCountainerStyle}>
                {projectList.map(renderThumbnail)}
            </div>
        </div>
    );
}