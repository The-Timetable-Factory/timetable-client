import CourseInfoForm from "../../inputs/course-info-form/course-info-form"
import Collapsible from "../../collapsible/Collapsible";
import { generateEmptyMeetingTime } from "@/app/lib/interfaces/courses-interfaces"
import { v4 } from "uuid";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddACourse() {

    return (

        <Collapsible
            title="Add A Course"
            icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />}
            backgroundColor="#DAD6CE"
            isCourse={false}
        >


            <CourseInfoForm id={v4()} courseCode="" backgroundColour="" meetingTimes={[generateEmptyMeetingTime()]} existed={false} />
        </Collapsible>

    )
}