/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { Project } from "./types";
import { projectList } from "./data";
import { ProjectPage } from "./project-page";
import { ProjectThumbnail } from './project-thumbnail';


const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 915px;
`;

const thumbnailStyle = css`
    padding: 5px 5px 0 0;
`;

export const PortfolioPage = () => {
    const [openedProject, setOpenedProject] = useState<Project | null>(null);

    const listing = <div css={imagesCountainerStyle}>
        {projectList.map(project => 
        <div css={thumbnailStyle}>
            <ProjectThumbnail key={project.name} project={project} onSelect={() => setOpenedProject(project)} />
        </div>)}
    </div>

    if (openedProject) {
        return <ProjectPage project={openedProject} onBack={() => setOpenedProject(null)} />
    } else {
        return listing;
    }
}