import { useEffect, useRef } from "react";
import { EventModel } from "../../models/event";
import React from 'react'
import { PropsFn } from "../../models/propsFn";
import {IoCloseSharp} from 'react-icons/io5'
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/reducer";
import { addParticipant } from "../../store/admin/admin-effects";
import ShowIf from "../../utils/showIf";
const RegisterModal:React.FC<{addToWaiting?: ()=>void,loading?: boolean, success?: boolean, chosenEvent?: EventModel, closeModal: PropsFn, waitingMode?:boolean, title?: string, buttonText?: string, successText?: string}> =(props)=>{
    const user_fullName = useRef<HTMLInputElement | null>(null);
    const user_email = useRef<HTMLInputElement | null>(null);
    const user_phone = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch<AppDispatch>()

    const [checkMode, setCheckMode] = useState(false)
    const [loading, setLoading] = useState(false)

    const formSubmited =(e: React.FormEvent)=>{
      e.preventDefault();
      if(!props?.waitingMode){
        const fullName = user_fullName.current?.value;
        const email = user_email.current?.value;
        const phone = user_phone.current?.value;
     
  
          if(!fullName || !email || !phone){
            setCheckMode(true)
            return
          }
      setLoading(true)
      const form = new FormData();
      form.append('id', String(props.chosenEvent?._id))
      form.append('fullName', fullName as string)
  
      form.append('email', email as string)
      form.append('phone', phone as string)
  
  
      dispatch(addParticipant(form))
          console.log(form)
      }
      setLoading(true)
      if(props.addToWaiting){

        props.addToWaiting()
      }
        // setCheckMode(true)
    }
    const changeHandler=()=>{
      if(checkMode){
        setCheckMode(false)
      }
    }


    return         <div className="contact reg-from">    { !props?.success?        <form
    id="contact-form"
    className="form contact-form  "
    onSubmit={formSubmited}
    noValidate={true}
  >
    <h5 style={{color: '#fff'}} >{props?.title? props.title: props?.chosenEvent?.title}</h5>
    <div onClick={()=>console.log('haha')} style={{opacity: '0.5'}} className={`modal_cancel  'modal_cancel_reg}`}>
          <IoCloseSharp onClick={props.closeModal} size={'40px'} opacity='0.8' color="#fff"/>
          </div>
    <div className="messages" />
    <ShowIf if={props?.waitingMode}>
      <p>გსურთ მომლოდინეთა სიაში დამატება?</p>
    </ShowIf>
    <ShowIf if={!props?.waitingMode}>

    <div className="controls">
      <div className="form-group has-error has-danger">
        <input
           className={`form-control  form-control--reg ${checkMode && !user_fullName.current?.value ?'input-error': ''}`}
          ref={user_fullName}
          id="form_name"
          type="text"
          name="phoneNumber"
          placeholder="სახელი გვარი"
          required={true}
          style={{color: '#fff'}}
          onChange={changeHandler}
          
        />
      </div>
      <div className={"form-group has-error has-danger"} style={{marginTop: '10px'}}>
        <input
          className={`form-control form-control--reg  ${checkMode && !user_email.current?.value ?'input-error': ''}`}
          ref={user_email}
          id="form_email"
          type="email"
          name="email"
          placeholder="იმეილი"
          required={true}
          onChange={changeHandler}
        />
      </div>
      <div className={"form-group has-error has-danger"} style={{marginTop: '10px'}} >
        <input
          className={`form-control form-control--reg  ${checkMode && !user_phone.current?.value ?'input-error': ''}`}
          ref={user_phone}
          id="form_email"
          type="text"
          name="phone"
          placeholder="ტელეფონის ნომერი"
          required={true}
          onChange={changeHandler}
        />
      </div>
    </div>
    </ShowIf>

 

    <div className="form-group">
      <button
       style={{backgroundColor: '#3BA424 ', fontSize: '16px', color: '#fff'}}
        type="submit"
        name="submit"
        className={`butn bord curve mt-30 w-100 font-nino reg-button`}
      >
     {!loading  ? (props?.buttonText? props.buttonText:'რეგისტრაცია'): 'loading...'}
      </button>
    </div>
  </form>: <React.Fragment>
  <h5 style={{color: '#fff'}} > {props?.successText? props.successText:'თქვენ წარმატებით დარეგისტრირდით'}</h5>
  
  <div className="form-group">
      <button
      onClick={props.closeModal}
        type="submit"
        name="signin"
        className={`butn bord curve mt-30 w-100 font-nino reg-button`}
        style={{backgroundColor: '#3BA424 ', fontSize: '22px', color: '#fff'}}
      >
          OK
      </button>
    </div>
    </React.Fragment>}
  </div>  
}



export default RegisterModal