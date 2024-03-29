import { MILK_TEA, SESAME } from "../constants/theme-constants";

export function getTheme(theme: string) {
    switch (theme) {
        case "Milk Tea":
            return MILK_TEA
        case "Sesame":
            return SESAME
        default:
            return MILK_TEA

    }
}

export function getAvaliableColors(colors: string[], used_colors: string[]) {
    const color = colors.filter(color => !used_colors.includes(color))[0]
    if (color) {
        return color
    }
    return colors[0]
}