import CourseContainer from '../containers/course/course';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

import { CourseModel } from '../models/courseModel';
const CoursePage: React.FC = ()=>{
const activeCourse =  useSelector((state: RootState)=>state.coursesState.activeCourse)
return <CourseContainer course={(activeCourse as CourseModel)}/>
}


export default CoursePage