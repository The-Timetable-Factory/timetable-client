
import PickADisplay from "./menu-items/pick-a-display/PickADisplay";
import SelectATheme from "./menu-items/select-a-theme/SelectATheme";
import Styling from "./menu-items/styling/Styling"
import Collapsible from "./collapsible/Collapsible";
import DevicesIcon from '@mui/icons-material/Devices';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import StyleIcon from '@mui/icons-material/Style';

export default function Menu() {
    return (
        <>
            <div className="menuContainer">
                <Collapsible
                    title={"Pick A Display"}
                    component={<PickADisplay />}
                    icon={<DevicesIcon sx={{ position: "absolute", right: "4%" }} />}
                    backgroundColor="#DAD6CE"
                    isCourse={false} />

                <Collapsible
                    title={"Select A Theme"}
                    component={<SelectATheme />}
                    icon={<StyleIcon sx={{ position: "absolute", right: "4%" }} />}
                    backgroundColor="#DAD6CE"
                    isCourse={false} />

                <Collapsible
                    title={"Styling"}
                    component={<Styling />}
                    icon={<ColorLensIcon sx={{ position: "absolute", right: "4%" }} />}
                    backgroundColor="#DAD6CE"
                    isCourse={false} />

            </div>
        </>
    )
}