/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PageHeader from '@atlaskit/page-header';
import ReactMarkdown from 'react-markdown'

const wrapperStyle = css`
    width: 900px;
`
const roundedImageStyle = css`
    border-radius: 400px;
    margin: 35px auto 0;
    width: 500px;
    display: block;
`

export const AboutMePage = () => {
    
    const aboutMe = `
Hi, my name is Aleksandr Motsjonov, but everyone call me Sasha.

I am a software engineer by day (for last 15 years) and by night, evening, morning and any other time I am a maker.
    `
    return (
        <div css={wrapperStyle}>
            <PageHeader>About me</PageHeader>
            <img src="assets/myface.jpg" css={roundedImageStyle} width={500} />
            <ReactMarkdown children={aboutMe}/>
        </div>
    );
}