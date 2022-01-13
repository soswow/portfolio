/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { FileIdentifier, MediaCollectionItem } from '@atlaskit/media-client';
import { Card } from '@atlaskit/media-card';
import { colors } from "@atlaskit/theme";
import { SimpleTag } from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import Spinner from '@atlaskit/spinner';
import Lozenge from '@atlaskit/lozenge';
import CommentIcon from '@atlaskit/icon/glyph/comment';
import Badge from '@atlaskit/badge';
import { CommentCount } from 'disqus-react';

import { config, findProjectCover } from './media-api';
import { Project, statusToLozengeAppearanceMap } from "./types";
import { generatePath, useNavigate } from "react-router-dom";
import { URLto } from "./urlto";


interface Props {
    project: Project;
}

const wrapperStyle = css`
    width: 300px;
    border: 1px solid ${colors.N40};
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const cardWrapper = css`
    margin: -5px;
    * {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
`

const cardPreloaderWrapper = css`
    width: 298px;
    height: 200px;
    background: ${colors.N20};
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: -5px;
`;

const titleStyle = css`
    
`;

const titleRowStyle = css`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

const tagGroupWrapperStyle = css`
    margin-top: 15px;
`;

const badgesStyle = css`
    display: flex;
    align-items: center;
`

export const ProjectThumbnail = ({ project: {
    name,
    title,
    status,
    skills,
    shortSummary
} }: Props) => {
    const navigate = useNavigate();
    const [coverItem, setCoverItem] = useState<MediaCollectionItem | null>(null);

    const fetchCoverItem = async () => {
        setCoverItem(await findProjectCover(name));
    }

    const getFileIdentifier = (id: string): FileIdentifier => ({
        mediaItemType: 'file',
        id,
        collectionName: name,
    });

    useEffect(() => {
        fetchCoverItem();
    })

    return <div css={wrapperStyle}>
        {coverItem ?
            <div css={cardWrapper}>
                <Card
                    mediaClientConfig={config}
                    identifier={getFileIdentifier(coverItem.id)}
                    onClick={() => navigate(generatePath(URLto.thing, { projectName: name }))}
                    disableOverlay={true}
                    dimensions={{
                        width: 298,
                        height: 200,
                    }}
                />
            </div>
            : <div css={cardPreloaderWrapper}><Spinner /></div>}

        <div css={titleRowStyle}>
            <h3>{title}</h3>
            <Lozenge appearance={statusToLozengeAppearanceMap[status]} isBold={status === 'Done'} >{status}</Lozenge>
        </div>
        <p>{shortSummary}</p>
        <div css={tagGroupWrapperStyle}>
            <TagGroup>
                {skills.map(skill => <SimpleTag key={skill} text={skill} />)}
            </TagGroup>
        </div>
        <div css={badgesStyle}>
            <CommentIcon label="comment-count" /><Badge><CommentCount
                shortname='sashas-portfolio'
                config={
                    {
                        url: `${location.origin}/things/${name}`,
                        identifier: `things-${name}`,
                        title
                    }
                }
            /></Badge>
        </div>
    </div>;
}