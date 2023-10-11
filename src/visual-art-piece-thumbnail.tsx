/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { getArtPiecePartPictures } from "./data";
import { VisualArtPiece, VisualArtTag } from "./types";
import { colors } from "@atlaskit/theme";
// import { getWrapperStyle, tagGroupWrapperStyle, titleRowStyle } from "./project-thumbnail";
// import Lozenge from "@atlaskit/lozenge";
import TagGroup from "@atlaskit/tag-group";
import { SimpleTag, TagColor } from "@atlaskit/tag";

const thumbnailImageStyle = css`
    width: 300px;
    height: 300px;
`

const imageThumbnailStyle = css`
    display: inline-block;
    height: 300px;
`;

const cardWrapper = css`
    margin: -5px;
    img {
        border-radius: 2px;
    }
`

export const getWrapperStyle = (isNew: boolean, favIconStyle?: boolean) => css`
    position: relative;
    width: 302px;
    border: 1px solid ${isNew ? colors.G400 : favIconStyle ? colors.N60 : colors.N40};
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 5px;
    background: ${isNew ?
         `linear-gradient(0deg, rgba(0,0,0,0) 30%, ${colors.G50} 60%)` : 
         favIconStyle ? `linear-gradient(0deg, rgba(0,0,0,0) 30%, ${colors.R50} 60%)` : 'none'};
`;

export const tagGroupWrapperStyle = css`
    margin-top: 15px;
    flex-grow: 2;
    display: flex;
    align-items: flex-end;
`;

export const titleRowStyle = css`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

interface Props {
    artPiece: VisualArtPiece;
}

const visualArtTagNames: {[key in VisualArtTag]: string} = {
    ink: 'Ink',
    digital: 'Digital',
    graphite: 'Graphite',
    inkwash: 'Ink wash',
    markers: 'Markers',
    'urban_sketching': 'Urban Sketching',
    watercolor: 'Watercolor'
};

const visualArtTagColors: {[key in VisualArtTag]: TagColor} = {
    ink: 'standard',
    digital: 'purple',
    graphite: 'grey',
    inkwash: 'greyLight',
    markers: 'redLight',
    'urban_sketching': 'blue',
    watercolor: 'green'
}

export const VisualArtPieceThumbnail = ({artPiece}: Props) => {
    
    const {filename, name, tags} = artPiece;
    const {thumbnail, thumbnailX2, resource} = getArtPiecePartPictures(artPiece);
    
    return <div css={getWrapperStyle(false, false)}>
        <div css={cardWrapper}>
            <a
                key={filename}
                data-slide-name={filename}
                href={resource}
                css={imageThumbnailStyle}
            >
                <img
                    css={thumbnailImageStyle}
                    src={thumbnailX2}
                    srcSet={`${thumbnail} 1x, ${thumbnailX2} 2x`}
                />
            </a>
        </div>
        <div css={titleRowStyle}>
            <h3>{name}</h3>
        </div>
        {/* <ReactMarkdown>{shortSummary}</ReactMarkdown> */}
        {tags ? <div css={tagGroupWrapperStyle}>
            <TagGroup>
                {tags.map(tag => <SimpleTag key={tag} text={visualArtTagNames[tag]} color={visualArtTagColors[tag]} />)}
            </TagGroup>
        </div> : null}
    </div>
};