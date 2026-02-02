
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../../home/styles.css'
import {RiCloseLine} from 'react-icons/ri'
import { Group } from '../../../models/groupModel';
import {romanNums, showPickerHandler} from '../../../utils/utils'
import { AppDispatch, RootState } from '../../../store/reducer';
import { useSelector } from 'react-redux';
import { CourseModel, SilabusObj } from '../../../models/courseModel';
import ShowIf from '../../../utils/showIf';
import { createCourseByAdmin, deleteCourse } from '../../../store/admin/admin-effects';
import SuccessPopup from '../../ui/success-popup/successPopup';
import SilabusInput from '../../ui/silabusInput/silabusInput';

import cloneDeep from 'lodash.clonedeep';
import {AiOutlineMinusCircle, AiFillPlusCircle} from 'react-icons/ai'
export const ModuleEdit: React.FC<{groups: Group[], createMode: boolean, course?: CourseModel, deleteSuccess: boolean, editSuccess: boolean, mentor?: boolean, updateModule: (form: any)=> void, closeModal: ()=> void}> = (props)=> {
  const dispatch = useDispatch<AppDispatch>()
  const name = useRef<HTMLInputElement | null>(null);
  const startDate = useRef<HTMLInputElement | null>(null);
  const numberOfLectures = useRef<HTMLInputElement | null>(null);
  const price = useRef<HTMLInputElement | null>(null);
  const shortDescription = useRef<HTMLTextAreaElement | null>(null);
  const detailDescription = useRef<HTMLTextAreaElement | null>(null);

  const purpose = useRef<HTMLTextAreaElement | null>(null);
  const educational_requirement = useRef<HTMLTextAreaElement | null>(null);
  const technical_requirement = useRef<HTMLTextAreaElement | null>(null);

  const coursePhoto = useRef<HTMLInputElement | null>(null);
  const courseIcon = useRef<HTMLInputElement | null>(null);
  const PayzePhoto = useRef<HTMLInputElement | null>(null);
  const updateLoading: boolean = useSelector((state: RootState)=> state.admin.loading)



  const [silabus, setSilabus] = useState<[SilabusObj[]]>([ [ {name: 'title', data: []}, {name: 'title', data: []}]])
const [stGroups, setStGroups] = useState<Group[]>()
const [page, setPage] = useState(0)

  const addGroupHandler =(group: Group)=>{
    const alreadyAdded = stGroups?.some(gr=> gr._id ===group._id)
    if(stGroups &&  !alreadyAdded){
      const groupss = [...stGroups, group]
      setStGroups(groupss)
    }
   
   
  }


  useEffect(()=>{
    if(props.course?.silabus?.length){
      if(!props.createMode){
        setSilabus(cloneDeep(props.course.silabus))
      }
    
    }
  
  }, [props.course])
  const removeGroupHandler =(id: string)=>{

    setStGroups(stGroups?.filter(group=> group._id !== id))
  }


  const formSubmitHandler =(e: React.FormEvent)=>{
    e.preventDefault()
    const form = new FormData()
    form.append('id',  String(props.course?._id))
    form.append('name',  name.current?.value as string)
      form.append('startDate',  startDate.current?.value as string)
      form.append('numberOfLectures',  numberOfLectures.current?.value as string,)
       form.append('price',  price.current?.value as string as string,)
      form.append('shortDescription',  shortDescription.current?.value as string)
      form.append('detailDescription',  detailDescription.current?.value as string )
      form.append('purpose',  purpose.current?.value as string )
      form.append('educational_requirement',  educational_requirement.current?.value as string)
      form.append('technical_requirement',  technical_requirement.current?.value as string)
      form.append('silabus',  JSON.stringify(silabus))
      if(courseIcon.current?.files?.length){
        form.append('courseIcon', courseIcon.current?.files[0])
      }
    
      if(coursePhoto.current?.files?.length){
      
        form.append('photo',  coursePhoto.current?.files[0])
        
      }
      if(PayzePhoto.current?.files?.length){
        form.append('payzePhoto',  PayzePhoto.current?.files[0])
      }
      if(!props.createMode){
        props.updateModule(form)
      }else {
      
        dispatch(createCourseByAdmin(form))
      }
     
      // dispatch(updateUSer(form)) 
  }

  const deleteCourseHandler = (id: string)=> {
    if(id){
      dispatch(deleteCourse(id))
    }

  }

  const addSilabusItem = (data: {name:string, addedSilabusItem: string, coordinates: [number, number]}) =>{
    
     const silabusCopy =[...silabus]
   
    if(data.name){
      silabusCopy[data.coordinates[0]][data.coordinates[1]].name = data.name
    }
    if(data.addedSilabusItem){
      silabusCopy[data.coordinates[0]][data.coordinates[1]].data.push(data.addedSilabusItem) 
    }


     setSilabus(silabusCopy as any)
  }

  const addWeekHandler = ()=>{
    const silabusCopy =[...silabus]
    silabusCopy.push([ {name: 'title', data: []}, {name: 'title', data: []}])

    setSilabus(silabusCopy as any)
  } 

  const removeWeekHandler = (index: number)=>{
    const silabusCopy =[...silabus] 
    silabusCopy.splice(index, 1)

    setSilabus(silabusCopy as any)
  } 

  const removeSilabusItem = (data:{ coordinates: [number, number, number] })=>{
    const silabusCopy =[...silabus]
    

    
    silabusCopy[data.coordinates[0]][data.coordinates[1]].data.splice(data.coordinates[2], 1)
    setSilabus(silabusCopy as any)
  }

  useEffect(()=>{
    if(page === 2){
     const modal = document.querySelector('.user-modal--silabus')
      modal?.scrollTo({top: 0,left: 0, behavior: 'auto'});
    }
  }, [page])


    return <div>
   






   

      <div  className={`pd-ltr-20 xs-pd-20-10 user-modal__container user-modal ${page===2 ? 'user-modal--silabus': ''} `}>
        <div className="min-height-200px">
    

  
          <div  className={`pd-20 card-box mb-30 ${props.deleteSuccess || props.editSuccess ? 'visibility__hide': '' }`}>
            <div className="clearfix">
              <h4 className="text-blue h4"> {props.createMode? 'შექმნა': 'განახლება'}</h4>
           
            </div>
            <div className="wizard-content">
              <form className="tab-wizard wizard-circle wizard">
             <RiCloseLine onClick={props.closeModal} size={'35px'} className='close-modal--edit' />

                <React.Fragment>
                <ShowIf if={page===0}>
             		<h5>Personal Info</h5>
                 </ShowIf>
                <section className={page!==0? 'section-hidden': ''} >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label' > სახელი :</label>
                        <input type="text"   ref={name}  defaultValue={props.createMode? '': props.course?.name_ka} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                    
                    <label className='edit-label'>დაწყების თარიღი</label>
                        <input
                          defaultValue={props.createMode? '': props.course?.startDate_ka}
                          ref={startDate}
                          
                          // ref={birth_date}
                          type="date"
                          className="form-control "
                          min="2022-01-01"
                          max="2025-01-01"
                          onClick={showPickerHandler}
                          // defaultValue={props.user?.birth_date}
                          id="bday"
                          name="bday"
                          style={{colorScheme: 'dark'}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>ლექციების რაოდენობა:</label>
                        <input type="text"    ref={numberOfLectures}  defaultValue={props.createMode? '': props.course?.numberOfLectures_ka} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'> ფასი :</label>
                        <input type="text"    ref={price}   defaultValue={props.createMode? '': props.course?.price} className="form-control" />
                      </div>
                    </div>
                  </div>

                
                
                  <div className="row"  >
                  <div className="col-md-12">
                      <div className="form-group">
                      <label className='edit-label'> მოკლე აღწერა :</label>
                        <textarea className="form-control" ref={shortDescription}  defaultValue={`${props.createMode? '': props?.course?.shortDescription}`} />
                      </div>
                    </div>
                  </div>
                  <div className="row"  >
                  <div className="col-md-12">
                      <div className="form-group">
                      <label className='edit-label'> დეტალური  აღწერა :</label>
                        <textarea className="form-control" ref={detailDescription} style={{height: '100px'}}  defaultValue={`${props.createMode? '': props?.course?.detailDescription}`} />
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group" style={{display: 'flex', flexDirection: 'column'}} >
                        <label className='edit-label'>კურსის ფოტო</label>
                        <input style={{color: '#fff'}} type="file" ref={coursePhoto} className="custom-file-input custom-file-input-edit no-padding"/>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group" style={{display: 'flex', flexDirection: 'column'}} >
                        <label className='edit-label'>კურსის აიკონი</label>
                        <input style={{color: '#fff'}} type="file" ref={courseIcon} className="custom-file-input custom-file-input-edit no-padding"/>
                      </div>
                    </div>
                    <div className="col-md-4">
                      {/* <div className="form-group">
                    
                        <input type="text" className="form-control" />
                      </div> */}
                        <div className="form-group" style={{display: 'flex', flexDirection: 'column'}} >
                        <label className='edit-label'>ფეიზის ფოტო</label>
                        <input style={{color: '#fff'}} type="file" ref={PayzePhoto} className="custom-file-input custom-file-input-edit no-padding"/>
                      </div>
                    
                    </div>
                  </div>



                {!props?.mentor?  <div className="row" style={{paddingBottom: '20px'}}>
                      
                      <div className='add_wrapper form-group' style={{position: 'relative'}} >
                    
                    
                      <label className='edit-label'> ჯგუფები :</label>
                      <input className='add_input form-control add_data'  />
                      <div className='add-group '>
                        {
                         props.groups?.map((group: any)=>{
                            return   <span key={group._id + 's'} onClick={()=>addGroupHandler(group)} className={`add-group-name ${stGroups?.some(gr=> gr._id===group._id)? 'add-group-name--added': ''}`} >{group?.name}</span>
                          })
                        }
                    
                 
                      </div>
                      <div className='choosed-group'>
                        <div className='choosen-group' >
                          {
                            stGroups?.map((group: any)=>{
                              return <span key={group._id + 'x'} className='choosen-group-name' style={{fontSize: '16px'}} > {group?.name}    <RiCloseLine  onClick={()=>removeGroupHandler(group?._id)} style={{cursor: 'pointer', position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', color: '#fff'}} size={'25px'} /></span>
                            })
                          }
                       
                         
                        </div>
                      </div>
                   
                      </div>
 
                      
                      </div>:''}





                  <div className="row">
                    <div className="col-md-6">
          
                    </div>
                    <div className="col-md-6">
                    <div className="form-group" style={{display: 'flex', justifyContent: 'flex-end'}}>
                      {
                        props.createMode? '': <button  className='edit-button btn-danger' style={{maxWidth: '120px', marginRight: '5px'}} type='button' onClick={()=>deleteCourseHandler(props.course?._id || '')} >{!updateLoading ? 'DELETE': 'Loading...'}</button>
                      }
                   
                      <button  style={{maxWidth: '140px', justifySelf: 'flex-end'}} className='edit-button' type='button' onClick={()=>setPage(1)} >NEXT</button>

                </div>    
                    </div>
                  </div>




                </section>
                </React.Fragment>
            
           
                <React.Fragment>
                <ShowIf if={page===1}>
              <h5>კურსის შესახებ</h5>
              </ShowIf>
              <section className={page!==1? 'section-hidden': ''} >
                <div className="row"  >
                  <div className="col-md-12">
                      <div className="form-group">
                      <label className='edit-label'> მიზანი:</label>
                        <textarea ref={purpose} className="form-control" style={{height: '100px'}}  defaultValue={`${props?.course?.purpose_ka || ''}`} />
                      </div>
                    </div>
                  </div>
                <div className="row"  >
                  <div className="col-md-12">
                      <div className="form-group">
                      <label className='edit-label'>განათლება:</label>
                        <textarea className="form-control" ref={educational_requirement} defaultValue={`${props?.course?.educational_requirement_ka || ''}`} />
                      </div>
                    </div>
                  </div>
                <div className="row"  >
                  <div className="col-md-12">
                      <div className="form-group">
                      <label className='edit-label'>ტექნიკური მოთხოვნა</label>
                        <textarea className="form-control" ref={technical_requirement} defaultValue={`${props?.course?.technical_requirement_ka || ''}`} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
          
                    </div>
                    <div className="col-md-6">
                    <div className="form-group" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button  className='edit-button btn-secondary' style={{maxWidth: '120px', marginRight: '5px'}} type='button' onClick={()=> setPage(0)} >PREVIOUS</button>
                    <button  style={{maxWidth: '140px', justifySelf: 'flex-end'}} className='edit-button' type='button' onClick={()=>setPage(2)} >NEXT</button>

                </div>    
                    </div>
                  </div>
                </section>
                </React.Fragment>
               
         
            
                <React.Fragment>
                <ShowIf if={page===2}>
              <h5>სილაბუსი</h5>
              </ShowIf>
              <section className={page!==2? 'section-hidden': ''} >
               
               
               
                  

                  <div className="row">
             


                {
                  silabus.map((data: any, i: number) => {
                  return <React.Fragment key={i +'ssr'}>  <div key={i +'ssrm'} style={{position: 'relative'}} className="col-md-12"><label className='silabus_week'  style={{fontWeight: 'bold', textAlign: 'center'}} >კვირა {romanNums()?.get(i+1)} <span className='module-edit--icons'> <ShowIf if={i !==0} ><AiOutlineMinusCircle onClick={()=> removeWeekHandler(i)} style={{cursor: 'pointer', opacity: '0.6'}} size={'20px'} color="red" /></ShowIf>   { i===silabus.length-1 ? <AiFillPlusCircle onClick={addWeekHandler} style={{cursor: 'pointer'}}  size={'20px'}  color={'green'}/>: ''}  </span></label>  </div>
                 
                    
                    {
                      data.map((info: any, index: number)=>{
                          return     <SilabusInput key={info?.name + index} deleteItem={removeSilabusItem} addItem={addSilabusItem} data={info?.data} name={info.name} index={i} secIndex={index} />
                          
                          
                          
                         
                      })
                    }
                 
                    
                 
                 </React.Fragment>  
                  })
                }

              
                  </div>








                  <div className="row">
                    <div className="col-md-6">
          
                    </div>
                    <div className="col-md-6">
                    <div className="form-group" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button  className='edit-button btn-secondary' style={{maxWidth: '120px', marginRight: '5px'}} type='button' onClick={()=> setPage(1)} >PREVIOUS</button>
                      <button  className='edit-button' type='button' onClick={formSubmitHandler } >{updateLoading ? 'LOADING': props.createMode? 'CREATE': 'UPDATE'}</button>

                </div>    
                    </div>
                  </div>

                
                </section>
                </React.Fragment>
               
              </form>
            </div>
          </div>
    

        




         <SuccessPopup closeModal={props.closeModal}  showPopup={props.editSuccess || props.deleteSuccess} />

       
        </div>
      
      </div>
 
    {/* js */}
  </div>
  
}



export default ModuleEdit