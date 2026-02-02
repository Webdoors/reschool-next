
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../../../models/userModel';
import '../../home/styles.css'
import {RiCloseLine} from 'react-icons/ri'
import { Group } from '../../../models/groupModel';
import { AppDispatch, RootState } from '../../../store/reducer';
import { useSelector } from 'react-redux';
import SuccessPopup from '../../ui/success-popup/successPopup';
import SelectForm from '../../ui/select-form/select-form';
import ShowIf from '../../../utils/showIf';
import { createUSerByAdmin, updateStudent } from '../../../store/admin/admin-effects';
import { cloneDeep } from 'lodash';
type Role = 'admin' | 'student' | 'mentor'
export const UserEdit: React.FC<{studentsTab?: boolean,groups: Group[], createMode: boolean, user?: User, editSuccess: boolean, mentor?: boolean, updateUser: (form: any)=> void, closeModal: ()=> void}> = (props)=> {
  const dispatch = useDispatch<AppDispatch>()
  const phone = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);
  const name_ka = useRef<HTMLInputElement | null>(null);
  const lastName_ka = useRef<HTMLInputElement | null>(null);
  const name_en = useRef<HTMLInputElement | null>(null);
  const lastName_en = useRef<HTMLInputElement | null>(null);
  const birth_date = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const id_number = useRef<HTMLInputElement | null>(null);
  const social_link = useRef<HTMLInputElement | null>(null);
  const facebook = useRef<HTMLInputElement | null>(null);
  const speciality = useRef<HTMLInputElement | null>(null);
  const linkedin = useRef<HTMLInputElement | null>(null);
  const score = useRef<HTMLInputElement | null>(null);
  const file = useRef<HTMLInputElement | null>(null);
  const certificate = useRef<HTMLInputElement | null>(null);
  const updateLoading = useSelector((state: RootState)=> state.admin.loading)
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [payedPrice, setPeyedPrice]= useState<number>()
const [stGroups, setStGroups] = useState<Group[]>()

const [studentGroup, setStudentGroup] =useState<Group>()

const [role, setRole] = useState<Role>('student')
  const addGroupHandler =(group: Group)=>{
    const alreadyAdded = stGroups?.some(gr=> gr._id ===group._id)
    if(stGroups &&  !alreadyAdded){
      const groupss = [...stGroups, group]
      setStGroups(groupss)
    }
   
   
  }



useEffect(()=>{
  returnGroupPrice()

  if(props.user?.role ==='student'){
    setStudentGroup(props?.groups?.find(group=> group?._id===props.user?.groupId))
  }
},[])
  
const returnGroupPrice = ()=> {
  let price: number =0;

 
  if(props.user?.groupId){
    const data: any = props.user?.groupPayments?.map(payment=> {
     
     return payment
    })

   
   
  const found =   data ?  data?.find((payment: {[key: string]: number})=> payment[props.user?.groupId as string || '']): undefined
  if(found){
    price =found[props.user?.groupId as string ]
  }
  }

  setPeyedPrice(price)
}
  const handlerConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curPassword = password.current?.value;
    if (curPassword) {
      if (curPassword === e.target.value) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }
  };
  const removeGroupHandler =(id: string)=>{

    setStGroups(stGroups?.filter(group=> group._id !== id))
  }

  useEffect(()=>{
    if(props?.user?.courses){
      setStGroups(props?.user?.courses)
    }
   
  }, [props.user?.courses])
  const formSubmitHandler =(e: React.FormEvent)=>{


    e.preventDefault()

    if(certificate.current?.files?.length){
      const studentForm = new FormData()
      studentForm.append('certificate',  certificate.current?.files[0])
      studentForm.append('id',  String(props.user?._id))
      studentForm.append('groupId',  String(studentGroup?._id))
      dispatch(updateStudent(studentForm))
    }

    const form = new FormData()
    form.append('id',  String(props.user?._id))
      form.append('name_ka',  name_ka.current?.value as string)
      form.append('lastName_ka',  lastName_ka.current?.value as string,)
       form.append('phone',  phone.current?.value as string as string,)
      form.append('email',  email.current?.value as string)
      form.append('id_number',  id_number.current?.value as string )
      form.append('birth_date',  birth_date.current?.value as string )
      form.append('social_page',  social_link.current?.value as string)
      form.append('linkedin',  linkedin.current?.value as string)
      form.append('facebook',  facebook.current?.value as string)
      form.append('signUp', 'placeholder')
  
      form.append('role', role)
      if(props.createMode){
        form.append('password', password.current?.value as string,)
        form.append('confirmPassword',  confirmPassword.current?.value as string,)
      }
      if(speciality){
        form.append('speciality', speciality.current?.value as string)
      }


      if(file.current?.files?.length){
        form.append('photo',  file.current?.files[0])
      }
      if(stGroups?.length){
        const groupIds = stGroups.map(stg=> stg._id)
        form.append('courses', JSON.stringify(groupIds))
      
      }

      if(score.current?.value){
        const scores = props?.user?.scores as [{
          groupId: string;
          scoreValue: number;
      }] || []
          const updatedScores = cloneDeep(scores)
          if(updatedScores?.length){
            const scoreIsAlreadyAdded = updatedScores.find(scoreObj => scoreObj?.groupId === studentGroup?._id )
            if(scoreIsAlreadyAdded){
              scoreIsAlreadyAdded.scoreValue = +score.current.value
            }
          }else {
            updatedScores?.push({groupId: studentGroup?._id as string, scoreValue: +score.current.value})
          }
          form.append('scores', JSON.stringify(updatedScores))
      }

      if(payedPrice){
        
          let clonedPayments =cloneDeep(props.user?.groupPayments)
        
        const groupPayments = clonedPayments?.map(payment=>{
         
    
   
          if(props.user && payment[props?.user?.groupId as string]){
            payment[props?.user?.groupId as string] = payedPrice
         
          }
          return payment
        })
        if(props.user?.groupPayments && stGroups){
          // stGroups.some((group)=> props?.user?.groupPayments )
        }
   

      
        form.append('groupPayments', JSON.stringify(groupPayments))



      }


      
    
      if(!props.createMode){
        props.updateUser(form)
      }else {
   
        dispatch(createUSerByAdmin(form))
      }
    
      // dispatch(updateUSer(form)) 
  }


  const roleChangeHandler = (role: Role) => {
    setRole(role)
  }
  useEffect(()=>{
    if(props.user?.role){
      setRole(props.user?.role)
    }
    
  },[props.user])

  const amountCHangedHandler= (e: React.ChangeEvent<HTMLInputElement>)=>{
    let amount =Number(e.target.value)
    if(amount){
      setPeyedPrice(amount || 0)
    }
   
  }

    return <div>






   

      <div className="pd-ltr-20 xs-pd-20-10 user-modal__container user-modal">
        <div className="min-height-200px">
      
          <div className={`pd-20 card-box mb-30 ${props.editSuccess ? 'visibility__hide': '' }`}>
            <div className="clearfix">
              <h4 className="text-blue h4">განახლება</h4>

            </div>
            <div className="wizard-content">
              <form onSubmit={formSubmitHandler} className="tab-wizard wizard-circle wizard">
              <RiCloseLine onClick={props.closeModal} size={'35px'} className='close-modal--edit' />

                <section>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label' > სახელი :</label>
                        <input type="text"   ref={name_ka}  defaultValue={ props.createMode? '': props.user?.name_ka} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>გვარი :</label>
                        <input  defaultValue={props.createMode? '': props.user?.lastName_ka}    ref={lastName_ka} type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>ტელეფონის ნომერი :</label>
                        <input type="text"    ref={phone}  defaultValue={props.createMode? '': props.user?.phone} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'> პირადი ნომერი :</label>
                        <input type="text"    ref={id_number}   defaultValue={props.createMode? '': props.user?.id_number} className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>იმეილი</label>
                        <input type="email"     ref={email}   defaultValue={props.createMode? '': props.user?.email} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* <div className="form-group">
                    
                        <input type="text" className="form-control" />
                      </div> */}
                      <div className="form-group">
                      <label className='edit-label'>დაბადების თარიღი</label>
                          <input
                            defaultValue={props.createMode? '': props.user?.birth_date}
                            ref={birth_date}
                            
                            // ref={birth_date}
                            type="date"
                            className="form-control "
                            min="1920-01-01"
                            max="2015-01-01"
                            // defaultValue={props.user?.birth_date}
                            id="bday"
                            name="bday"
                            style={{colorScheme: 'dark'}}
                          />{" "}
                        </div>
                    </div>
                  </div>
                
                  <div className="row"  >
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>facebook :</label>
                        <input type="text"   ref={facebook}  defaultValue={props.createMode? '': props.user?.facebook} className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'> linkedin :</label>
                        <input type="text"    defaultValue={props.createMode? '': props.user?.linkedin}  ref={linkedin} className="form-control" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row"  >
                  <ShowIf if={!props.createMode && props?.studentsTab? true: false} >
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>გადახდილი თანხა :</label>
                        <input type="text" onChange={amountCHangedHandler}   defaultValue={payedPrice} className="form-control" />
                      </div>
                    </div>
                    </ShowIf>
                    <ShowIf if={!props.createMode && props?.studentsTab? true: false} >
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>  ქულა: ( {studentGroup?.name_ka} )</label>
                        <input type="text" ref={score}  defaultValue={props.user?.scores?.find(score=> score.groupId===props.user?.groupId)?.scoreValue} className="form-control" />
                      </div>
                    </div>
                    </ShowIf>
                    <ShowIf if={props.createMode} >
                    <div className="col-md-6">
                   
                          <div className="form-group">
                          <label className='edit-label'>password</label>
                            <input
                              ref={password}
                              type="password"
                              name="social-link"
                              placeholder="პაროლი"
                              required={true}
                              className="form-control"
                            />
                          </div>
                         
                    </div>
                    </ShowIf>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'> linkedin :</label>
                        <input type="text"    defaultValue={props.createMode? '': props.user?.linkedin}  ref={linkedin} className="form-control" />
                      </div>
                    </div> */}
                  </div>


                {!props?.mentor && !props.createMode && props.user?.role!=='admin'  ?  <div className="row" style={{paddingBottom: '20px'}}>
                      
                      <div className='add_wrapper form-group' style={{position: 'relative'}} >
                    
                    
                      <label className='edit-label'> ჯგუფები :</label>
                      <input className='add_input form-control add_data'  />
                      <div className='add-group '>
                        {
                         props.groups?.map((group: any)=>{
                            return   <span key={group._id} onClick={()=>addGroupHandler(group)} className={`add-group-name ${stGroups?.some(gr=> gr._id===group._id)? 'add-group-name--added': ''}`} >{group?.name}</span>
                          })
                        }
                    
                 
                      </div>
                      <div className='choosed-group'>
                        <div className='choosen-group' >
                          {
                            stGroups?.map((group: any)=>{
                              return <span key={group._id} className='choosen-group-name' style={{fontSize: '16px'}} > {group?.name}    <RiCloseLine  onClick={()=>removeGroupHandler(group?._id)} style={{cursor: 'pointer', position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', color: '#fff'}} size={'25px'} /></span>
                            })
                          }
                       
                         
                        </div>
                      </div>
                   
                      </div>
 
                      
                      </div>:''}


                    <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='edit-label'>როლი</label>
                        <SelectForm defaultValue={props.user?.role} valueChanged={(role)=>roleChangeHandler(role as Role)} roleChange={true}  data={['student', 'mentor', 'admin']} />
                      </div>
                    </div>
                    <ShowIf if={props.createMode} >
                  
                    

                  <div className="col-md-6">
                        <div className="form-group">
                        <label className='edit-label'>Confirm Password</label>
                        <input
                            onChange={handlerConfirmPassword}
                            ref={confirmPassword}
                            type="password"
                            name="social-link"
                            placeholder="გაიმეორეთ პაროლი"
                            required={true}
                            className="form-control"
                          /> <div
                          className={`text-danger  ${
                            !passwordMatch ? "opacity-75" : "opacity-0"
                          }`}
                        >
                          პაროლი არ ემთხვევა
                        </div>
                        </div>
                        </div>
               
                 
                  </ShowIf>


                  <ShowIf if={!props.createMode && props?.studentsTab  ? true: false}>
                  <div className="col-md-6">
                    <div style={{display: 'flex', flexDirection: 'column'}} className="form-group">
                    <label className='edit-label'>სერთიფიკატი ({props.user?.certificates?.find(certificate=> certificate?.groupId===studentGroup?._id)?.pdfUrl || 'არ არის დამატებული'})</label>
                 <input style={{color: '#fff', padding: '2px'}} type="file" ref={certificate} className="custom-file-input custom-file-input-edit certificate-input"/>


                    </div>    
                    </div>
                  
                    </ShowIf>


                    </div>
                   
                    {
                      props.mentor? 
                      <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                        <label className='edit-label'>სპეციალობა</label>

                          <input type={'text'} defaultValue={props.user?.speciality} className='form-control' ref={speciality}/>
                        </div>
                      </div>
                    </div>:''

                    }
                    

                  <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
         <input style={{color: '#fff'}} type="file" ref={file} className="custom-file-input custom-file-input-edit"/>
{/* <input ref={file} type="file"  placeholder="choose img" className="form-control" id="customFile" /> */}

</div>    
                    </div>
                    <div className="col-md-6">
                    <div className="form-group" style={{display: 'flex'}}>
                      {
                        props.createMode? '':  <button  className='edit-button btn-danger' style={{maxWidth: '120px', marginRight: '5px'}} type='submit' >DELETE</button>
                      }
                   
                      <button disabled={!passwordMatch}  className='edit-button' type='submit' >{props.createMode && !updateLoading? 'CREATE': !updateLoading && !props.createMode ? 'UPDATE': 'Loading...'}</button>

                </div>    
                    </div>
                  </div>




                </section>
           
          
               
              </form>
            </div>
          </div>





          <SuccessPopup closeModal={props.closeModal}  showPopup={props.editSuccess} />
        
      
        </div>
      
      </div>
 
    {/* js */}
  </div>
  
}



export default UserEdit