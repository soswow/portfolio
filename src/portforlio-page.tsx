/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import PageHeader from '@atlaskit/page-header';

import { Project } from "./types";
import { projectList } from "./data";
import { ProjectPage } from "./project-page";
import { ProjectThumbnail } from './project-thumbnail';


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
    const [openedProject, setOpenedProject] = useState<Project | null>(null);

    const listing = <div css={listingPageStyle}>
        <PageHeader>
            Things I've made
        </PageHeader>
        <p>Here is a list of projects I've been working over past years. Feel free to click and explore each of them.</p>
        <div css={imagesCountainerStyle}>
            {projectList.map(project => 
            <div css={thumbnailStyle}>
                <ProjectThumbnail key={project.name} project={project} onSelect={() => setOpenedProject(project)} />
            </div>)}
        </div>
    </div>;

    if (openedProject) {
        return <ProjectPage project={openedProject} onBack={() => setOpenedProject(null)} />
    } else {
        return listing;
    }
}