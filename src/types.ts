import { ThemeAppearance } from "@atlaskit/lozenge";

export type Skill = 
    | '3D printing'
    | '3D modelling'
    | 'Surface prep'
    | 'Spray painting'
    | 'Airbrush painting'
    | 'Chipping paint'
    | 'Stencil making'
    | 'Weathering';

export type Status = 'Done' | 'WIP';
export const statusToLozengeAppearanceMap: Record< Status, ThemeAppearance> = {
    'Done': 'success',
    'WIP': 'inprogress',
}
export interface Part{
    name: string;
    title?: string;
    description?: string[];
}

export interface Project {
    name: string;
    title: string;
    skills: Skill[];
    status: Status;
    shortSummary: string;
    description?: string[];
    parts: Part[];
}