/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FileIdentifier, MediaCollectionItem } from '@atlaskit/media-client';
import { Card } from '@atlaskit/media-card';
import Spinner from '@atlaskit/spinner';
import { MediaViewerDataSource } from '@atlaskit/media-viewer';
import { SimpleTag } from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import Lozenge from '@atlaskit/lozenge';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import { colors } from "@atlaskit/theme";
import { DiscussionEmbed } from 'disqus-react';
import ReactMarkdown from 'react-markdown'

import { getProjectList } from "./data";
import { config, getCollectionItems } from './media-api';
import { useEffect, useState } from "react";
import { statusToLozengeAppearanceMap } from "./types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { URLto } from "./urlto";
import { markAsSeen } from "./localStorage";
import { renderSkills } from "./common";

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

const commentsWrapperStyle = css`
    margin-top: 45px;
`;

const fileNameRegexp = /^(\d{8})_(\d{6})_(.*)\..*$/;
export const ProjectPage = () => {
    const [items, setItems] = useState<MediaCollectionItem[]>([]);
    const { projectName } = useParams();
    const navigate = useNavigate();

    const project = getProjectList().find(({ name }) => name === projectName);

    if (!project) {
        return <Navigate to={URLto.things} />;
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
        collectionItems.sort(({ details: { name: nameA } }, { details: { name: nameB } }) => {
            const [_, dateStrA, timeStrA, partNameA] = fileNameRegexp.exec(nameA) || [];
            const [__, dateStrB, timeStrB, partNameB] = fileNameRegexp.exec(nameB) || [];

            const partsWithCover = [{ name: 'Cover' }, ...project.parts];
            const partAIndex = partsWithCover.findIndex(part => part.name === partNameA);
            const partBIndex = partsWithCover.findIndex(part => part.name === partNameB);
            if (partAIndex === -1 || partBIndex === -1) {
                console.error("one of the part names in file doesn't match site data");
            }
            const partsCompare = partAIndex - partBIndex;
            if (partsCompare !== 0) {
                return partsCompare;
            } else {
                return parseInt(dateStrA + timeStrA, 10) - parseInt(dateStrB + timeStrB, 10);
            }
        });
        setItems(collectionItems);
    }

    const getFileIdentifier = (id: string): FileIdentifier => ({
        mediaItemType: 'file',
        id,
        collectionName: name,
    });

    useEffect(() => {
        loadItems();
        markAsSeen(name);
    }, [])

    const mediaViewerDataSource: MediaViewerDataSource = {
        collectionName: name,
        list: items.map(item => getFileIdentifier(item.id))
    }

    const breadcrumbs = (
        <Breadcrumbs>
            <BreadcrumbsItem text="Things I've made" onClick={() => navigate(URLto.things)} />
            <BreadcrumbsItem text={title} />
        </Breadcrumbs>
    );
    

    return <div css={projectPageStyle}>

        <PageHeader breadcrumbs={breadcrumbs}>
            <div css={titleRowStyle}>
                {title} <Lozenge appearance={statusToLozengeAppearanceMap[status]} isBold={status === 'Done'} >{status}</Lozenge>
            </div>
        </PageHeader>

        {description.length > 0 && description.map((paragraph, i) => <ReactMarkdown key={i}>{paragraph}</ReactMarkdown>) || <ReactMarkdown>{shortSummary}</ReactMarkdown>}
        <div css={tagGroupWrapperStyle}>
            Skills applied: {renderSkills(skills)}
        </div>

        <div css={coverImageStyle}>
            {
                items.length === 0 ?
                    <div css={coverCardPreloaderWrapper}><Spinner /></div> :
                    <Card
                        mediaClientConfig={config}
                        mediaViewerDataSource={mediaViewerDataSource}
                        identifier={getFileIdentifier(items[0].id)}
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
            {description.map(paragraph => <ReactMarkdown>{paragraph}</ReactMarkdown>)}

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

        <div css={commentsWrapperStyle}>
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
        </div>
    </div>;
}