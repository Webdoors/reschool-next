import React from 'react'
import { User } from '../../../models/userModel'
import img from '../../../img/mentors/ლუკა.png'
import {IoIosArrowDown} from 'react-icons/io'
import ShowIf from '../../../utils/showIf'
import { img_route } from '../../../api/endPoints'
import { FaUserEdit} from 'react-icons/fa'
import { Group } from '../../../models/groupModel'
export const UsersTable: React.FC<{student: User, toggleId: string, toggleIdHandler: (id?: string)=>void, showGroups?: boolean, showMentors?: boolean, groups: Group[], userEditClicked: ()=>void }> = (props)=> {
  let imgUrl = `${img_route}${props.student?.photo}`

  const returnGroupPrice = ()=> {
    let price: number =0;

    if(props.student?.groupId){
    const found =  props.student.groupPayments?.find(payment=> payment[props.student?.groupId as string || ''])

    if(found){
      price =found[props.student?.groupId as string ]
    }
    }
    return price
  }

  const editClicked = (e: React.MouseEvent<HTMLElement>)=>{
    props.userEditClicked()
    e.stopPropagation()
  }
    return  <React.Fragment>


         <tr onClick={()=>props.toggleIdHandler(props.student?._id)}>
                <td className="table-plus">
                  <div className="name-avatar d-flex align-items-center">
                    <div className="avatar mr-2 flex-shrink-0">
                      <IoIosArrowDown className={`a-arrow ${props.toggleId ===props.student?._id? 'arrow_rotate': ''} arrow--mob`} />
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
                      <div className="weight-600">{props.student.name_ka} { props.student.lastName_ka}</div>
                    </div>
                  </div>
                </td>
                {
                  props.showGroups ?  <td className='id_desktop'>{ returnGroupPrice()}</td>:                <td className='id_desktop'>{props.student?.id_number}</td>

                }
               
                <td  className='phone_desktop'>{props.student?.phone}</td>
                <td  className='imeil_desktop'> {props.student?.email}</td>
         
                <ShowIf if={props.showGroups}>
   <td  className='imeil_desktop'>{props.student?.groupName}</td>
                </ShowIf>
                <td  className='id_desktop' style={{cursor: 'pointer'}} onClick={editClicked} > <FaUserEdit size={'25px'} color="#12c2e9" /></td>
               
              </tr>
              <tr className='child_wrapper--mob ' >
                <td className={`child  ${props.toggleId ===props.student?._id? 'child-show': ''}`} >
                <div className='child_wrapper child_wrapper--mob  id_mobile'>
              <h5 className='child_title ' > გადახდილი თანხა</h5>
                <span className='child_name' > {returnGroupPrice()} </span>
              </div>
                <div className='child_wrapper child_wrapper--mob  id_mobile'>
              <h5 className='child_title ' > პირადი ნომერი</h5>
                <span className='child_name' > {props.student?.id_number} </span>
              </div>
              <div className='child_wrapper child_wrapper--mob phone_mobile'>
              <h5 className='child_title' > ტელეფონის ნომერი</h5>
                <span className='child_name' > {props.student?.phone}</span>
              </div>
                <div className='child_wrapper child_wrapper--mob  group_mobile '>
              <h5 className='child_title ' > იმეილი</h5>
                <span className='child_name' > {props.student?.email} </span>
              </div>
               
              
                <ShowIf if={props.showGroups}>
  <div className='child_wrapper'>
              <h5 className='child_title  group_mobile' > ჯგუფი</h5>
                <span className='child_name' > {props.student?.groupName}</span>
              </div>
                </ShowIf>
                <div className='child_wrapper child_wrapper--mob  id_mobile '>
              <h5 className='child_title ' > რედაქტირება</h5>
                <span className='child_name' onClick={editClicked}   > <FaUserEdit size={'25px'} color="#12c2e9" /></span>
              </div>
        
           

                </td>
              </tr>
    </React.Fragment>
}







export default UsersTable