import { Project } from "./types";
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
                { "src": resourceFullPath, "type": isMP4 ? "video/mp4" : "video/quicktime"}
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

I liked it. I wanted to make a prop from the show. It was clear that the main banana-shaped blaster would become an obvious choice for many prop makers. To be a bit special I've chosen PM-32 gun. At the time when I started modelling there was no model done by anyone. So naturally, I've taken it upon myself as a challenge to model and make it from start to finish. As you can see "finish" hasn't come just yet. Soon.`
        ],
        status: 'WIP',
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

Going forward what I still need to do is:
* more white coats to get rid of blue tint
* paint 3 parts flat aluminium
* Add heat scorched metal effect on the barrel and its shroud
* Glue all together and varnish
`]
            },
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
                name: 'Lights',
                description: [`
`]
            },
        ],
        skills: ['Own design', 'Woodworking', '3D modelling']
    }
];