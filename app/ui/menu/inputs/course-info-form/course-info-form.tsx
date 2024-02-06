import { meetingTime, generateEmptyMeetingTime } from "@/app/lib/interfaces/coursesInterfaces";
import MeetingTimeForm from "./meeting-time-form/meeting-time-form";

export default function CourseInfoForm() {
    const initialMeetingTime = generateEmptyMeetingTime()
    function handleRemoveMeetingTime(index: number) {

    }

    function handleMeetingTimeSchedulesChange(index: number, meetingTime: meetingTime) {

    }
    return (
        <>
            <form>

                <MeetingTimeForm
                    key={1}
                    id={1}
                    length={1}
                    handleRemoveMeetingTime={handleRemoveMeetingTime}
                    meetingTime={initialMeetingTime}
                    handleMeetingTimeSchedulesChange={handleMeetingTimeSchedulesChange}
                />
            </form>
        </>
    );
}

