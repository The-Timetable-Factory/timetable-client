import { ThemeState } from '../interfaces/theme-interfaces';

export const MILK_TEA: ThemeState = {
    TITLE: 'milk_tea',
    SUBTITLE: 'milk_tea_description',
    COLORS: [
        '#C8B6A6',
        '#A4907C',
        '#938062',
        '#E3D2C0',
        '#C2AB89',
        '#9b9382',
        '#C1A89F',
        '#A07F73',
        '#81594B',
    ],
    USED_COLORS: []
}

export const SESAME: ThemeState = {
    TITLE: 'sesame',
    SUBTITLE: "sesame_description",
    COLORS: [
        '#23201F',
        '#42423D',
        '#494949',
        '#524B45',
        '#686A68',
        '#696058',
        '#A39589',
        '#B7B1AD',
        "#D4D3CE",
    ],
    USED_COLORS: []
}

export const THEMES = [MILK_TEA, SESAME]
