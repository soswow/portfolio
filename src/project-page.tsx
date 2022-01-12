/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FileIdentifier, MediaCollectionItem } from '@atlaskit/media-client';
import { Card } from '@atlaskit/media-card';
import Spinner from '@atlaskit/spinner';
import { MediaViewerDataSource } from '@atlaskit/media-viewer';
import Tag, { SimpleTag } from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import Lozenge from '@atlaskit/lozenge';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import { colors } from "@atlaskit/theme";
import { DiscussionEmbed } from 'disqus-react';

import { projectList } from "./data";
import { config, getCollectionItems } from './media-api';
import { useEffect, useState } from "react";
import { statusToLozengeAppearanceMap } from "./types";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const singleImageStyle = css`

`;

const projectPageStyle = css`
    margin: 0 auto;
`;

const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 900px;
    margin-top: 10px;
    gap: 5px;
`;

const titleRowStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

const tagGroupWrapperStyle = css`
    margin-top: 15px;
`;

const partSectionStyle = css`
    width: 900px;
    margin-top: 25px;
`;

const coverCardPreloaderWrapper = css`
    width: 900px;
    height: 500px;
    background: ${colors.N20};
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

const coverImageStyle = css`
    margin-top: 15px;
`;

export const ProjectPage = () => {
    const [coverItem, setCoverItem] = useState<MediaCollectionItem | null>(null);
    const [items, setItems] = useState<MediaCollectionItem[]>([]);
    const { projectName } = useParams();
    const navigate = useNavigate();

    const project = projectList.find(({ name }) => name === projectName);
    
    if (!project) {
        return <Navigate to={'/things'} />;
    }
    
    const {
        name,
        title,
        shortSummary,
        description = [],
        parts,
        skills,
        status,
    } = project;

    const loadItems = async () => {
        const collectionItems = await getCollectionItems(name);
        collectionItems.sort((a, b) => a.details.name > b.details.name ? 1 : a.details.name < b.details.name ? -1 : 0);
        const coverIndex = collectionItems.findIndex((item) => item.details.name.toLowerCase().indexOf('cover') > -1);
        if (coverIndex > -1) {
            setCoverItem(collectionItems.splice(coverIndex, 1)[0]);
        }
        setItems(collectionItems);
    }

    const getFileIdentifier = (id: string): FileIdentifier => ({
        mediaItemType: 'file',
        id,
        collectionName: name,
    });

    useEffect(() => {
        loadItems();
    }, [])

    const mediaViewerDataSource: MediaViewerDataSource = {
        collectionName: name,
        list: items.map(item => getFileIdentifier(item.id))
    }

    if (coverItem !== null && mediaViewerDataSource.list) {
        mediaViewerDataSource.list.unshift(getFileIdentifier(coverItem.id));
    }

    const breadcrumbs = (
        <Breadcrumbs>
            <BreadcrumbsItem text="Things I've made" onClick={() => navigate('/things')} />
            <BreadcrumbsItem text={title} />
        </Breadcrumbs>
    );

    return <div css={projectPageStyle}>

        <PageHeader breadcrumbs={breadcrumbs}>
            <div css={titleRowStyle}>
                {title} <Lozenge appearance={statusToLozengeAppearanceMap[status]} isBold={status === 'Done'} >{status}</Lozenge>
            </div>
        </PageHeader>

        {description.length > 0 && description.map((paragraph, i) => <p key={i}>{paragraph}</p>) || shortSummary}
        <div css={tagGroupWrapperStyle}>
            Skills applied: <TagGroup>
                {skills.map(skill => <SimpleTag key={skill} text={skill} />)}
            </TagGroup>
        </div>

        <div css={coverImageStyle}>
            {
                !coverItem ?
                    <div css={coverCardPreloaderWrapper}><Spinner /></div> :
                    <Card
                        mediaClientConfig={config}
                        mediaViewerDataSource={mediaViewerDataSource}
                        identifier={getFileIdentifier(coverItem.id)}
                        disableOverlay={true}
                        shouldOpenMediaViewer={true}
                        dimensions={{
                            width: 900,
                            height: 500
                        }}
                    />
            }
        </div>

        {parts.map(({ name: partName, title, description = [] }) => <div css={partSectionStyle}>
            <h2>{title || partName}</h2>
            {description.map(paragraph => <p>{paragraph}</p>)}

            <div css={imagesCountainerStyle}>
                {items.filter(({ details: { name: itemFileName } }) => itemFileName.indexOf(partName) > -1).map(item =>
                    <div css={singleImageStyle} key={item.id}>
                        <Card
                            mediaClientConfig={config}
                            identifier={getFileIdentifier(item.id)}
                            shouldOpenMediaViewer={true}
                            mediaViewerDataSource={mediaViewerDataSource}
                            disableOverlay={true}
                            dimensions={{
                                width: 295,
                                height: 295
                            }}
                        />
                    </div>)}
            </div>
        </div>)}
        <DiscussionEmbed
            shortname='sashas-portfolio'
            config={
                {
                    url: location.href,
                    identifier: `things-${name}`,
                    title
                }
            }
        />
    </div>;
}