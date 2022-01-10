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
        shortSummary: "3D printed Plasma Blaster from Halo where I tried paint chipping and my own vinyl cut stencil for pattern effect.",
    },
];