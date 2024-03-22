'use client'

// import menu items
import PickADisplay from "./menu-items/pick-a-display/pick-a-display";
import SelectATheme from "./menu-items/select-a-theme/SelectATheme";
import Styling from "./menu-items/styling/Styling"
import AddACourse from "./menu-items/add-a-course/add-a-course";
import DownloadImage from "./menu-items/download-image/download-image";
import SaveAsPDF from "./menu-items/save-as-pdf/save-as-pdf";
import { useCoursesStore } from "@/app/lib/store/courses-store";
import { courseInfo } from "@/app/lib/interfaces/courses-interfaces";
import CourseInfoForm from "./inputs/course-info-form/course-info-form";
import Collapsible from "./collapsible/Collapsible";
import EditIcon from '@mui/icons-material/Edit';

import useStore from "@/app/lib/hooks/useStore";


export default function Menu() {
    // const courses = useStore(useCoursesStore, (state: any) => state.courses)
    const courses = useCoursesStore((state: any) => state.courses)
    console.log("courses " + courses)

    return (
        <>
            <div className="menuContainer">

                <PickADisplay />

                <SelectATheme />

                <AddACourse />

                {
                    courses.map((course: courseInfo) => {
                        return (
                            <Collapsible
                                key={course.id}
                                title={course.courseCode}
                                icon={<EditIcon sx={{ position: "absolute", right: "4%" }} />}
                                backgroundColor={course.backgroundColour}
                                isCourse={true}
                            >
                                <CourseInfoForm
                                    key={course.id}
                                    {...course}
                                />
                            </Collapsible>
                        )
                    })
                }

                <Styling />

                <DownloadImage />

                <SaveAsPDF />
            </div>
        </>
    )
}