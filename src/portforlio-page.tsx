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
]


const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 600px;
`;

export const PortfolioPage = () => {
    const [openedProject, setOpenedProject] = useState<string | null>(null);

    const listing = <div css={imagesCountainerStyle}>
        {projectList.map(({ name }) => <ProjectThumbnail key={name} projectName={name} onSelect={() => setOpenedProject(name)} />)}
    </div>

    if (openedProject) {
        return <ProjectPage projectName={openedProject} onBack={() => setOpenedProject(null)} />
    } else {
        return listing;
    }
}