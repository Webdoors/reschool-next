import { useRef, useState, useEffect } from "react";
import { User } from "../../../models/userModel";
import { AppDispatch, RootState } from "../../../store/reducer";
import { startRegistration, updateUSer } from "../../../store/auth/auth-effects";
import { useDispatch, useSelector } from "react-redux";
import styles from "./signup_new.module.css";
import { useHistory } from "react-router";
import { authActions } from '../../../store/auth/auth-slice';
import SignInNew from "../signin/signin_new";
import React from 'react'
import ShowIf from "../../../utils/showIf";
import {IoCloseSharp} from 'react-icons/io5'
import { terms_condition_text, showPickerHandler} from "../../../utils/utils";
const SignUpContainerNew: React.FC<{modalMode?: boolean, showModal?:boolean, updateMode?: boolean, user?: User | null}> = (props) => {
  const history = useHistory();

  const dispatch: AppDispatch = useDispatch();
  // user data
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
  const linkedin = useRef<HTMLInputElement | null>(null);
  const file = useRef<HTMLInputElement | null>(null);
  const [termsConf, setTermsConf] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  // User data end
  const [isRegModal, setIsRegModal] = useState(true)
  const authError = useSelector((state: RootState) => state.auth.error);
  const loading = useSelector((state: RootState)=> state.auth.loading)
  const isLoggedIn = useSelector((state: RootState) => state.auth.LoggedIn);
 
  const [idNumber, setIdNumber] = useState<string>(String(props.user?.id_number));
  const [idIsCorrect, setIdCorrect] = useState(true);
  const cToken =    useSelector((state: RootState)=> state.auth.c_token)
  const [termsAReNotFullFiled, setTermsAreNotFulfiled] = useState(false);

  const userUpdatedSuccessFully = useSelector((state: RootState)=> state.auth.userUpdateSuccess)
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
  useEffect(()=>{
    let input: any = document.getElementById('customFile')
    if(input){
      input.innerHtml = 'Choose Img'
    }
 
  }, [])

  const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value?.trim();
    setIdNumber(id);
 
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if(!termsConf && !props.modalMode){
      setTermsAreNotFulfiled(true)
      return 
    }
    if(!props.updateMode){
      const user: User = {
        name_ka: name_ka.current?.value as string,
        lastName_ka: lastName_ka.current?.value as string,
        name_en: name_en.current?.value as string,
        lastName_en: lastName_en.current?.value as string,
        phone: phone.current?.value as string,
        email: email.current?.value as string,
        id_number: id_number.current?.value as string,
        birth_date: birth_date.current?.value as string,
        social_page: social_link.current?.value as string,
        password: password.current?.value as string,
        confirmPassword: confirmPassword.current?.value as string,
      };
      dispatch(startRegistration(user, cToken));

    }else{
     
      const form = new FormData()
      form.append('name_ka',  name_ka.current?.value as string)
      form.append('lastName_ka',  lastName_ka.current?.value as string,)
      form.append('name_en',  name_en.current?.value as string)
      form.append('lastName_en',  lastName_en.current?.value as string,)
       form.append('phone',  phone.current?.value as string as string,)
      form.append('email',  email.current?.value as string)
      form.append('id_number',  id_number.current?.value as string )
      form.append('birth_date',  birth_date.current?.value as string )
      form.append('social_page',  social_link.current?.value as string)
      form.append('linkedin',  linkedin.current?.value as string)
      form.append('facebook',  facebook.current?.value as string)
      if(file.current?.files?.length){
        form.append('photo',  file.current?.files[0])
      }

  
     dispatch(updateUSer(form))
  
    
    }
  };

  useEffect(()=>{
    if(!isRegModal && !props.showModal){
      setIsRegModal(true)
    }
  }, [props.showModal])

  //TODO move it to hook same logic is in signin
  useEffect(() => {
   
    if (isLoggedIn && !props.modalMode) {
      // needs logic when registration happans from modal
      history.push("/");
    }else if(props.modalMode && isLoggedIn && !props.updateMode){
       dispatch(authActions.toggleRegistrationModal(false))
    }
  }, [isLoggedIn]);

  const authClicked = ()=>{
    if(props.modalMode){
      setIsRegModal(false)
    }
   
  }

 const  closeRegModal = ()=>{
  dispatch(authActions.toggleRegistrationModal(false))
 }


  const checkIdNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    isFocus?: string
  ) => {
    if (!isFocus) {
      let id =e.target.value;

      if (id.length === 11) {
        setIdCorrect(true);
      } else {
        setIdCorrect(false);
      }
    } else {
      setIdCorrect(true);
    }
  };


  const termsConfHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.checked)
    setTermsAreNotFulfiled(false)
    setTermsConf(e.target.checked)
  }

  
  return ( 
  
      <React.Fragment>
     { isRegModal?   <section
    //  style={{display: !props.modalMode && !props.updateMode && !props.showModal ? 'none':"inline-block" }}
        className={`contact-sec style2 section-padding position-re bg-img ${(props.modalMode && !props.showModal)? styles.reg_modal_hide: ''} ${props.modalMode && props.showModal? styles.reg_modal_show: ''}  ${props.modalMode? styles.reg_modal: ''}`}
        data-background="img/patrn1.png"
        data-scroll-index={7} >
          <ShowIf if={props.modalMode ? true: false}>
          <div onClick={()=>dispatch(authActions.toggleRegistrationModal(false))} className={`modal_cancel ${!props.updateMode ? 'modal_cancel_reg': ''}`}>
          <IoCloseSharp size={'40px'} color="#fff"/>
          </div>
          </ShowIf>
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
           
          <ShowIf if={!props.updateMode}>
          <h5 className={`text-white mb-80 ${styles.reg} ${props.modalMode? styles.reg__modal_heading: ''} ${!props.modalMode? 'visi_hide': ''}`} style={{ letterSpacing: "8px" }}>
               
               რეგისტრაცია
              </h5>
          </ShowIf>
              {
                props.modalMode && !props.updateMode?      <h6 onClick={authClicked} className={`text-white mb-80 ${styles.reg} ${styles.auth}`} style={{ letterSpacing: "3px", cursor: 'pointer' }}>
                ავტორიზაცია
              </h6>: ''
              }
         
              <div className="form wow fadeInUp" data-wow-delay=".5s">
              {!userUpdatedSuccessFully ? <form  id="contact-form" onSubmit={formSubmitHandler}>
                  <div className="messages" />
                  <div className="controls">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="სახელი"
                            required={true}
                            defaultValue={props.user?.name_ka}
                          
                            ref={name_ka}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            type="text"
                            name="text"
                            placeholder="გვარი"
                            required={true}
                            ref={lastName_ka}
                            defaultValue={props.user?.lastName_ka}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="ტელეფონის ნომერი"
                            required={true}
                            ref={phone}
                            defaultValue={props.user?.phone}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            type="email"
                            name="name"
                            placeholder="იმეილი"
                            required={true}
                            defaultValue={props.user?.email}

                            ref={email}
                          />
                        </div>
                      </div>
                      <div className={"col-lg-4"}>
                        <div
                          className={"form-group"}
                          style={{ position: "relative" }}
                        >
                          <input
                            onBlur={checkIdNumber}
                            onFocus={(e) => checkIdNumber(e, "focus")}
                            onChange={idChangeHandler}
                            type="text"
                            name="age"
                            placeholder="პირადი ნომერი"
                            required={true}
                            ref={id_number}
                            defaultValue={props.user?.id_number}

                          />
                          {idIsCorrect ? (
                            ""
                          ) : (
                            <div
                              style={{ position: "absolute", fontSize: "12px" }}
                              className={`text-danger  ${
                                3 > 2 ? "opacity-75" : "opacity-0"
                              }`}
                            >
                              პირადი ნომერი 11 ციფრი უნდა იყოს
                            </div>
                          )}
                        </div>
                      </div>
                      <ShowIf if={!props.updateMode} >
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            ref={social_link}
                            type="text"
                            name="social-link"
                            placeholder="FB / Linkedin"
                          
                            defaultValue={props.user?.social_page}

                          />
                        </div>
                      </div>
                      </ShowIf>
                     

                    
                          <div className="col-lg-4">
                        <div className="form-group" style={{position: 'relative'}}>
                          <label htmlFor="bday" className="date-title" style={{position: 'absolute', zIndex: 2000, left: '20px'}} > დაბადების თარიღი</label>
                          <input
                           onClick={showPickerHandler}
                            ref={birth_date}
                            type="date"
                            className="form-control"
                            min="1920-01-01"
                            max="2015-01-01"
                            defaultValue={props.user?.birth_date}
                            id="bday"
                            name="bday"
                          />{" "}
                        </div>
                      </div>
                     
                      <ShowIf if={props.updateMode? true: false} >
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                          placeholder="facebook link"
                            ref={facebook}
                            type="text"
                            className="form-control"
                            id="bday"
                            name="facebook"
                            defaultValue={props.user?.facebook}
                          />{" "}
                        </div>
                      </div>
                      </ShowIf>






                      <ShowIf if={props.updateMode? true: false} >
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                           placeholder="linkedin link"
                            ref={linkedin}
                            type="text"
                            className="form-control"
                            id="bday"
                            name="linkedin"
                            defaultValue={props.user?.linkedin}
                          />{" "}
                        </div>
                      </div>
                      </ShowIf>
                     
                      
                      <ShowIf if={!props.updateMode} >
                      <div className="col-lg-4">
                          <div className="form-group">
                            <input
                              ref={password}
                              type="password"
                              name="social-link"
                              placeholder="პაროლი"
                              required={true}
                            />
                          </div>
                          </div>
                      </ShowIf>


                        {/* {
                          !props.updateMode ?
                          <div className="col-lg-4">
                          <div className="form-group">
                            <input
                              ref={password}
                              type="password"
                              name="social-link"
                              placeholder="პაროლი"
                              required={true}
                            />
                          </div>
                        </div>:''
                        } */}
                   
                        {
                           !props.updateMode ?
                          <div className="col-lg-4">
                          <div className={"form-group"}>
                            <input
                              onChange={handlerConfirmPassword}
                              ref={confirmPassword}
                              type="password"
                              name="social-link"
                              placeholder="გაიმეორეთ პაროლი"
                              required={true}
                            />
                            <div
                              className={`text-danger  ${
                                !passwordMatch ? "opacity-75" : "opacity-0"
                              }`}
                            >
                              პაროლი არ ემთხვევა
                            </div>
                          </div>
                        </div>: ''
                        }
                        {
                          props.updateMode?  <div className="col-lg-4">
                 
           
            
         <div className="form-group">
         <input style={{color: '#fff'}} ref={file}  type="file"  className="custom-file-input"/>
{/* <input ref={file} type="file"  placeholder="choose img" className="form-control" id="customFile" /> */}

</div>                 

                          </div> :''
                        }

<div className="form-group dadada">
   
<textarea
disabled={true}
    className="form-control scrollable-element"
    id="exampleFormControlTextarea1"
    rows={10}
    defaultValue={terms_condition_text}
  /> 
  
   </div>
  
 
                      <div className="col-12">
                        <div className="text-center">
                          {
                            !props.updateMode ? <button
                            disabled={
                              !passwordMatch || !(idNumber.length === 11)
                            }
                            type="submit"
                            className={`butn bord mt-30 fw-bold text-light ${
                              passwordMatch && idNumber.length === 11 && termsConf
                                ? styles.btn
                                : "opacity-25"
                            }`}
                            style={{
                              background: "transparent",
                              opacity: "0.9",
                            }}
                          >
                          
                            {!loading ? 'რეგისტრაცია': 'loading...'}
                          </button>:
                          <button
                          // disabled={
                          //   !(idNumber.length === 11)
                          // }
                          type="submit"
                          className={`butn bord mt-30 fw-bold text-light ${
                           
                               styles.btn
                             
                          }`}
                          style={{
                            background: "transparent",
                            opacity: "0.9",
                          }}
                        >
                            {!loading ? 'განახლება': 'loading...'}
                         
                        </button>
                    
                          }
                             
                          {authError ? (
                            <div
                              className={`text-danger
                               opacity-75
                              `}
                            >
                              {authError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                  
                      </div>
                    </div>
                  </div>
                </form>: 
                <React.Fragment >
                  <div className="alert alert-success" role="alert">
                მონაცემები წარმატებით განახლდა
                </div>
                 <button
                          onClick={()=>dispatch(authActions.toggleRegistrationModal(false))}
                          
                          className={`butn bord mt-30 fw-bold text-light add-hover ${
                           
                               styles.success_btn
                             
                          }`}
                          style={{
                           
                            opacity: "0.9",
                          }}
                        >
                            OK
                         
                        </button>
                </React.Fragment>
                }
               
              </div>
          {!props.updateMode ?  <div className="form-check" style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
  <input onChange={termsConfHandler} className="form-check-input" type="checkbox" style={{opacity:'0.5', marginLeft: '5px', }} value="" id="flexCheckIndeterminate"/>
  <label   className={`form-check-label  ${termsAReNotFullFiled? 'text-danger':  'text-white'}`} style={{opacity:'0.3', marginLeft: '5px',}} htmlFor="flexCheckIndeterminate">
  ვეთანხმები წესებს და პირობებს
  </label>
 
</div>: ''}  
            </div>
          </div>
        </div>
      </section>
      : props.showModal?  <SignInNew closeModal={closeRegModal} modalMode={true}/>: '' }
    
      </React.Fragment>
  );
};

export default SignUpContainerNew;
