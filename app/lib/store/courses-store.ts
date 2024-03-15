import { create } from 'zustand'
import dayjs from 'dayjs'
import { courseInfo } from '@/app/lib/interfaces/courses-interfaces'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CoursesState {
    courses: courseInfo[],
    test: (newCourse: courseInfo) => void,
    removeCourse: (courseId: string) => void
}

export const useCoursesStore = create<CoursesState>()(
    persist((set, get) => ({
        courses: [] as courseInfo[],
        test: (newCourse: courseInfo) => {
            console.log('add courses store test')
            console.log(newCourse)
            if (newCourse.existed) {
                console.log('existed')
                set((state: any) => {
                    const index = state.courses.findIndex((course: courseInfo) => course.id === newCourse.id)
                    const newCourses = [...state.courses]
                    newCourses[index] = newCourse
                    return { courses: newCourses }
                })
            } else {

                set((state: any) => {
                    return { courses: [...state.courses, newCourse] }

                })
            }
        },
        removeCourse: (courseId: string) => {
            set((state: any) => {
                const newCourses = state.courses.filter((c: courseInfo) => c.id !== courseId)
                return { courses: newCourses }
            })
        }
    }),
        {
            name: 'courses',
            onRehydrateStorage: (state) => {
                for (let course of state.courses) {
                    for (let meetingTime of course.meetingTimes) {
                        meetingTime.startTime = dayjs(meetingTime.startTime)
                        meetingTime.endTime = dayjs(meetingTime.endTime)
                    }
                }
            },
            storage: createJSONStorage(() => localStorage, {
                reviver: (key, value) => {
                    const courses = value as courseInfo[]; // Add type assertion here
                    for (let course of courses) {
                        for (let meetingTime of course.meetingTimes) {
                            meetingTime.startTime = dayjs(meetingTime.startTime);
                            meetingTime.endTime = dayjs(meetingTime.endTime);
                        }
                    }
                    return courses;
                }
            })
        }
    ))

