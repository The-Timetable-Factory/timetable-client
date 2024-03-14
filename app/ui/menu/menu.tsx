

// import menu items
import PickADisplay from "./menu-items/pick-a-display/pick-a-display";
import SelectATheme from "./menu-items/select-a-theme/SelectATheme";
import Styling from "./menu-items/styling/Styling"
import AddACourse from "./menu-items/add-a-course/add-a-course";
import DownloadImage from "./menu-items/download-image/download-image";
import SaveAsPDF from "./menu-items/save-as-pdf/save-as-pdf";


export default function Menu() {
    return (
        <>
            <div className="menuContainer">

                <PickADisplay />

                <SelectATheme />

                <AddACourse />

                <Styling />

                <DownloadImage />

                <SaveAsPDF />
            </div>
        </>
    )
}