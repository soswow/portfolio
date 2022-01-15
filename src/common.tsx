/** @jsx jsx */
import { jsx } from "@emotion/react";
import { SimpleTag } from "@atlaskit/tag"
import TagGroup from "@atlaskit/tag-group"
import { Skill, skillToColourMap } from "./types"

export const sortSkills = (skills: Skill[]) => {
    skills.sort((skillA, skillB) => {
        const hasColorA = skillToColourMap[skillA] ? 1 : 0;
        const hasColorB = skillToColourMap[skillB] ? 1 : 0;
        const hasColorDiff = hasColorB - hasColorA;
        return hasColorDiff !== 0 ? hasColorDiff : skillB > skillA ? 1 : -1;
    });
}

export const renderSkills = (skills: Skill[]) => {
    sortSkills(skills);
    return <TagGroup>
        {skills.map(skill => <SimpleTag key={skill} text={skill} color={skillToColourMap[skill]} />)}
    </TagGroup>
}