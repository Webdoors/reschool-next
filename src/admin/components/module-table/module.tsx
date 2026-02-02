import React from 'react'
import { User } from '../../../models/userModel'
import img from '../../../img/mentors/ლუკა.png'
import {IoIosArrowDown} from 'react-icons/io'
import ShowIf from '../../../utils/showIf'
import { img_route, img_route_courses } from '../../../api/endPoints'
import { CourseModel } from '../../../models/courseModel'
import { FaUserEdit } from 'react-icons/fa'

export const ModuleTable: React.FC<{course: CourseModel, moduleEditStarted: ()=> void, toggleId: string, toggleIdHandler: (id?: string)=>void, showGroups?: boolean, showMentors?: boolean }> = (props)=> {
  let   imgUrl = `${img_route_courses + props.course?.photo || 'default.jpeg'}`




  const editClicked =()=>{
    props.moduleEditStarted()
  }
    return  <React.Fragment>


         <tr onClick={()=>props.toggleIdHandler(props.course?._id)}>
                <td className="table-plus">
                  <div className="name-avatar d-flex align-items-center">
                    <div className="avatar mr-2 flex-shrink-0">
                      <IoIosArrowDown className={`a-arrow ${props.toggleId ===props.course?._id? 'arrow_rotate': ''} arrow--mob`} />
                      <img
                       src={`     ${imgUrl}`}
                        className="border-radius-100 shadow"
                        width={40}
                        height={40}
                        alt=""
                        style={{width: '40px', height: "40px", marginRight: '10px'}}
                      />
                                
                    </div>
                    <div className="txt">
                      <div className="weight-600">{props.course.name_ka} </div>
                    </div>
                  </div>
                </td>
                <td className='id_desktop'> {props.showGroups? props.course?.days : props.course?.price} </td>
                <td  className='phone_desktop'>{props.showGroups? props.course?.time : props.course?.startDate_ka} </td>
                <td  className='imeil_desktop'> {props.showGroups? props?.course?.students && props.course.students.length || 0 : props.course?.numberOfLectures_ka}</td>
                <td  className='id_desktop' style={{cursor: 'pointer'}} onClick={editClicked} > <FaUserEdit size={'25px'} color="#12c2e9" /></td>
             
               
              </tr>
              <tr className='child_wrapper--mob ' >
                <td className={`child  ${props.toggleId ===props.course?._id? 'child-show': ''}`} >
                <div className='child_wrapper child_wrapper--mob  id_mobile'>
              <h5 className='child_title ' > {props.showGroups? 'დღეები' : 'ფასი'}</h5>
                <span className='child_name' >  {props.showGroups? props.course?.days : props.course?.price} </span>
              </div>
              <div className='child_wrapper child_wrapper--mob phone_mobile'>
              <h5 className='child_title' > {props.showGroups? 'საათები' : 'დაწყების თარიღი'} </h5>
                <span className='child_name' > {props.showGroups? props.course?.time : props.course?.startDate_ka} </span>
              </div>
                <div className='child_wrapper child_wrapper--mob  group_mobile '>
              <h5 className='child_title ' >  {props.showGroups? 'მენტორი' : 'შეხვედრების რაოდენობა'} </h5>
                <span className='child_name' > {props.showGroups? props?.course?.students && props.course.students.length || 0 : props.course?.numberOfLectures_ka}  </span>
              </div>
              
              <div className='child_wrapper child_wrapper--mob  id_mobile '>
              <h5 className='child_title ' > რედაქტირება</h5>
                <span className='child_name' onClick={editClicked}   > <FaUserEdit size={'25px'} color="#12c2e9" /></span>
              </div>
        
               
        
           

                </td>
              </tr>
    </React.Fragment>
}







export default ModuleTable