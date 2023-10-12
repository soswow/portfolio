/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PageHeader from '@atlaskit/page-header';
import ReactMarkdown from 'react-markdown'

const wrapperStyle = css`
    max-width: 900px;
`
const roundedImageStyle = css`
    border-radius: 400px;
    margin: 35px auto 0;
    width: 300px;
    display: block;
`

export const AboutMePage = () => {
    
    const aboutMe = `
Hi, my name is Aleksandr Motsjonov, but everyone calls me Sasha. I live in Sydney / Australia. 
I am a software engineer by day (for the last 17 years) and by night, evening, morning and any other time I am a maker / artist / 3D modeller / photographer / miniature painter.

Since we came to Australia in 2014 I've been making non-stop. Starting 2023 I've started to draw.
 On this website, I've collected (still collecting at the time of writing) bunch of projects I've been working on. 
 Go to [Things I've made](/things) to see props, helmet and minis. 
 [Things I've drawn](/visual-arts) is where you can find my drawing and paintings.

I am continuously learning new techniques and diving into new directions ([serious modelling](https://www.instagram.com/p/CYWLK6_p1zQ/) or learning how to draw and sketch my own concept art)

Feel free to look around and leave a comment. You can find me on different platforms:
* [Twitter](https://twitter.com/soswow)
* [Instagram](https://www.instagram.com/soswow42/)
* [Youtube](https://www.youtube.com/channel/UCbFa-fh5c2TRwyQfIMU6S3g)
* [ArtStation](https://www.artstation.com/aleksandrmotsjonov/albums/all)
* [Cults3D](https://cults3d.com/en/users/soswow/3d-models)

Or simply write me a note to **soswow** (at) **gmail** (dot) **com**
    `
    return (
        <div css={wrapperStyle}>
            <PageHeader>About me</PageHeader>
            <img src="/assets/myface.jpg" css={roundedImageStyle} width={500} />
            <ReactMarkdown children={aboutMe}/>
        </div>
    );
}