/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { FileIdentifier, MediaCollectionItem } from '@atlaskit/media-client';
import { Card } from '@atlaskit/media-card';
import { colors } from "@atlaskit/theme";
import Tag, { SimpleTag } from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';

import { config, findProjectCover } from './media-api';
import Spinner from '@atlaskit/spinner';
import { Project, statusToLozengeAppearanceMap } from "./types";
import Lozenge from '@atlaskit/lozenge';

interface Props {
    project: Project;
    onSelect: () => void;
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
    height: 150px;
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

export const ProjectThumbnail = ({project: {
    name,
    title,
    status,
    skills,
    shortSummary
}, onSelect}: Props) => {
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
                    onClick={() => onSelect()}
                    disableOverlay={true}
                    dimensions={{
                        width: 298,
                        height: 150,
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
    </div>;
}