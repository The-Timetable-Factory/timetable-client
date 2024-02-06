
import PickADisplay from "./menu-items/pick-a-display/PickADisplay";
import SelectATheme from "./menu-items/select-a-theme/SelectATheme";
import Styling from "./menu-items/styling/Styling"
import CourseInfoForm from "./inputs/course-info-form/course-info-form"
import Collapsible from "./collapsible/Collapsible";
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';

export default function Menu() {
    return (
        <>
            <div className="menuContainer">
                <Collapsible
                    title={"Pick A Display"}
                    component={<PickADisplay />}
                    icon={<DevicesOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                    backgroundColor="#DAD6CE"
                    isCourse={false} />

                <Collapsible
                    title={"Select A Theme"}
                    component={<SelectATheme />}
                    icon={<StyleOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                    backgroundColor="#DAD6CE"
                    isCourse={false} />

                <Collapsible
                    title={"Styling"}
                    component={<Styling />}
                    icon={<ColorLensOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                    backgroundColor="#DAD6CE"
                    isCourse={false} />

                <Collapsible
                    title={"Add A Course"}
                    component={<CourseInfoForm />}
                    icon={<AddCircleOutlineOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                    backgroundColor="#DAD6CE"
                    isCourse={false} />

            </div>
        </>
    )
}