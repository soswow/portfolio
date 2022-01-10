/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FileIdentifier, MediaCollectionItem } from '@atlaskit/media-client';
import { Card } from '@atlaskit/media-card';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { MediaViewerDataSource } from '@atlaskit/media-viewer';

import { config, getCollectionItems } from './media-api';
import { useEffect, useState } from "react";

const singleImageStyle = css`

`;

const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 900px;
`;

interface Props {
    projectName: string;
    onBack: () => void;
}

export const ProjectPage = ({ projectName, onBack }: Props) => {
    const [coverItem, setCoverItem] = useState<MediaCollectionItem | null>(null);
    const [items, setItems] = useState<MediaCollectionItem[]>([]);

    const loadItems = async () => {
        const collectionItems = await getCollectionItems(projectName);
        collectionItems.sort((a, b) => a.details.name > b.details.name ? 1 : a.details.name < b.details.name ? -1 : 0);
        const coverIndex = collectionItems.findIndex((item) => item.details.name.indexOf('cover') > -1);
        if (coverIndex > -1) {
            setCoverItem(collectionItems.splice(coverIndex, 1)[0]);
        }
        setItems(collectionItems);
    }

    const getFileIdentifier = (id: string): FileIdentifier => ({
        mediaItemType: 'file',
        id,
        collectionName: projectName,
    });

    useEffect(() => {
        loadItems();
    }, [])

    const mediaViewerDataSource: MediaViewerDataSource = {
        collectionName: projectName,
        list: items.map(item => getFileIdentifier(item.id))
    }

    if (coverItem !== null && mediaViewerDataSource.list) {
        mediaViewerDataSource.list.unshift(getFileIdentifier(coverItem.id));
    }


    return <div>
        <Button appearance="subtle-link" onClick={onBack}>Go back</Button>
        {
            !coverItem ?
                <Spinner /> :
                <Card
                    mediaClientConfig={config}
                    mediaViewerDataSource={mediaViewerDataSource}
                    identifier={getFileIdentifier(coverItem.id)}
                    shouldOpenMediaViewer={true}
                    dimensions={{
                        width: 600,
                        height: 500
                    }}
                />}
        Images:
        <div css={imagesCountainerStyle}>
            {items.map(item =>
                <div css={singleImageStyle} key={item.id}>
                    <Card
                        mediaClientConfig={config}
                        identifier={getFileIdentifier(item.id)}
                        shouldOpenMediaViewer={true}
                        mediaViewerDataSource={mediaViewerDataSource}
                        dimensions={{
                            width: 300,
                            height: 300
                        }}
                    />
                </div>)}
        </div>
    </div>;
}