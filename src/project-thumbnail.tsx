/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { FileIdentifier, MediaCollectionItem } from '@atlaskit/media-client';
import { Card } from '@atlaskit/media-card';
import { config, findProjectCover } from './media-api';
import Spinner from '@atlaskit/spinner';

interface Props {
    projectName: string;
    onSelect: () => void;
}

export const ProjectThumbnail = ({projectName, onSelect}: Props) => {
    const [coverItem, setCoverItem] = useState<MediaCollectionItem | null>(null);
    
    const fetchCoverItem = async () => {
        setCoverItem(await findProjectCover(projectName));
    }

    const getFileIdentifier = (id: string): FileIdentifier => ({
        mediaItemType: 'file',
        id,
        collectionName: projectName,
    });

    useEffect(() => {
        fetchCoverItem();
    })
    
    return <div>
        {coverItem ? <Card key={coverItem.id} mediaClientConfig={config} identifier={getFileIdentifier(coverItem.id)} onClick={() => onSelect()} /> : <Spinner />}
        
    </div>;
}