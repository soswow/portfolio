import { Project } from "./types";

export const projectList: Project[] = [
    {
        name: 'mandalorian-helmet',
        title: 'Mandalorian helmet',
        skills: [
            '3D printing', '3D modelling',
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
        shortSummary: "I've 3D modelled from scratch, printed and painted a gun from Final Space show.",
        status: 'Done',
        parts: [
            { name: 'References' },
            { name: 'Outline' },
            { name: '3D Modelling' },
            { name: '3D Printing' },
            { name: 'Priming and Sanding' },
            { name: 'Painting' },
            { name: 'Result' },
        ],
        skills: ['3D modelling', '3D printing', 'Airbrush painting', 'Surface prep']
    },
    {
        name: 'orville-pm-32',
        title: 'PM-32 gun from Orville',
        shortSummary: "I've 3D modelled from scratch, printed and painting a gun from Orville show.",
        status: 'WIP',
        parts: [
            { name: 'References' },
            { name: '2D outline' },
            { name: '3D Modelling' },
            { name: '3D Printing' },
            { name: 'Sanding and prepping' },
            { name: 'Painting' },
        ],
        skills: ['3D modelling', '3D printing', 'Airbrush painting', 'Surface prep']
    },
    {
        name: 'star-track-discovery-section-31-badge',
        title: 'Section 31 badge from Star Trek Discovery',
        shortSummary: "I've 3D modelled from scratch, printed and painting a badge from Star Trek Discovery.",
        status: 'Done',
        parts: [
            { name: 'References' },
            { name: 'Outline' },
            { name: '3D Modelling' },
            { name: '3D Printing' },
            { name: 'Priming and sanding' },
            { name: 'Painting' },
            { name: 'Result' },
        ],
        skills: ['3D modelling', '3D printing', 'Airbrush painting', 'Surface prep']
    },
    {
        name: 'atlassian-christmas-ornament',
        title: 'Atlassian themed Christmas tree ornament',
        shortSummary: "This was very special present for two important people.",
        status: 'Done',
        parts: [
            { name: '3D Modelling' },
            { name: '3D Printing' },
            { name: 'Aceton vapour smoothing' },
            { name: 'Masking and glitter' },
            {
                name: 'Packeging',
                title: 'Packaging'
            },
            { name: 'Result' },
        ],
        skills: ['3D modelling', 'Own design', '3D printing', 'Surface prep', 'Vapour smoothing']
    },
    {
        name: 'led-tie',
        title: 'Wearable programmable tie',
        shortSummary: "Custom designed a programable LED tie that can react to music",
        status: 'Done',
        parts: [
            {name: '3D Modelling'},
            {name: '3D printing'},
            {name: 'Rig and glueing'},
            {name: 'Rig and soldering'},
            {name: 'Fixing dead pixel'},
            {name: 'Accembly'},
            {name: 'Programming'},
            {name: 'Testing'},
            {name: 'Electronics'},
            {name: 'Result'},
        ],
        skills: ['Own design', 'Electronics', '3D modelling', '3D printing', 'Wearable']
    },
    {
        name: 'emergency-beard-trimmer',
        title: 'Emergency Beard trimmer',
        shortSummary: "This was a joke present to someone who is letting his beard go loose for too much.",
        status: 'Done',
        parts: [
            { name: 'Idea Sketch' },
            { name: 'Trimmer size measurment' },
            { name: '3D Modelling' },
            { name: 'Aceton vapour smoothing' },
            { name: 'Dry fit' },
            { name: 'Tools making' },
            { name: 'Box contruction' },
            { name: 'Glass cutting' },
            { name: 'Sticket cutting', title: 'Sticker cutting' },
            { name: 'Glass channel' },
            { name: 'Embedded lights' },
            { name: 'Fixing a mistake' },
            { name: 'Logo on trimmer' },
            { name: 'Varnishing' },
            { name: 'Electronics' },
            { name: 'Priming and sanding' },
            { name: 'Result' },
        ],
        skills: ['3D modelling', 'Own design', '3D printing', 'Vapour smoothing', 'Wood working', 'Electronics']
    },
    {
        name: 'star-lord-blaster',
        title: "Star-Lord's Quad Blaster",
        shortSummary: "Printed and painted my own Quad Blaster.",
        status: 'Done',
        parts: [            
            {name: '3D Printing'},
            {name: 'Sanding'},
            {name: 'Accembly'},
            {name: 'Painting'},
            {name: 'Chipped paint'},
            {name: 'Stencil'},
            {name: 'Result'},
        ],
        skills: ['3D printing', 'Airbrush painting', 'Chipping paint', 'Surface prep']
    },
    {
        name: 'red-hr-button',
        title: 'Big HR button',
        shortSummary: 'It was a joke item I designed and made for fun.',
        status: 'Done',
        parts: [
            {name: '3D Modelling'},
            {name: '3D Printing'},
            {name: 'Electronics'},
            {name: 'Result'},
        ],
        skills: ['3D modelling', 'Own design', 'Electronics']
    },
    {
        name: 'miniatures',
        title: 'Various miniatures',
        shortSummary: "Some miniatures I've painted",
        status: 'Done',
        parts: [
            {name: 'Space Marine'},
            {name: 'Space Marine outriders'},
            {name: 'Stormcast Eternals gryph-hound'},
        ],
        skills: ['3D printing', 'Airbrush painting', 'Brush painting'],
    },
    // {
    //     name: 'various-painted-prints',
    //     title: 'Various painted prints',
    //     shortSummary: "There were many 3D prints I've painted",
    //     parts: [

    //     ]
    // }
];