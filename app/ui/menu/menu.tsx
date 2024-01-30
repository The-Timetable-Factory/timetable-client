
import PickADisplay from "./menu-items/pick-a-display/PickADisplay";
import Collapsible from "./collapsible/Collapsible";
import DevicesIcon from '@mui/icons-material/Devices';

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

            </div>
        </>
    )
}