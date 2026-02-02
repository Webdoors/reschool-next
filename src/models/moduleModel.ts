import { DataTypes } from './dataType';
export interface ModuleModel {
    _id: string,
    id: string,
    name_ka: string,
    description_ka: string,
    name_en: string,
    description_en: string,
    mentor: string,
    photo: string,
    mentorphoto: string,
    locations: string,
    text_ka: string,
    text_en: string,
    courses:[],
    modules:[],
    showHide:string
    


}