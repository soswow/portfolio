/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PageHeader from '@atlaskit/page-header';
import { useCallback, useEffect, useMemo, useState } from "react";
import { getArtPiecePartPictures, getProjectPartPictures, getVisualArtPieces } from "./data";
import { VisualArtPieceThumbnail } from "./visual-art-piece-thumbnail";

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
import { AfterSlideDetail } from "lightgallery/lg-events";

const GAP = 10;
const ITEM_WIDTH = 300;
const ITEM_BORDER = 1;
const WIDTH = (ITEM_WIDTH + ITEM_BORDER * 2) * 3 + GAP * 2;

const pageStyle = css`
    max-width: ${WIDTH}px;
    margin: 0 auto;
    padding-bottom: 20px;
`;

const imagesCountainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    max-width: ${WIDTH}px;
    margin-top: 15px;
    gap: ${GAP}px;
    align-items: stretch;
`;

export const VisualArtsPage = () => {

    const artPieces = useMemo(() => {
        const artPieaces = getVisualArtPieces();
        artPieaces.sort((a, b) => b.proudness - a.proudness)
        return artPieaces;
    }, []);

    // const onPictureViewed = useCallback((details: AfterSlideDetail) => {
    //     const index = details.index;
    //     let localIndex: number | null = null;
    //     let partName: string | null = null;
        
    //     if (index === 0) {
    //         localIndex = 0;
    //         partName = 'Cover';
    //     } else {
    //         let memo = 1; // 1 for Cover
    //         for (const { name } of parts) {
    //             const imagesInPartLenght = getProjectPartPictures(projectName, name).length;
    //             if (index >= memo && index < memo + imagesInPartLenght) {
    //                 localIndex = index - memo;
    //                 partName = name;
    //                 break;
    //             }
    //             memo += imagesInPartLenght;
    //         }
    //     }

    //     ReactGA.event({
    //         category: 'Pictures',
    //         action: 'view',
    //         label: `${projectName}/${partName}/${localIndex}`,
    //     });
    // }, [projectName, parts]);

    return <div css={pageStyle}>
        <PageHeader>
            Things I've drawn
        </PageHeader>
        <p>Here is a list of visual art things</p>
        <LightGallery
            selector='a'
            mode="lg-fade"
            speed={10}
            backdropDuration={50}
            actualSize={false}
            showZoomInOutIcons={true}
            customSlideName={true}
            autoplayVideoOnSlide={true}
            // onAfterSlide={onPictureViewed}
            plugins={[lgThumbnail, lgZoom, lgFullScreen, lgHash, lgVideo]}
        >
            <div css={imagesCountainerStyle}>
                {artPieces.map(artPiece => 
                    <VisualArtPieceThumbnail artPiece={artPiece} />
                )}
            </div>
        </LightGallery>
    </div>
};