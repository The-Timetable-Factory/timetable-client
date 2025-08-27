import CourseInfoForm from "../../inputs/course-info-form/course-info-form"
import Collapsible from "../../collapsible/Collapsible";
import { generateEmptyMeetingTime } from "@/app/lib/interfaces/courses-interfaces"
import { v4 } from "uuid";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAvaliableColors } from "@/app/lib/utils/styling-theme";
import { useThemeStore } from "@/app/lib/store/theme-store";
import { useTranslation } from "react-i18next";

export default function AddACourse() {
    const COLORS = useThemeStore((state: any) => state.theme.COLORS)
    const USED_COLORS = useThemeStore((state: any) => state.theme.USED_COLORS)
    const backgroundColor = getAvaliableColors(COLORS, USED_COLORS)
    const { t } = useTranslation()
    return (

        <Collapsible
            title={t("add_a_course")}
            icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />}
            backgroundColor="#DAD6CE"
            isCourse={false}
        >
            <CourseInfoForm id={v4()} courseCode="" backgroundColor={backgroundColor} meetingTimes={[generateEmptyMeetingTime()]} existed={false} />
        </Collapsible>

    )
}