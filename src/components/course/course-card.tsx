import {  img_route_courses } from "../../api/endPoints";

import { CourseModel } from '../../models/courseModel';
import React from "react";
import {useTranslation} from "react-i18next";



const CourseCard: React.FC<{courseClicked: (course: CourseModel)=>any,course: CourseModel, index: number,custom:any}> = (props)=> {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const courseClickHandler = () => {
        props.courseClicked(props.course)

    }


    return     <div  onClick={courseClickHandler}
                className={`col-lg LEVELS ${props?.custom?.id===props.course?.id? 'active' : ''} text-center py-4`}
                style={{cursor: "pointer"}} >
        {lang === 'ka' ? (
            <>{props.course.name_ka}</>
        ) : (
            <>{props.course.name_en}</>
        )}
       </div>
}


export default CourseCard