import React from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import { FaUserEdit } from 'react-icons/fa'
import {  Participant } from '../../../models/event'
import { PropsFn } from '../../../models/propsFn'

export const EventTable: React.FC<{participant: Participant, eventClicked: (id: string)=>void, toggleId: string, totalParticipants: number, eventEditClicked?: PropsFn}> = (props)=> {
  // let   imgUrl = `${img_route_courses + props.event?.imageName || 'default.jpeg'}`




  const editClicked =()=>{
    // props.eventEditClicked()
    // props.moduleEditStarted()
  }
    return  <React.Fragment>


         <tr >
                <td className="table-plus">
                  <div className="name-avatar d-flex align-items-center">
                    <div className="avatar mr-2 flex-shrink-0">
                      <IoIosArrowDown className={`a-arrow ${props.toggleId ===props.participant?.email? 'arrow_rotate': ''} arrow--mob`} />
                      {/* <img
                      //  src={`     ${imgUrl}`}
                        className="border-radius-100 shadow"
                        width={40}
                        height={40}
                        alt=""
                        style={{width: '40px', height: "40px", marginRight: '10px'}}
                      /> */}
                                
                    </div>
                    <div className="txt">
                      <div className="weight-600">{props.participant?.fullName} </div>
                    </div>
                  </div>
                </td>
                <td className='id_desktop'> {props.participant?.email}</td>
                <td  className='phone_desktop'>{props.participant?.phone} </td>
  
                <td  className='id_desktop' style={{cursor: 'pointer'}} onClick={editClicked} > <FaUserEdit size={'25px'} color="#12c2e9" /></td>
             
               
              </tr>
              <tr className='child_wrapper--mob ' >
                <td className={`child  ${props.toggleId ===props.participant.email? 'child-show': ''}`} >
                <div className='child_wrapper child_wrapper--mob  id_mobile'>
              <h5 className='child_title ' > {'იმეილი'}</h5>
                <span className='child_name' >  {props.participant?.email}</span>
              </div>
             
              
              
        
              <div className='child_wrapper child_wrapper--mob  id_mobile'>
              <h5 className='child_title ' >ტელეფონის ნომერი</h5>
                <span className='child_name' > {props.participant?.phone} </span>
              </div>
            
              
              
              <div className='child_wrapper child_wrapper--mob  id_mobile '>
              <h5 className='child_title ' > რედაქტირება</h5>
                <span className='child_name' onClick={editClicked}   > <FaUserEdit size={'25px'} color="#12c2e9" /></span>
              </div>
        
        
           

                </td>
              </tr>
    </React.Fragment>
}







export default EventTable