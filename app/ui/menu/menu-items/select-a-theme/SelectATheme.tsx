"use client"
import Collapsible from "../../collapsible/Collapsible";
import ColorPalattes from "./color-palettes/ColorPalettes";
import { THEMES } from "../../../../lib/constants/theme-constants";
import { getTheme } from "../../../../lib/utils/styling-theme";
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { themeStore } from "@/app/lib/store/theme-store";
import { ThemeState } from "@/app/lib/interfaces/theme-interfaces";

export default function SelectATheme() {

    const { TITLE } = themeStore((state: any) => state.theme)
    const updateTheme = themeStore((state: any) => state.updateTheme)

    function handleChecked(value: string) {
        updateTheme(getTheme(value))
    }


    return (
        <>
            {/* <div className="menuItemContainer"> */}
            <Collapsible
                title="Select A Theme"
                icon={<StyleOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
            >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr)", gap: "1px", justifyContent: "center" }}>

                    {
                        THEMES.map(theme => {
                            return (
                                <ColorPalattes
                                    key={theme.TITLE}
                                    theme={theme}
                                    handleChange={handleChecked}
                                    checked={TITLE == theme.TITLE} />
                            )
                        })
                    }
                </div>
            </Collapsible>
            {/* </div> */}
        </>
    )

}