import { create } from 'zustand'
import dayjs from 'dayjs'
import { courseInfo } from '@/app/lib/interfaces/courses-interfaces'
import { persist, createJSONStorage } from 'zustand/middleware'
import { meetingTime } from '@/app/lib/interfaces/courses-interfaces'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

interface CoursesState {
    courses: courseInfo[],
    upsertCourse: (newCourse: courseInfo) => void,
    removeCourse: (courseId: string) => void
    setCourses: (newCourses: courseInfo[]) => void
}

export const useCoursesStore = create<CoursesState>()(
    persist((set, get) => ({
        courses: [],
        upsertCourse: (newCourse: courseInfo) => {
            if (newCourse.existed) {
                console.log('existed')
                set((state: any) => {
                    const index = state.courses.findIndex((course: courseInfo) => course.id === newCourse.id)
                    const newCourses = [...state.courses]
                    newCourses[index] = newCourse
                    return { courses: newCourses }
                })
            } else {
                console.log('not existed')
                newCourse.existed = true
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
        },
        setCourses: (newCourses: courseInfo[]) => {
            set((state: any) => {
                console.log('newCourses ', newCourses)

                return { courses: newCourses }
            })
        }
    }),
        {
            name: 'courses',
            storage: createJSONStorage(() => localStorage, {
                reviver: (key, value: any) => {
                    if (value && value.type === 'dayjs') {
                        return dayjs.utc(value.value)
                    }
                    return value

                },
                replacer: (key, value) => {
                    if (key === 'startTime' || key === 'endTime') {
                        return { type: 'dayjs', value: value }
                    }

                    return value
                }
            })
        }
    ))