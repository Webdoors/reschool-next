import { CourseModel } from "./courseModel";
import { Group } from "./groupModel";

export interface User {
  _id?: string;
  name_ka: string;
  name_en: string;
  lastName_ka: string;
  lastName_en: string;
  email: string;
  phone: string;
  photo?: string;
  role?: "admin" | "mentor" | "student";
  id_number?: string;
  gender_id?: number;
  age?: number;
  social_page?: string;
  birth_date?: string;
  password: string;
  confirmPassword: string;
  about_ka?: string,
  about_en?: string,
  courses?: Group[],
  instagram?: string,
  facebook?: string,
  linkedin?: string,
  speciality?: string,
  twitter?: string,
  groupName?: string,
  groupId?: string,
  top?: number,
github?: string,
groups?: [Group],
mentorCourses?: [CourseModel],
groupPayments?: [{[key: string]: number}]
scores?: [{groupId: string, scoreValue: number}]
certificates?: [{groupId: string, pdfUrl: number}]
}
