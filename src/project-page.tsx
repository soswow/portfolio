/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Lozenge from '@atlaskit/lozenge';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import { colors } from "@atlaskit/theme";
import { DiscussionEmbed } from 'disqus-react';
import ReactMarkdown from 'react-markdown';

import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-video.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import lgHash from 'lightgallery/plugins/hash';
import lgVideo from 'lightgallery/plugins/video';

import ReactGA from "react-ga";

import { getProjectList, getProjectPartPictures } from "./data";
import { useCallback, useEffect } from "react";
import { statusToLozengeAppearanceMap } from "./types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { URLto } from "./urlto";
import { markAsSeen } from "./localStorage";
import { renderSkills } from "./common";
import { AfterSlideDetail } from "lightgallery/lg-events";

const WIDTH = 910;

const projectPageStyle = css`
    margin: 0 auto;
    max-width: ${WIDTH}px;
`;

const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    max-width: ${WIDTH}px;
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
    max-width: ${WIDTH}px;
    margin-top: 25px;
`;

const coverCardPreloaderWrapper = css`
    max-width: ${WIDTH}px;
    height: 500px;
    background: ${colors.N20};
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

const commentsWrapperStyle = css`
    margin-top: 45px;
`;

const thumbnailImageStyle = css`
    width: 300px;
    height: 300px;
`

const coverImageLinkWrapperStyle = css`
    text-align: center;
    max-width: ${WIDTH}px;
`

const coverImageStyle = css`
    margin-top: 15px;
    max-width: 100%;
    max-height: 500px;
`;

const imageThumbnailStyle = css`
    display: inline-block;
    height: 300px;
`;

const videoThumbnailStyle = css`
    cursor: pointer;
    ${imageThumbnailStyle}
`;

const fileNameRegexp = /^(\d{8})_(\d{6})_(.*)\..*$/;
export const ProjectPage = () => {
    const { projectName } = useParams();
    const navigate = useNavigate();

    const project = getProjectList().find(({ name }) => name === projectName);

    if (!project || !projectName) {
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

    useEffect(() => {
        markAsSeen(name);
        window.scrollTo(0, 0);
    }, [])

    const onPictureViewed = useCallback((details: AfterSlideDetail) => {
        const index = details.index;
        let localIndex: number | null = null;
        let partName: string | null = null;
        if (index === 0) {
            localIndex = 0;
            partName = 'Cover';
        } else {
            let memo = 1; // 1 for Cover
            for (const { name } of parts) {
                const imagesInPartLenght = getProjectPartPictures(projectName, name).length;
                if (index >= memo && index < memo + imagesInPartLenght) {
                    localIndex = index - memo;
                    partName = name;
                    break;
                }
                memo += imagesInPartLenght;
            }
        }
        ReactGA.event({
            category: 'Pictures',
            action: 'view',
            label: `${projectName}/${partName}/${localIndex}`,
        });
    }, [projectName, parts]);


    const breadcrumbs = (
        <Breadcrumbs>
            <BreadcrumbsItem text="Things I've made" onClick={() => navigate(URLto.things)} />
            <BreadcrumbsItem text={title} />
        </Breadcrumbs>
    );

    const coverResource = getProjectPartPictures(projectName, 'Cover')[0];

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

        <LightGallery
            selector='a'
            mode="lg-fade"
            speed={10}
            backdropDuration={50}
            actualSize={false}
            showZoomInOutIcons={true}
            customSlideName={true}
            autoplayVideoOnSlide={true}
            onAfterSlide={onPictureViewed}
            plugins={[lgThumbnail, lgZoom, lgFullScreen, lgHash, lgVideo]}
        >

            <div css={coverImageLinkWrapperStyle}>
                <a
                    data-slide-name={coverResource.filename}
                    {...(coverResource.videoData ? {
                        css: videoThumbnailStyle,
                        'data-video': JSON.stringify(coverResource.videoData),
                        'data-poster': coverResource.thumbnailX2
                    } : {
                        href: coverResource.resource,
                        css: imageThumbnailStyle,
                    })}
                >
                    <img css={coverImageStyle} src={coverResource.videoData ? coverResource.videoPoster : coverResource.resource} alt={`Cover image for ${projectName} project`} />
                </a>
            </div>


            {parts.map(({ name: partName, title, description = [] }) => <div key={partName} css={partSectionStyle}>
                <h2>{title || partName}</h2>
                {description.map((paragraph, i) => <ReactMarkdown key={i}>{paragraph}</ReactMarkdown>)}

                <div css={imagesCountainerStyle}>
                    {getProjectPartPictures(projectName, partName).map(({
                        resource,
                        filename,
                        thumbnail,
                        thumbnailX2,
                        videoData,
                        videoPoster
                    }) => (
                        <a
                            key={filename}
                            data-slide-name={filename}
                            {...(videoData ? {
                                css: videoThumbnailStyle,
                                'data-video': JSON.stringify(videoData),
                                'data-poster': videoPoster
                            } : {
                                href: resource,
                                css: imageThumbnailStyle,
                            })}
                        >
                            <img
                                css={thumbnailImageStyle}
                                alt={title || partName}
                                src={thumbnailX2}
                                srcSet={`${thumbnail} 1x, ${thumbnailX2} 2x`}
                            />
                        </a>
                    )
                    )}
                </div>
            </div>)}
        </LightGallery>

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