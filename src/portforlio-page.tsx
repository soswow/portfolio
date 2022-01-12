/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PageHeader from '@atlaskit/page-header';

import { ProjectThumbnail } from './project-thumbnail';
import { useNavigate, useParams } from "react-router-dom";
import { projectList } from "./data";

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
    const navigate = useNavigate();
    const { projectName } = useParams();

    return (
        <div css={listingPageStyle}>
                <PageHeader>
                    Things I've made
                </PageHeader>
                <p>Here is a list of projects I've been working over past years. Feel free to click and explore each of them.</p>
                <div css={imagesCountainerStyle}>
                    {projectList.map(project =>
                        <div css={thumbnailStyle}>
                            <ProjectThumbnail key={project.name} project={project} onSelect={() => navigate(`/things/${project.name}`)} />
                        </div>)}
                </div>
            </div>
    );
}