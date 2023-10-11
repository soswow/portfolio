import { ThemeAppearance } from "@atlaskit/lozenge";
import { TagColor } from "@atlaskit/tag/dist/types/types";

export type Skill = 
    | '3D printing'
    | '3D modelling'
    | 'Surface prep'
    | 'Spray painting'
    | 'Airbrush painting'
    | 'Brush painting'
    | 'Chipping paint'
    | 'Stencil making'
    | 'Weathering'
    | 'Own design'
    | 'Vapour smoothing'
    | 'Woodworking'
    | 'Electronics'
    | 'Wearable';

export const skillToColourMap: Partial<Record<Skill, TagColor>> = {
    "3D printing": 'redLight',
    "3D modelling": 'purpleLight',
    'Own design': 'yellow',
    'Electronics': 'tealLight',
};

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
    myFavourite?: boolean;
}

export type VisualArtTag  = 'graphite' | 'ink' | 'inkwash' | 'watercolor' | 'markers' | 'urban_sketching' | 'digital';

export interface VisualArtPiece {
    name: string;
    filename: string;
    folder: string;
    proudness: number; // 0 - 10
    tags?: VisualArtTag[];
    description?: string;
}