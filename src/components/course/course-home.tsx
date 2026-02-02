import { BsLightningCharge } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { ImMagicWand } from "react-icons/im";
import { IoIosCube } from "react-icons/io";
import { img_route_courses, img_route_icons } from "../../api/endPoints";
//import courseImage from "../../img/blog/2.jpg";
import { CourseModel } from '../../models/courseModel';
import { PropsFn } from '../../models/propsFn';
import IconImage from "../../ui/iconImage/iconImage";



const CourseCardHome: React.FC<{courseClicked: (course: CourseModel)=>any,course: CourseModel, index: number}> = (props)=>{

    const courseClickHandler = ()=>{
        props.courseClicked(props.course)
    }

    


    return    <div  onClick={courseClickHandler} className="col-lg-3 col-md-6 items courses-s md-mb30">
    <div className="item wow fadeIn" data-wow-delay=".3s">
      <span className="icon">
        {/* <i className="ion-ios-monitor" /> */}
    
        {/* {  props.index ===0 ? <FiMonitor  />: 
      props.index ===1? 
      <BsLightningCharge/>:   props.index ===2?    <IoIosCube/>
    :    <ImMagicWand/> }  */}
    {  props.course?.mentorPhoto ==='გიგი.png'? <IoIosCube/> : !props.course?.courseIcon? <IoIosCube/> : <IconImage src={img_route_icons+props.course?.courseIcon} alt="course icon" withClass={props.course?.mentorPhoto ==='გიგი.png'}/>}
  

      </span>
      <h5 className="text-white" >{props?.course.shortName}</h5>
      <p>{props.course.shortDescription?.slice(0,130)}</p>
      <a onClick={courseClickHandler} className="more-stroke"><span /></a>
    </div>
    
    </div>







}


export default CourseCardHome