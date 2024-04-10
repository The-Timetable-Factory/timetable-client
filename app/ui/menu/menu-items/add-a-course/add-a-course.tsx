import CourseInfoForm from "../../inputs/course-info-form/course-info-form"
import Collapsible from "../../collapsible/Collapsible";
import { generateEmptyMeetingTime } from "@/app/lib/interfaces/courses-interfaces"
import { v4 } from "uuid";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAvaliableColors } from "@/app/lib/utils/styling-theme";
import { useThemeStore } from "@/app/lib/store/theme-store";

export default function AddACourse() {
    const COLORS = useThemeStore((state: any) => state.theme.COLORS)
    const USED_COLORS = useThemeStore((state: any) => state.theme.USED_COLORS)
    const backgroundColor = getAvaliableColors(COLORS, USED_COLORS)
    return (

        <Collapsible
            title="Add A Course"
            icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />}
            backgroundColor="#DAD6CE"
            isCourse={false}
        >


            <CourseInfoForm id={v4()} courseCode="" backgroundColour={backgroundColor} meetingTimes={[generateEmptyMeetingTime()]} existed={false} />
        </Collapsible>

    )
}