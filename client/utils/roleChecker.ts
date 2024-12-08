import Cookies from 'js-cookie'

export const isStudent = (): boolean => Number(Cookies.get('role')!) == 1
export const isTeacher = (): boolean => Number(Cookies.get('role')!) == 2
export const isAdmin = (): boolean => Number(Cookies.get('role')!) == 3
