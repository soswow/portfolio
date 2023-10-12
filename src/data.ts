import { Project, VisualArtPiece } from "./types";
import data from '../../media-uploader/to-upload/index.json';

const CLOUDFRONT_URL = 'https://d2f1ddab4mp87f.cloudfront.net';
const fileNameRegexp = /^(\d{8})_(\d{6})/;

const getName = (path: string) => path.substring(path.lastIndexOf('/') + 1);
const getBase = (fileName: string) => fileName.substring(0, fileName.lastIndexOf('.'));

export const getProjectPartPictures = (project: string, part: string) => {
    const paths = data.filter(path => path.startsWith(`${project}/${part}`));

    paths.sort((a, b) => {
        const [_, dateStrA, timeStrA] = fileNameRegexp.exec(getName(a)) || [];
        const [__, dateStrB, timeStrB] = fileNameRegexp.exec(getName(b)) || [];

        return parseInt(dateStrA + timeStrA, 10) - parseInt(dateStrB + timeStrB, 10);
    });

    return paths.map(path => {
        const fileName = getName(path);
        const isMP4 = fileName.toLowerCase().endsWith('.mp4');
        const isMOV = fileName.toLowerCase().endsWith('.mov');
        const resourceFullPath = encodeURI(`${CLOUDFRONT_URL}/${path}`);
        const videoData = isMOV || isMP4 ? {
            "source": [
                { "src": resourceFullPath, "type": isMP4 ? "video/mp4" : "video/quicktime" }
            ],
            "attributes": { "preload": false, "playsinline": true, "controls": true },
        } : null;

        return {
            filename: getName(path),
            resource: resourceFullPath,
            thumbnail: encodeURI(`${CLOUDFRONT_URL}/${path.substring(0, path.lastIndexOf('/'))}/thumbnails/${fileName}.jpg`),
            thumbnailX2: encodeURI(`${CLOUDFRONT_URL}/${path.substring(0, path.lastIndexOf('/'))}/thumbnails-x2/${fileName}.jpg`),
            videoPoster: encodeURI(`${CLOUDFRONT_URL}/${path.substring(0, path.lastIndexOf('/'))}/thumbnails/${fileName}.poster.jpg`),
            videoData,
        }
    });
}

export const getArtPiecePartPictures = (artPiece: VisualArtPiece) => {
    return {
        resource: encodeURI(`${CLOUDFRONT_URL}/visual-art/${artPiece.folder}/${artPiece.filename}`),
        thumbnail: encodeURI(`${CLOUDFRONT_URL}/visual-art/${artPiece.folder}/thumbnails/${artPiece.filename}.jpg`),
        thumbnailX2: encodeURI(`${CLOUDFRONT_URL}/visual-art/${artPiece.folder}/thumbnails-x2/${artPiece.filename}.jpg`),
    }
}

export const getProjectList: () => Project[] = () => [
    {
        name: 'mandalorian-helmet',
        title: 'Mandalorian helmet',
        myFavourite: true,
        skills: [
            '3D printing',
            'Surface prep', 'Spray painting',
            'Weathering'
        ],
        status: 'Done',
        shortSummary: "I've printed and fully finished a wearable helmet from a Mandalorian TV show equipped with a see-through visor.",
        description: [
            `Using model found on the internet I've printed and fully finished a wearable helmet from a Mandalorian TV show equipped with a see-through visor.`,
            `The only parts I've modelled on this project were reinforcement brackets and clips for holding visor.`
        ],
        parts: [
            {
                name: 'Reference',
                title: 'Reference images',
                description: [
                    `Just in case you lived under the rock and don't know what we are talking about here, here is a refresher for you 😛.`
                ]
            },
            {
                name: '3D printing',
                description: [
                    `All the parts are 3D printed. There were some initial failures (black parts). 
                    That I've used to make sure scale is correct and it fits me. In this particular case, I found it is too big, 
                    so I adjusted the scale of the model.`,
                    `At some point, I've modelled a bracket that goes inside and adds rigidity between the cheek and back parts. 
                    Another part I've modelled for this project was a visor bracket that would be a placeholder for the real visor and serve as reinforcement during later stages.`,
                    `Also I've made a helmet holder stand out of support material used to print semi-dome parts 🤓.`
                ]
            },
            {
                name: 'Priming and sanding',
                description: [
                    `This build required very smooth surface to achieve the shiny final effect.`,
                    `There were multiple iterations of primer, filler primer, sanding, blade putty, sanding, etc.`,
                    `On the last picture, you can see how failed black paint spray can ruined the final primer layer 😕.`
                ]
            },
            {
                name: 'Painting',
                title: 'Painting and weathering',
                description: [
                    `Silver rattle can was used for initial silver base coat.`,
                    `After that, I've used carbon powder to create a gun-metall-y shin.`,
                    `Oil paints were used to weather everything up.`,
                    `In the most end inside of the helmet was sprayed black.`
                ]
            },
            {
                name: 'Visor',
                description: [
                    `For the visor, I've used a welding helmet protective sheet.`,
                    `Special brackets with inserted nut were modelled to hold the visor so I don't need to glue it in`
                ]
            },
            {
                name: 'Final'
            }
        ]
    },
    {
        name: 'kaluga',
        title: 'Tau inpired 3D printed mini',
        shortSummary: '3D printed painted mini',
        myFavourite: true,
        status: 'Done',
        description: [`
I printed files some time ago but recently pushed myself to actually paint it. I've used a lot of techniques that I haven't tried before on this one.

It took me 25 days to complete working on it every day bit by bit.

Design files are by poyper - [https://linktr.ee/poyper](https://linktr.ee/poyper)
`],
        parts: [
            {
                name: '3D printing',
                description: ['This kit comes in many parts and can be assembled in a ton of different ways. So, the first stop was to choose parts and print them.',
                    'Then I need to glue everything together while thinking about modularity (for painting sake) as well as pose it will have in the end.',
                    'I\'ve decided to sand all the big flat surfaces so no print lines are visible throughout the model.']
            },
            {
                name: 'Embedded leds',
                description: ["Something I've seen people do is OSL (Object source light), but when done on his right arm it would be dark inside and OSL would feel strange",
                    "I thought about passing wires down to the base, but the idea was a bit too late at this point. Instead, I've figured a way to embed the smallest batteries inside the arm itself.",
                    "Not sure if I wired SMD components before. I guess that was first as well."]
            },
            {
                name: 'Priming',
                description: ["On this project I wanted to try as many new things as possible. One of them is 'zenithal highlight'.",
                    "It's only then I realized that this would make so many more things unnecessarily complicated:",
                    `
1) I would need to use some sort of translucent paint for the base coat, since if I use fully opaque - what is the point of zenithal
2) All the highlights might not make sense, since those would probably be opaque color itself and won't follow the zenithal tone
3) In my case standard washes would dull the colour and it won't be possible to normally reapply the base, since it is gradual everyone already
        `]
            },
            {
                name: 'Red base',
                description: ["I've used red ink, which worked fine."]
            },
            {
                name: 'Black base',
                description: ["This step took a lot of time - carefully picking up all the parts that going to be metal and painting them with the brush."]
            },
            {
                name: 'White base',
                description: ["Since this is supposed to be Farsight sept, it needs to have white patches here and there. As you might know, working with white is super hard. So I tried to be smart about it and used several layers of increasingly whiter paint.",
                    "I tried to be smart and use masking as a template to create some shapes on wings and the front."]
            },
            {
                name: 'Panel line shading',
                description: ["As stated above standard shade washes wouldn't work here. So, I've used what Gunpla people use."]
            },
            {
                name: 'Metal base',
                description: ["I have a lot of paints. ... and I mean A LOT. This doesn't help when you need to pick a color. I couldn't resist and used might be up to 10-15 different metallic paints on all the metal parts. This step took me a while."]
            },
            {
                name: 'Metal shading',
                description: ["Nuln Oil for the win!"]
            },
            {
                name: 'Edge highlighting',
                description: ["I didn't spend a crazy amount of time doing manual edge highlight, but since this is what expected, I did enough."]
            },
            {
                name: 'Blue glow',
                description: ["That was another big new thing for me. After watching a bunch of videos I thought I know what needs to be done. You be the judge. At this point I don't know if it worked out as I planned."]
            },
            {
                name: 'Base',
                description: [`Base didn't take that much of a time comparatively. But I tried to use all sorts of tricks here:
* Used contrast paint for different parts (rocks, big rocks, outside dirt rim)
* Used dry brushing with several green colors to build up, what I was hoping would look like moss on stones bellow
* I've glued on homemade grass bushes here and there (I own DIY electrostatic machine that I used to make those bushes)
* I've put gloss in between stones as well as big boulder crevises to make it look like a damp part
`]
            },
            {
                name: 'Weathering',
                description: ["I've used the classic technique of water-soluble oil paints (black and Siena) to add all the machine oil grime to metal parts, especially parts like joints etc."]
            },
            {
                name: 'Decals',
                description: ["This was another big news for me. Not only I've never applied decals before, I thought it would be cool to use custom printed ones.",
                    "I've designed graphics, including Farsight sept symbol, in Inkscape, printed them, sealed them, applied them, varnished on top. and tried to sand  ... didn't work out, but who cares.",
                    "Bonus points if you can read what 6 symbols on his back says ;-)"]
            },
            {
                name: 'Pinning',
                description: ["Just gluing this guy to the base wouldn't work. So, I've used metal pins to add extra stability. Both from legs to the platform, as well as between lower and higher bodies."]
            },
            {
                name: 'Final photoshoot',
                description: ['To show off all the good work done here good photos are in order. Again, new thing for me. Never done that level of mini-photography.',
                    "I've converted my DIY light (that uses all the good high CRI leds) into more like a softbox, got out my EVA foam that still waiting to be used for some cosplay and went for it.",
                    "Oh, and I also painted my turn table, which is normally white, to black.",
                    "And after all that — still I've managed to leave the cord in all the good shots 🤦🏼‍♂️"]
            },
        ],
        skills: [
            '3D printing', 'Airbrush painting', 'Electronics', 'Surface prep', 'Weathering', 'Brush painting'
        ]
    },
    {
        name: 'halo-plasma-blaster',
        title: 'Halo Plasma Blaster',
        skills: [
            '3D printing', 'Surface prep',
            'Airbrush painting', 'Chipping paint',
            'Stencil making'
        ],
        status: 'WIP',
        shortSummary: "3D printed Plasma Blaster from Halo where I tried paint chipping and my own vinyl cut stencil for a pattern effect. This project is still in progress.",
        description: [
            `Using model found on the internet 3D printed Plasma Blaster from Halo where I tried paint chipping and my own vinyl cut stencil for a pattern effect.`,
            `This project is still in progress.`
        ],
        parts: [
            {
                name: 'Reference',
                title: 'Reference images',
                description: [
                    `These are images I've used as a reference.`
                ]
            },
            {
                name: '3D printing',
                description: [
                    `As you can see I had a crappy 3D printer back then, which meant parts will require a lot of sanding.`,
                    `After printing all the parts they were glued and putty was applied to fill the gaps.`,
                    `It's clear to me now I didn't get full filling in that project. It wasn't the greatest putty. Shrank a lot.`
                ]
            },
            {
                name: 'Priming and sanding',
                description: [
                    `Filler primer was used and sanding applied.`,
                    `Compared to some of my other projects I didn't spend too much taking care of each and every imperfection on this one.`,
                ]
            },
            {
                name: 'Painting 1',
                title: 'Base black paint layer',
                description: [
                    `First layer of base dark color was applied. I believe this might have been gunmetal applied with the airbrush.`
                ]
            },
            {
                name: 'Painting 2',
                title: 'Metalic base for future paint chipping',
                description: [
                    `Airbrushed some lighter metallic to some portions to be used as a paint chipping base in the future.`
                ]
            },
            {
                name: 'Painting 3',
                title: 'Brighter metallic with blue on top',
                description: [
                    `This was the first project where I wanted to get color on top of the metal effect.`,
                    `I've masked non-blue parts out and airbrushed light metal on remaining parts.`,
                    `I've used clear blue color to put on top.`
                ]
            },
            {
                name: 'Painting 4',
                title: 'Vinyl stencil and more blue on top',
                description: [
                    `Gun in the game (some versions of it) has some type of pattern.`,
                    `So, I've created and vinyl cut the mask. I've sprayed some more clear blue to create a different shade of the color.`
                ]
            },
            {
                name: 'Painting 5',
                title: 'Gunmetal with liquid masking paint chipping',
                description: [
                    `I've masked all the blue parts.`,
                    `Using a toothpaste as a liquid mask I did my first paint chipping effect 😜.`
                ]
            },
        ]
    },
    {
        name: 'final-space-grays-gun',
        title: "Gary's gun from Final Space",
        myFavourite: true,
        shortSummary: "I've 3D modelled from scratch, printed and painted a gun from Final Space show.",
        description: [
            `Couple of years ago I really liked Final Space show on Netflix. Animation and the story behind its creation were wonderful. 
        
I don't remember already why I decided to replicate one of the props from this show, but I did. This gun was the main weapon of choice of the main protagonist - Gary.

If you want make your own it's free [over here](https://cults3d.com/en/3d-model/game/final-space-gary-s-gun)!
`],
        status: 'Done',
        parts: [
            {
                name: 'References',
                description: [
                    `As you can see this is an animated show, which is interesting in terms of replicating a prop that doesn't exist in the real world. And since it's not 3D rendered or real part it can be drawn differently from frame to frame.
`]
            },
            {
                name: 'Outline',
                description: [
                    `I've created side outline that I was using during 3D modelling.
`]
            },
            {
                name: '3D Modelling',
                description: [
                    `It was some years ago and I believe this was my first time modelling something from a movie or a show.
`]
            },
            {
                name: '3D Printing',
                description: [
                    `It was the time when I was printing on a cheap FDM printer (which still works). You can see I've smartly chopped up the model into easily printable pieces (+ this separation would help during the painting stage)
`]
            },
            {
                name: 'Priming and Sanding',
                description: [
                    `Standard set of a couple of layers of a filler *primer -> sanding -> putty -> sanding* cycle.
`]
            },
            {
                name: 'Painting',
                description: [
                    `I believe this was one of my first Airbrushing projects with a crappy compressor. All the masking was also one of my first on.
`]
            },
            {
                name: 'Result',
                description: [
                    `I've modelled an extra holding part to hold it in place. I wonder if you can see, but I screwed up a colour scheme a bit in one place =)
`]
            },
        ],
        skills: ['3D modelling', '3D printing', 'Airbrush painting', 'Surface prep']
    },
    {
        name: 'orville-pm-32',
        title: 'PM-32 gun from Orville',
        myFavourite: true,
        shortSummary: "I've 3D modelled from scratch, printed and painted a badge from Star Trek Discovery.",
        description: [`
I am one of those who shares an opinion that The Orville tv show — is the better Star Trek than Discovery.

I liked it. I wanted to make a prop from the show. It was clear that the main banana-shaped blaster would become an obvious choice for many prop makers. To be a bit special I've chosen PM-32 gun. At the time when I started modelling there was no model done by anyone. So naturally, I've taken it upon myself as a challenge to model and make it from start to finish. As you can see "finish" hasn't come just yet. Soon.

Files can be found over here - [https://cults3d.com/en/3d-model/art/pm-32-blaster-from-the-orville](https://cults3d.com/en/3d-model/art/pm-32-blaster-from-the-orville)
`
        ],
        status: 'Done',
        parts: [
            {
                name: 'References',
                description: [`
There were good frames with the gun being in almost perfect side view and some with front view, so I am certain I end up with appropriate scale. 

Said that as in many cases in movies there were different versions of it. See the photo below with two red arrows.
`]
            },
            {
                name: '2D outline',
                description: [`
Before printing all the parts, I've performed a scale test, where first I've printed outlines on paper with various scales and saw which one best fits my hand. When was happy with that I double-checked by printing just a handle to make sure it fits nicely in my hand.
`]
            },
            {
                name: '3D Modelling',
                description: [`
`]
            },
            {
                name: '3D Printing',
                description: [`
I was printing in ABS because it is much better in terms of sanding.
`]
            },
            {
                name: 'Sanding and prepping',
                description: [`
Since I've sanded all the print lines with sandpaper I didn't need filler primer here. 

There was a bunch of printing defects, so putty was applied and sanded down.
`]
            },
            {
                name: 'Painting',
                description: [`
As you can see I haven't been done with it just yet. White is notoriously hard to work with. All the black grip parts were sprayed with Plasti Dip.
`]
            },
            {
                name: 'Result',
                description: [`
I've done almost all the remaining steps. The one last one is to do some gloss varnish on white and silver.
                `]
            }
        ],
        skills: ['3D modelling', '3D printing', 'Airbrush painting', 'Surface prep']
    },
    {
        name: 'star-track-discovery-section-31-badge',
        title: 'Section 31 badge from Star Trek Discovery',
        shortSummary: "I've 3D modelled from scratch, printed and painting a badge from Star Trek Discovery.",
        description: [`
I've 3D modelled from scratch, printed and painting a badge from Star Trek Discovery.

In case want your own, it's available for free [over here](https://cults3d.com/en/3d-model/game/section-31-star-trek-badge).
        `],
        status: 'Done',
        parts: [
            {
                name: 'References',
                description: [`
There was only one scene where a badge is presented. But thankfully other resources gave me shape and scale.
`]
            },
            {
                name: 'Outline',
                description: [`
`]
            },
            {
                name: '3D Modelling',
                description: [`
`]
            },
            {
                name: '3D Printing',
                description: [`
There were two different designs around how two wings would connect. At first, I was thinking about sliding one into another, since I thought this is how the real thing would be manufactured. But it didn't work, and I came out with a simpler way.
`]
            },
            {
                name: 'Priming and sanding',
                description: [`
Classic filler primer + putty + sandpaper
`]
            },
            {
                name: 'Painting',
                description: [`
There was a moment on this project when I discovered first time how sometimes paints and putty don't go together. I had to sand everything down and start over. Good lesson.
`]
            },
            {
                name: 'Result',
                description: [`
I wouldn't lie today I would paint it slightly differently. I am not super happy about it. It's not 100% match to screen prop, but hey - who is judging?!

And if you are wondering - yes, you can clip it. It has 2 magnets that you can use to secure it on your cloth ;-)
`]
            },
        ],
        skills: ['3D modelling', '3D printing', 'Airbrush painting', 'Surface prep']
    },
    {
        name: 'atlassian-christmas-ornament',
        title: 'Atlassian themed Christmas tree ornament',
        shortSummary: "This was a very special present for two important people.",
        status: 'Done',
        parts: [
            {
                name: '3D Modelling',
                description: [`
`]
            },
            {
                name: '3D Printing',
                description: [`
`]
            },
            {
                name: 'Aceton vapour smoothing',
                description: [`
`]
            },
            {
                name: 'Masking and glitter',
                description: [`
`]
            },
            {
                name: 'Packeging',
                title: 'Packaging'
            },
            {
                name: 'Result',
                description: [`
`]
            },
        ],
        skills: ['3D modelling', 'Own design', '3D printing', 'Surface prep', 'Vapour smoothing']
    },
    {
        name: 'led-tie',
        title: 'Wearable programmable tie',
        myFavourite: true,
        shortSummary: "A custom-designed, programable LED tie that can react to music",
        description: [
            `I love the attention to myself + I know one or two things about making, so it was no brained to make a tie with addressable RGB LEDs that would jump in down to the music at our next corporate party.

It was a very fun project where I've combined all of the fun things I like: programming, making, lights.`
        ],
        status: 'Done',
        parts: [
            {
                name: '3D Modelling',
                description: [`
I couldn't find a model for the one cell itself. There were many small parts, like these two, or a clip to secure it on the shirt or a special coupler between LED and optical wire (for a hat). 

The second picture shows a specially made clicker that I would hold in my hand during the event to switch animation programs. It was pretty sketchy, I had a vest full of electronics, wires, batter and in my hand, I had a black clicker with one big button. 😅
`]
            },
            {
                name: 'Experimentation', description: [
                    `
The initial idea was to print on fabric. You can see the scales test I did first. It worked well, but scaling it to a full tie length would be hard or even impossible. 

You can also see I was playing with the idea of enclosing LED inside the 3D part during the print. It is possible, but soldering would be a pain.
`]
            },
            {
                name: 'Bowtie test',
                description: [
                    `
Before going full-on tie I decided to try all the technical aspects on a smaller scale.
`
                ]
            },
            {
                name: '3D printing',
                description: [`
Printing many many cells.
`]
            },
            {
                name: 'Rig and glueing',
                description: [`
I've designed and printed a special rig that I used to glue all the cells to the fabric keeping consistent hexagonal spacing. In one of the photos, you can see me using the baking paper as an interface between my fingers, superglue, fabric and a cell. 

When all was glued in I've cut round holes for LEDs to come in.
`]
            },
            {
                name: 'Rig and soldering',
                description: [`
As you can see I've designed and printed another rig to hold all the LEDs in place with identical spacing as on covers while I am gluing them in. Since addressable RGB LEDs are connected into a strip, I've left markings about direction. 

When everything was soldered in I've glued another (black) fabric on top (back) to hold everything in place.
`]
            },
            {
                name: 'Accembly',
                description: [`
When all was soldered it was time to combine caps with LEDs.
`]
            },
            {
                name: 'Fixing dead pixel',
                description: [`
After everything was soldered and glued one of the LEDs went out (I believe it was a blue segment of it). I had to perform a delicate operation to replace this dead pixel.
`]
            },
            {
                name: 'Electronics',
                description: [`
The brains of the whole operation was a Teensy microcontroller. I specifically used that and not cheaper Arduino because I needed hardware to be able to perform FFT (fast Fourier transform). FFT is how you split sound waves into frequency bands, which gives you an equalizer visualisation (see below).
`]
            },
            {
                name: 'Programming',
                description: [`
I've developed a custom program to develop an animation algorithm to go into a real tie. There was, obviously, a lot of C/Arduino coding, that I Am not showing here.

I've recorded myself playing with that another day. I think it has some bug, regardless, if you wish to try, it's [over here](http://soswow.github.io/Various-JS-and-Python/JS/hexagonal-rgb-led-matrix-editor/build/). 
`]
            },
            {
                name: 'Testing',
                description: [`
That thing was extremely bright, so you could still see its effect even when I was outside during the full sun.
`]
            },

            {
                name: 'Result',
                description: [`
Unfortunately, the whole FFT music sensing got screwed. Music in the event was much louder than what I was testing at home. The result - sensor was saturated and it didn't produce the desired effect. But thankfully I had other patterns, like Matrix rain, fire and random colour flashing.
`]
            },
        ],
        skills: ['Own design', 'Electronics', '3D modelling', '3D printing', 'Wearable']
    },
    {
        name: 'emergency-beard-trimmer',
        title: 'Emergency Beard trimmer',
        shortSummary: "This was a joke present to someone who is letting his beard go loose for too much.",
        status: 'Done',
        parts: [
            {
                name: 'Idea Sketch',
                description: [`
`]
            },
            {
                name: 'Trimmer size measurment',
                description: [`
`]
            },
            {
                name: '3D Modelling',
                description: [`
`]
            },
            {
                name: 'Aceton vapour smoothing',
                description: [`
`]
            },
            {
                name: 'Dry fit',
                description: [`
`]
            },
            {
                name: 'Tools making',
                description: [`
`]
            },
            {
                name: 'Box contruction',
                description: [`
`]
            },
            {
                name: 'Glass cutting',
                description: [`
`]
            },
            {
                name: 'Sticket cutting', title: 'Sticker cutting',
                description: [`
`]
            },
            {
                name: 'Glass channel',
                description: [`
`]
            },
            {
                name: 'Embedded lights',
                description: [`
`]
            },
            {
                name: 'Fixing a mistake',
                description: [`
`]
            },
            {
                name: 'Logo on trimmer',
                description: [`
`]
            },
            {
                name: 'Varnishing',
                description: [`
`]
            },
            {
                name: 'Electronics',
                description: [`
`]
            },
            {
                name: 'Priming and sanding',
                description: [`
`]
            },
            {
                name: 'Result',
                description: [`
`]
            },
        ],
        skills: ['3D modelling', 'Own design', '3D printing', 'Vapour smoothing', 'Woodworking', 'Electronics', 'Stencil making']
    },
    {
        name: 'star-lord-blaster',
        title: "Star-Lord's Quad Blaster",
        shortSummary: "Printed and painted own Quad Blaster.",
        status: 'Done',
        parts: [
            {
                name: 'Reference',
                description: [`
`]
            },
            {
                name: '3D Printing',
                description: [`
`]
            },
            {
                name: 'Sanding',
                description: [`
`]
            },
            {
                name: 'Accembly',
                description: [`
`]
            },
            {
                name: 'Painting',
                description: [`
`]
            },
            {
                name: 'Chipped paint',
                description: [`
`]
            },
            {
                name: 'Stencil',
                description: [`
`]
            },
            {
                name: 'Result',
                description: [`
`]
            },
        ],
        skills: ['3D printing', 'Airbrush painting', 'Chipping paint', 'Surface prep', 'Weathering', 'Stencil making']
    },
    {
        name: 'red-hr-button',
        title: 'Big HR button',
        shortSummary: 'It was a joke item I designed and made for fun.',
        status: 'Done',
        parts: [
            {
                name: '3D Modelling',
                description: [`
`]
            },
            {
                name: '3D Printing',
                description: [`
`]
            },
            {
                name: 'Electronics',
                description: [`
`]
            },
            {
                name: 'Result',
                description: [`
`]
            },
        ],
        skills: ['3D modelling', '3D printing', 'Own design', 'Electronics', 'Stencil making']
    },
    {
        name: 'miniatures',
        title: 'Various miniatures',
        shortSummary: "Some miniatures I've painted",
        status: 'Done',
        parts: [
            {
                name: 'Space Marine',
                description: [`
`]
            },
            {
                name: 'Space Marine outriders',
                description: [`
`]
            },
            {
                name: 'Stormcast Eternals gryph-hound',
                description: [`
`]
            },
        ],
        skills: ['3D printing', 'Airbrush painting', 'Brush painting'],
    },
    {
        name: 'various-painted-prints',
        title: 'Various painted prints',
        shortSummary: "There were many 3D prints I've painted",
        status: 'Done',
        parts: [
            {
                name: 'Reference',
                description: [`
`]
            },
            { name: "Razor Crest" },
            { name: "zelda chest", title: 'Chest from game Zelda' },
            { name: "Pirate chest", title: 'Chest' },
            { name: "pickle rick", title: 'Pickle Rick!' },
            { name: "batman", title: 'Batman figure' },
            { name: "Om Nom" },
        ],
        skills: ['3D printing', 'Airbrush painting', 'Brush painting', 'Surface prep', 'Weathering'],
    },
    {
        name: 'star-man',
        title: 'SpaceX starman figure',
        shortSummary: 'This was my first masking/airbrushing project.',
        status: 'Done',
        parts: [
            {
                name: 'Reference',
                description: [`
`]
            },
            {
                name: '3D Printing',
                description: [`
`]
            },
            {
                name: 'Filler Primer and Sanding',
                description: [`
`]
            },
            {
                name: 'Black primer base coat',
                description: [`
`]
            },
            {
                name: 'Red coat',
                description: [`
`]
            },
            {
                name: 'Black coat',
                description: [`
`]
            },
            {
                name: 'White coat',
                description: [`
`]
            },
            {
                name: 'Silver and varnish',
                description: [`
`]
            },
            {
                name: 'Gluing',
                description: [`
`]
            },
            {
                name: 'Final',
                description: [`
`]
            },
        ],
        skills: ['3D printing', 'Surface prep', 'Airbrush painting']
    },
    {
        name: 'led-cap',
        title: 'Atlassian LED cap',
        shortSummary: 'Cap with Atlassian logo and addressable RGB LEDs inside.',
        status: 'Done',
        myFavourite: true,
        parts: [
            { name: "Cap source" },
            { name: "Making holes" },
            { name: "Rig for soldering" },
            { name: "Glue LEDs in" },
            { name: "Logo shells" },
            { name: "Internal soft interface" },
            { name: "Control box" },
            { name: "Programming" },
            { name: "Final" },
        ],
        skills: ['3D modelling', '3D printing', 'Electronics', 'Own design', 'Wearable'],
    },
    {
        name: 'primaris-space-marine-helmet',
        title: 'Primaris Space Marine Helmet',
        shortSummary: 'Full-blown space marine helmet of my design',
        status: 'WIP',
        myFavourite: true,
        parts: [
            {
                name: 'Reference',
                description: [`
`]
            },
            {
                name: '3D Modelling',
                description: [`
`]
            },
            {
                name: '3D Printing',
                description: [`
`]
            },
            {
                name: 'Fixing layer shift',
                description: [`
`]
            },
            {
                name: 'Dry fit',
                description: [`
`]
            },
            {
                name: 'Resin 3D Parts',
                description: [`
`]
            },
            {
                name: 'Magnet collar retrofit',
                description: [`
`]
            },
            {
                name: 'Lense business',
                description: [`
`]
            },
            {
                name: 'Prime detail parts',
                description: [`
`]
            },
            {
                name: 'Prime Sand One',
                description: [`
`]
            },
            {
                name: 'Putty Sand Prime Two',
                description: [`
`]
            },
            {
                name: 'Putty Sand Prime Three',
                description: [`
`]
            },
            {
                name: 'Putty Sand Prime Four',
                description: [`
`]
            },
            {
                name: 'Base Ultramarine Coat',
                description: [`
`]
            },
        ],
        skills: ['3D modelling', '3D printing', 'Own design', 'Spray painting', 'Surface prep']
    },
    {
        name: 'various-atlassian-trophies',
        title: 'Various Atlassian sculpts',
        shortSummary: "Over the years I've made bunch of Atlassian inspired sculpts.",
        status: 'Done',
        parts: [
            {
                name: 'Atlassian New Logo design 2',
                description: [`
`]
            },
            {
                name: 'Atlassian New Logo design 1',
                description: [`
`]
            },
            {
                name: 'Departure Trophy 1',
                description: [`
`]
            },
            {
                name: 'Departure Trophy 2',
                description: [`
`]
            },
            {
                name: 'Departure Trophy 3',
                description: [`
`]
            },
        ],
        skills: ['3D modelling', '3D printing', 'Own design', 'Brush painting', 'Airbrush painting', 'Stencil making'],
    },
    {
        name: 'spray-booths',
        title: '2 Spray booths',
        shortSummary: "I've constructed 2 spray booths for all the fume extraction needs.",
        status: 'Done',
        parts: [
            {
                name: 'Big Booth',
                description: [`
`]
            },
            {
                name: 'Portable Booth',
                description: [`
`]
            },
        ],
        skills: ['Woodworking', 'Own design']
    },
    {
        name: 'workspace-furniture',
        title: 'DIY Table and shelves',
        shortSummary: "I've constructed a bunch of tables and a shelving unit for my office.",
        status: 'Done',
        parts: [
            {
                name: 'Big workbanch',
                description: [`
`]
            },
            {
                name: 'Hobby Table Legs',
                description: [`
`]
            },
            {
                name: 'Hobby Table top',
                description: [`
`]
            },
            {
                name: 'Hobby Table Cross beams',
                description: [`
`]
            },
            {
                name: 'Hobby Shelves Construction',
                description: [`
`]
            },
            {
                name: 'Hobby Shelves Assembly',
                description: [`
`]
            },
            {
                name: 'Flimsy Lights beam',
                description: [`
`]
            },
            {
                name: 'LEDs',
                description: [`
`]
            },
        ],
        skills: ['Own design', 'Woodworking', '3D modelling']
    },
    {
        name: 'fennec-drone',
        title: 'Fennec Shand Reconnaissance Drone',
        shortSummary: 'Drone from 4th ep. of The Book of Boba Fett show.',
        status: 'Done',
        description: [`
After watching the episode I thought it would be a fun project to pull off before the next episode next week. I think it worked out well.

I've modelled, 3D printed, sanded, painted, weathered and made it light up!

Files can be found over here - [https://cults3d.com/en/3d-model/art/fennec-shand-reconnaissance-drone](https://cults3d.com/en/3d-model/art/fennec-shand-reconnaissance-drone)
`],
        parts: [
            {
                name: 'Reference',
                description: ['All the shots of this drone are during the night']
            },
            {
                name: '3D Modelling',
                description: ['Modelled in Fusion. It was pretty tricky to make those slots. Working on top of a sphere is hard.']
            },
            {
                name: '3D Printing',
                description: ["I've printed two copies just in case. The Second one taken by my younger son and I had to paint it as well."]
            },
            {
                name: 'Electronics',
                description: ["I've made something funky - two pairs of magnets are holding two domes together and also act as a switch connecting lights to the battery."]
            },
            {
                name: 'Painting',
                description: [`
There was a lot of painting involved:
* Prime black
* Gunmetal
* Gloss black on round bits
* Several layers of different brown/red on those bits
* Gloss varnish on top of them
* Nuln Oil over everything
* Weathering with oil paints (burned sienna and ivory black)
* wipe everything out
`]
            },
            {
                name: 'Final Result',
                description: ['Nice little prop']
            }
        ],
        skills: [
            '3D modelling', '3D printing', 'Airbrush painting', 'Electronics', 'Surface prep', 'Weathering'
        ]
    }
];

export const getVisualArtPieces: () => VisualArtPiece[] = () => [
    {
      proudness: 10,
      tags: ['color_pencil'],
      description: 'Rendering of a Superb fairywren photo I took using color pencils',
      name: 'Superb fairy wren color pencil',
      folder: '20221227-superb-fairy-wren-color-pencil',
      filename: '20221227_033044.jpeg'
    },
    {
      proudness: 10,
      tags: ['gouache'],
      description: 'My wife asked me to paint "an ocean" for her for Puja purposes. I\'ve made reproduction of some painting I found on internet using mostly gouache pain on a canvas.',
      name: 'Ocean sunset painting',
      folder: '20230701-ocean-sunset-painting',
      filename: '20230701_051305.jpg'
    },
    {
      proudness: 9,
      tags: ['color_pencil'],
      description: 'Rendering of a white rose from our garden using white pencils on a black paper. A4 format.',
      name: 'White rose',
      folder: '20230523-white-rose',
      filename: '20230523_022335.jpg'
    },
    {
      proudness: 8,
      tags: ['urban_sketching', 'ink', 'markers', 'pencil'],
      description: 'One of the first urban sketching pieces',
      name: 'Katoomba shop front',
      folder: '20220815-katoomba-shop-front',
      filename: '20220815_103541.jpg'
    },
    {
      proudness: 8,
      tags: ['urban_sketching', 'markers', 'ink', 'pencil'],
      description: 'I mostly worked from the photo here. A bit exagurated perspective.',
      name: 'Central Villages Anglican Church, Lawson',
      folder: '20220828-church-2',
      filename: '20220828_010803.jpg'
    },
    {
      proudness: 8,
      tags: ['urban_sketching', 'watercolor', 'pencil', 'ink', 'inkwash'],
      description: 'Done in 2 hours during Blue Mountains urban sketchers meetup.',
      name: 'Katoomba court',
      folder: '20230415-Katoomba-court',
      filename: '20230415_022335.jpg'
    },
    {
      proudness: 7,
      tags: ['urban_sketching', 'ink', 'markers'],
      description: 'Our local football club house. I tried to make it more curvy barel distortion style.',
      name: 'Football club house',
      folder: '20220813-football-club-house',
      filename: '20220813_014229.jpg'
    },
    {
      proudness: 7,
      tags: ['urban_sketching', 'watercolor', 'ink'],
      description: '2h urban sketching project with Blue Mountains urban sketchers',
      name: 'Norman Lindsay studio',
      folder: '20230819-museum',
      filename: '20230819_090806.jpg'
    },
    {
      proudness: 7,
      tags: ['urban_sketching', 'watercolor', 'ink'],
      description: '2h urban sketching project with Blue Mountains urban sketchers',
      name: 'Penrith Anglican Church',
      folder: '20230916-church',
      filename: '20230916_034803.jpg'
    },
    {
      proudness: 6,
      tags: ['gouache'],
      description: 'My wife needed a painting for the puja so I quickly made a reproduction of a painting found on internet.',
      name: 'Furious Durga reproduction',
      folder: '20221002-furious-got-reproduction',
      filename: '20221002_045007.jpg'
    },
    {
      proudness: 6,
      tags: ['ink', 'markers'],
      description: 'An evening sketch of George',
      name: 'Teddy Bears',
      folder: '20230211-plush-bear-sketch',
      filename: '20230211_123253.jpg'
    },
    {
      proudness: 6,
      tags: ['pencil', 'ink', 'inkwash'],
      description: 'An evening sketch of a toy I got from a friend fron NZ',
      name: 'New zealand plush toy',
      folder: '20230217-new-zeland-toy',
      filename: '20230217_013800.jpg'
    },
    {
      proudness: 6,
      tags: [],
      description: '',
      name: 'Flower',
      folder: '20230303-flower',
      filename: '20230303_044950.jpg'
    },
    {
      proudness: 6,
      tags: [],
      description: '',
      name: 'Library',
      folder: '20230318-library',
      filename: '20230318_014457.jpg'
    },
    {
      proudness: 5,
      tags: [],
      description: '',
      name: 'Mountain devil',
      folder: '20221214-mountain-devil',
      filename: '20221214_115359.jpg'
    },
    {
      proudness: 5,
      tags: [],
      description: '',
      name: 'Yellow flower',
      folder: '20230104-yellow-flower',
      filename: '20230104_062321.jpg'
    },
    {
      proudness: 5,
      tags: [],
      description: '',
      name: 'Bananas',
      folder: '20230225-bananas',
      filename: '20230225_110646.jpg'
    },
    {
      proudness: 5,
      tags: [],
      description: '',
      name: 'Rug',
      folder: '20230312-rug',
      filename: '20230312_110426.jpg'
    },
    {
      proudness: 5,
      tags: [],
      description: '',
      name: 'Pencil sharpener',
      folder: '20230316-pencil-sharpener',
      filename: '20230316_120854.jpg'
    },
    {
      proudness: 5,
      tags: [],
      description: '',
      name: 'Park cover',
      folder: '20230326-park-cover',
      filename: '20230326_073333.jpg'
    },
    {
      proudness: 5,
      tags: [],
      description: '',
      name: 'Old train crain',
      folder: '20230409-old-train-crain',
      filename: '20230409_035220.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Mediation room',
      folder: '20220811-mediation-room',
      filename: '20220811_023304.jpeg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Concept scifi vehicle',
      folder: '20221031-concept-scifi-vehicle',
      filename: '20221031_095710.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Abstract 3',
      folder: '20221104-abstract-3',
      filename: '20221104_103208.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Abstract 1',
      folder: '20221118-abstract-1',
      filename: '20221118_123414.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Rose 1',
      folder: '20221130-rose-1',
      filename: '20221130_093649.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Church 1',
      folder: '20221206-church-1',
      filename: '20221206_013720.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Concept art bikes',
      folder: '20221207-concept-art-bikes',
      filename: '20221207_095450.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'White rose',
      folder: '20221207-white-rose',
      filename: '20221207_013013.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Magpie face',
      folder: '20230103-magpie-face',
      filename: '20230103_023304.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Hand skech 3',
      folder: '20230212-hand-skech-3',
      filename: '20230212_120937.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Hand skech 2',
      folder: '20230214-hand-skech-2',
      filename: '20230214_122815.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Red tool',
      folder: '20230222-red-tool',
      filename: '20230222_064905.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Capsicum',
      folder: '20230223-capsicum',
      filename: '20230223_104305.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Tomato',
      folder: '20230224-tomato',
      filename: '20230224_011802.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Shoe',
      folder: '20230226-shoe',
      filename: '20230226_125337.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Logs',
      folder: '20230301-logs',
      filename: '20230301_082448.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Cone and an egg',
      folder: '20230305-cone-and-an-egg',
      filename: '20230305_121103.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Rasberries',
      folder: '20230308-rasberries',
      filename: '20230308_123001.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Broom',
      folder: '20230310-broom',
      filename: '20230310_120548.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Flower',
      folder: '20230310-flower',
      filename: '20230310_111048.jpg'
    },
    {
      proudness: 4,
      tags: [],
      description: '',
      name: 'Library',
      folder: '20230715-library',
      filename: '20230715_030116.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Leaf',
      folder: '20220814-leaf',
      filename: '20220814_012513.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Abstract 6',
      folder: '20221022-abstract-6',
      filename: '20221022_073727.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Abstract 5',
      folder: '20221023-abstract-5',
      filename: '20221023_050248.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Abstract 4',
      folder: '20221027-abstract-4',
      filename: '20221027_043234.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Space door',
      folder: '20221028-space-door',
      filename: '20221028_030654.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Abstract 2',
      folder: '20221107-abstract-2',
      filename: '20221107_104949.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Coffe place 1',
      folder: '20230203-coffe-place-1',
      filename: '20230203_124442.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Blackberry',
      folder: '20230213-blackberry',
      filename: '20230213_081922.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Hand sketch 1',
      folder: '20230215-hand-sketch-1',
      filename: '20230215_124337.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Lemon',
      folder: '20230216-lemon',
      filename: '20230216_114947.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Knife and apple',
      folder: '20230218-knife-and-apple',
      filename: '20230218_010137.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Pastry',
      folder: '20230221-pastry',
      filename: '20230221_114324.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Eggs',
      folder: '20230302-eggs',
      filename: '20230302_011631.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Coconut and brass',
      folder: '20230309-coconut-and-brass',
      filename: '20230309_123100.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Hands',
      folder: '20230313-hands',
      filename: '20230313_114507.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Legs',
      folder: '20230314-legs',
      filename: '20230314_110634.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Lamp',
      folder: '20230319-lamp',
      filename: '20230319_010658.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Log in forest',
      folder: '20230329-log-in-forest',
      filename: '20230329_055802.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Tree',
      folder: '20230410-tree',
      filename: '20230410_054016.jpg'
    },
    {
      proudness: 3,
      tags: [],
      description: '',
      name: 'Cat',
      folder: '20230412-cat',
      filename: '20230412_093828.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Magpie',
      folder: '20220917-magpie',
      filename: '20220917_033513.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Stephen house',
      folder: '20221016-stephen-house',
      filename: '20221016_071749.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Stool',
      folder: '20221102-stool',
      filename: '20221102_120705.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Tree 1',
      folder: '20221119-tree-1',
      filename: '20221119_063741.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Swimming pool',
      folder: '20221208-swimming-pool',
      filename: '20221208_074411.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Tea bag',
      folder: '20230119-tea-bag',
      filename: '20230119_103348.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Cover flower',
      folder: '20230220-cover-flower',
      filename: '20230220_070403.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Hands',
      folder: '20230403-hands',
      filename: '20230403_122741.jpg'
    },
    {
      proudness: 2,
      tags: [],
      description: '',
      name: 'Random sketches',
      folder: '20230403-random-sketches',
      filename: '20230403_123931.jpg'
    },
    {
      proudness: 1,
      tags: [],
      description: '',
      name: 'Bw old leaf',
      folder: '20221230-bw-old-leaf',
      filename: '20221230_083143.jpg'
    },
    {
      proudness: 1,
      tags: [],
      description: '',
      name: 'Museum park sketch',
      folder: '20230219-museum-park-sketch',
      filename: '20230219_042250.jpg'
    },
    {
      proudness: 1,
      tags: [],
      description: '',
      name: 'Katyas kitchen',
      folder: '20230501-Katyas-kitchen',
      filename: '20230501_094132.jpg'
    }
  ];