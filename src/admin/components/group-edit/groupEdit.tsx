
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../../home/styles.css'
import { RiCloseLine } from 'react-icons/ri'
import { Group } from '../../../models/groupModel';

import { AppDispatch, RootState } from '../../../store/reducer';
import { useSelector } from 'react-redux';
import { CourseModel, SilabusObj } from '../../../models/courseModel';
import ShowIf from '../../../utils/showIf';
import { createGroupByAdmin, deleteCourse, deleteGroup } from '../../../store/admin/admin-effects';
import SuccessPopup from '../../ui/success-popup/successPopup';

import SelectForm from '../../ui/select-form/select-form';
import { User } from '../../../models/userModel';
export const GroupEdit: React.FC<{ groups: Group[], group?: Group, createMode: boolean, students: User[], deleteSuccess: boolean, editSuccess: boolean, mentor?: boolean, updateGroup: (form: any) => void, closeModal: () => void, courses: CourseModel[], mentors: User[] }> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const name = useRef<HTMLInputElement | null>(null);

  const [clickedButton, setClickedButton] = useState<'delete' | 'update'>('update')

  const time = useRef<HTMLInputElement | null>(null);
  const days = useRef<HTMLInputElement | null>(null);


  const groupPhoto = useRef<HTMLInputElement | null>(null);

  const updateLoading: boolean = useSelector((state: RootState) => state.admin.loading)

  const [courseId, setCourseId] = useState('')
  const [mentorId, setMentorId] = useState<string[]>([])
  const [silabus, setSilabus] = useState<[SilabusObj[]]>([[{ name: 'title', data: [] }, { name: 'title', data: [] }]])
  const [groupStudents, setStGroupStudents] = useState<User[]>([])
  const [page, setPage] = useState(0)

  const studentHandler = (student: User) => {
    const alreadyAdded = groupStudents?.some(st => st._id === student._id)
    if (!alreadyAdded) {
      const groupss = [...groupStudents, student]
      setStGroupStudents(groupss)
    }


  }


  const courseIdChangedHandler = (id: string) => {
    setCourseId(id)
  
  }
  const mentorIdChangedHandler = (id: string) => {
    setMentorId([id])
  }

  const removeGroupHandler = (id: string) => {

    setStGroupStudents(groupStudents?.filter(student => student._id !== id))
  }


  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.append('id', String(props.group?._id))
    form.append('name', name.current?.value as string)

    form.append('days', days.current?.value as string)
    form.append('time', time.current?.value as string)
    form.append('editing', 'group')
    const groupStudentsIds = groupStudents?.map((st: any) => {
      if (typeof st === 'string') {
        return st
      } else {
        return st._id
      }
    })
    form.append('students', JSON.stringify(groupStudentsIds) as string)

    if (courseId) {
      form.append('courseId', courseId as string)
    }
    if (mentorId.length) {
      form.append('mentors', JSON.stringify(mentorId) as string)
    }
    



    if (groupPhoto.current?.files?.length) {
    
      form.append('photo', groupPhoto.current?.files[0])

    }

    if(!props.createMode){
      props.updateGroup(form)
    }else{
      dispatch(createGroupByAdmin(form))
    }
 
    // dispatch(updateUSer(form)) 
  }

  const deleteCourseHandler = (id: string) => {
    if (id) {
      dispatch(deleteGroup(id))
      setClickedButton('delete')
    }

  }

  useEffect(() => {
    
    setStGroupStudents(props?.group?.students?.map((id) => props?.students?.find((st: any) => st?._id === id)) as any || [])
  }, [props.group])


  return <div>









    <div className={`pd-ltr-20 xs-pd-20-10 user-modal__container user-modal ${page === 2 ? 'user-modal--silabus' : ''} `}>
      <div className="min-height-200px">



        <div className={`pd-20 card-box mb-30 ${props.deleteSuccess || props.editSuccess ? 'visibility__hide' : ''}`}>
          <div className="clearfix">
            <h4 className="text-blue h4">განახლება</h4>

          </div>
          <div className="wizard-content">
            <form className="tab-wizard wizard-circle wizard">
              <RiCloseLine onClick={props.closeModal} size={'35px'} className='close-modal--edit' />

              <React.Fragment>
                <ShowIf if={page === 0}>
                  <h5>ჯგუფი</h5>
                </ShowIf>
                <section className={page !== 0 ? 'section-hidden' : ''} >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label' >ჯგუფის სახელი :</label>
                        <input type="text" ref={name} defaultValue={props.createMode ? '' : props.group?.name_ka} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">

                        <label className='edit-label'>კურსი</label>
                        <SelectForm valueChanged={courseIdChangedHandler} id={props.createMode ? '' : props.group?.courseId || ''} data={props.courses} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label' >დღეები :</label>
                        <input type="text" ref={days} defaultValue={props.createMode ? '' : props.group?.days} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">

                        <label className='edit-label'>დრო</label>
                        <input type="text" ref={time} defaultValue={props.createMode ? '' : props.group?.time} className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>მენტორი</label>
                        <SelectForm valueChanged={mentorIdChangedHandler} id={props.group?.courseId || ''} data={props.mentors} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }} >
                        <label className='edit-label'>ჯგუფის  ფოტო</label>
                        <input style={{ color: '#fff' }} type="file" ref={groupPhoto} className="custom-file-input custom-file-input-edit no-padding" />
                      </div>
                    </div>
                  </div>








                  {props?.students && !props.createMode ? <div className="row" style={{ paddingBottom: '20px' }}>

                    <div className='add_wrapper form-group' style={{ position: 'relative' }} >


                      <label className='edit-label'> სტუდენტები :</label>
                      <input className='add_input form-control add_data' />
                      <div className='add-group '>
                        {
                          props.students?.map((student: any) => {
                            return <span key={student?._id || student + 's'} onClick={() => studentHandler(student)} className={`add-group-name ${groupStudents?.some((gr: any) => gr?._id === student?._id) ? 'add-group-name--added' : ''}`} >{student?.name} {student?.lastName}</span>
                          })
                        }


                      </div>
                      <div className='choosed-group'>
                        <div className='choosen-group' >
                          {
                            groupStudents?.map((student: any) => {
                              return <span key={student?._id + 'x'} className='choosen-group-name' style={{ fontSize: '16px' }} > {student?.name} {student?.lastName}   <RiCloseLine onClick={() => removeGroupHandler(student?._id)} style={{ cursor: 'pointer', position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', color: '#fff' }} size={'25px'} /></span>
                            })
                          }


                        </div>
                      </div>

                    </div>


                  </div> : ''}





                  <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">
                      <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {props.createMode ? '' :  <button className='edit-button btn-danger' style={{ maxWidth: '120px', marginRight: '5px' }} type='button' onClick={() => deleteCourseHandler(props.group?._id || '')} >{updateLoading && clickedButton === 'delete' ? 'Loading...' : 'DELETE'}</button>}
                       
                        <button style={{ maxWidth: '140px', justifySelf: 'flex-end' }} className='edit-button' onClick={formSubmitHandler} type='button'  >{updateLoading && clickedButton === 'update' ? 'Loading...' :props.createMode? 'CREATE' :  'UPDATE'}</button>

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



export default GroupEdit