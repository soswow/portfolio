/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { ProjectPage } from "./project-page";
import { ProjectThumbnail } from './project-thumbnail';

// interface Props {
// }
interface Project {
    name: string
}

const projectList: Project[] = [
    {
        name: 'mandalorian-helmet',
    },
    {
        name: 'halo-plasma-blaster',
    },
]

const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 600px;
`;

const thumbnailStyle = css`
    padding: 5px;
`;

export const PortfolioPage = () => {
    const [openedProject, setOpenedProject] = useState<string | null>(null);

    const listing = <div css={imagesCountainerStyle}>
        {projectList.map(({ name }) => 
        <div css={thumbnailStyle}>
            <ProjectThumbnail key={name} projectName={name} onSelect={() => setOpenedProject(name)} />
        </div>)}
    </div>

    if (openedProject) {
        return <ProjectPage projectName={openedProject} onBack={() => setOpenedProject(null)} />
    } else {
        return listing;
    }
}