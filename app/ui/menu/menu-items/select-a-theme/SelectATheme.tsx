import ColorPalattes from "./color-palettes/ColorPalettes";
import { THEMES } from "../../../../lib/data/theme-constants";

export default function SelectATheme() {

    function handleChecked() {
        console.log('checked')
    }

    return (
        <>
            <div className="menuItemContainer">

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr)", gap: "1px", justifyContent: "center" }}>

                    {
                        THEMES.map(theme => {
                            return (
                                <>
                                    <ColorPalattes
                                        theme={theme}
                                        handleChange={handleChecked}
                                        checked={false} />
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

}