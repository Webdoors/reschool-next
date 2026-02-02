import { Group } from './groupModel';
import { DataTypes } from './dataType';
import { User } from './userModel';

export interface SilabusObj {
    name: string, data: string[]
}
export interface CourseModel {
    id: string,
    _id: string,
    name_ka: string,
    name_en: string,
    shortName: string,
    metaData?: String,
    groups: [Group],
    shortDescription: String,
    detailDescription : String,
    results_ka : String,
    results_en : String,
    additionalmodules : String,
    image: String,
    subject?: [],
   students?: [],
   mentors?: [User?],
   active?: boolean,
   schedule_ka: [string],
   schedule_en: [string],
   courseIcon: string,
   showHide: string,
   top: string,
    module_id: string,
   level: string,
   payze: string,
   times: [string],
   numberOfLectures_ka: string,
   numberOfLectures_en: string,
   startDate_ka: string,
   startDate_en: string,
   type: DataTypes.COURSE,
   waitingLeast: string[]
   courseId: string,
   photo?: string,
   price: number
   location_ka: string,
   location_en: string,
   partnerCount: number,
   purpose_ka: string,
   purpose_en: string,
   educational_requirement_ka: string,
   technical_requirement_ka: string,
   educational_requirement_en: string,
   technical_requirement_en: string,
   silabus: [SilabusObj[]],
   mentor?: string,
   mentorPhoto?: string,
   payzePhoto: string,
   days: string,
   time: string
computer_requirement?: any,
 
   
}