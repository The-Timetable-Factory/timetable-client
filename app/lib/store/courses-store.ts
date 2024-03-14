import { create } from 'zustand'
import dayjs from 'dayjs'
import { courseInfo } from '@/app/lib/interfaces/courses-interfaces'
import { persist } from 'zustand/middleware'

export const useCoursesStore = create(
    persist((set, get) => ({
        courses: [] as courseInfo[],
        addCourse: (newCourse: courseInfo) => {
            set((state: any) => {
                if (newCourse.existed) {
                    const index = state.courses.findIndex((course: courseInfo) => course.id === newCourse.id)
                    const newCourses = [...state.courses]
                    newCourses[index] = newCourse
                    return { courses: newCourses }
                }
                return { courses: [...state.courses, newCourse] }
            })
        },
        removeCourse: (course: courseInfo) => {
            set((state: any) => {
                const newCourses = state.courses.filter((c: courseInfo) => c.id !== course.id)
                return { courses: newCourses }
            })
        }
    }),
        { name: 'courses' }
    ))

