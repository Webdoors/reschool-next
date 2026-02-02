
import React, {  useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../../home/styles.css'
import { RiCloseLine } from 'react-icons/ri'
import { Group } from '../../../models/groupModel';
import { AppDispatch } from '../../../store/reducer';
import { CourseModel } from '../../../models/courseModel';
import { createEvent,  deleteEvent, updateEvent } from '../../../store/admin/admin-effects';
import SuccessPopup from '../../ui/success-popup/successPopup';

import { User } from '../../../models/userModel';
import { EventModel } from '../../../models/event';
import { showPickerHandler } from '../../../utils/utils';
export const EventEdit: React.FC<{event: EventModel, groups: Group[], group?: Group, createMode: boolean, students: User[], deleteSuccess: boolean, editSuccess: boolean, mentor?: boolean, updateGroup: (form: any) => void, closeModal: () => void, courses: CourseModel[], mentors: User[], loading?: boolean }> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const name = useRef<HTMLInputElement | null>(null);

  const [clickedButton, setClickedButton] = useState<'delete' | 'update'>('update')

  const time = useRef<HTMLInputElement | null>(null);
  const days = useRef<HTMLInputElement | null>(null);
  const startDate = useRef<HTMLInputElement | null>(null);


  const photo = useRef<HTMLInputElement | null>(null);












  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.append('id', String(props.event?._id))
    form.append('title', name.current?.value as string)

    form.append('date', startDate.current?.value as string)
    form.append('time', time.current?.value as string)

    form.append('status', 'active' as string)
   


  
    



    if (photo.current?.files?.length) {
    
      form.append('photo', photo.current?.files[0])

    }




    if(!props.createMode){
      dispatch(updateEvent(form))
    
    }else{
      dispatch(createEvent(form))
    }
 
  
  }

  const deleteEventHandler = (id: string) => {
    console.log(id)
    if (id) {
    const form = new FormData()
    form.append('id',props.event?._id)
    setClickedButton('delete')
      dispatch(deleteEvent(form))
    
    }

  }




  return <div>









    <div className={`pd-ltr-20 xs-pd-20-10 user-modal__container user-modal `}>
      <div className="min-height-200px">



        <div className={`pd-20 card-box mb-30 ${props.deleteSuccess || props.editSuccess ? 'visibility__hide' : ''}`}>
          <div className="clearfix">
            <h4 className="text-blue h4">განახლება</h4>

          </div>
          <div className="wizard-content">
            <form className="tab-wizard wizard-circle wizard">
              <RiCloseLine onClick={props.closeModal} size={'35px'} className='close-modal--edit' />

              <React.Fragment>
              
                  <h5>ივენთი</h5>
             
                <section  >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label' > სახელი :</label>
                        <input type="text" ref={name} defaultValue={props.createMode ? '' : props?.event?.title} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }} >
                        <label className='edit-label'>ივენთის  ფოტო ({props?.event?.imageName? props?.event?.imageName.slice(0, 8) : 'არ არის ატვირთული'})</label>
                        <input style={{ color: '#fff' }} type="file" ref={photo} className="custom-file-input custom-file-input-edit no-padding" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label' >თარიღი :</label>
                        <input
                          defaultValue={props.createMode? '': props.event?.date}
                          ref={startDate}
                          
                          // ref={birth_date}
                          type="date"
                          className="form-control "
                          min="2022-01-01"
                          max="2028-01-01"
                          onClick={showPickerHandler}
                          // defaultValue={props.user?.birth_date}
                          id="bday"
                          name="bday"
                          style={{colorScheme: 'dark'}}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">

                        <label className='edit-label'>დაწყების დრო</label>
                        <input type="text" ref={time} defaultValue={props.createMode ? '' : props.event?.time} className="form-control" />
                      </div>
                    </div>
                  </div>

          





                  <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">
                      <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {props.createMode ? '' :  <button className='edit-button btn-danger' style={{ maxWidth: '120px', marginRight: '5px' }} type='button' onClick={() => deleteEventHandler(props.event?._id || '')} >{ props.loading&& clickedButton === 'delete' ? 'Loading...' : 'DELETE'}</button>}
                       
                        <button style={{ maxWidth: '140px', justifySelf: 'flex-end' }} className='edit-button' onClick={formSubmitHandler} type='button'  >{props.loading && clickedButton === 'update' ? 'Loading...' :props.createMode? 'CREATE' :  'UPDATE'}</button>

                      </div>
                    </div>
                  </div>




                </section>
              </React.Fragment>







            </form>
          </div>
        </div>







        <SuccessPopup closeModal={props.closeModal} showPopup={props.editSuccess || props.deleteSuccess} />


      </div>

    </div>

    {/* js */}
  </div>

}



export default EventEdit