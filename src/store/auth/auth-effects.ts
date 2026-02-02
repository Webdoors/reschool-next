import axios from "axios";

import { StateDispatch } from "../reducer";
import { authActions } from "./auth-slice";
import { ApiService } from "../../api/api.service";
import { LOGIN, LOG_OUT, SIGNUP } from "../../api/endPoints";
import { User } from "../../models/userModel";
import * as EndPoints from "../../api/endPoints";
import { getTokenConfig, validateEmail } from "../../utils/utils";

export const logout = () => {
  return (dispatch: StateDispatch) => {
    ApiService.apiCall(LOG_OUT)
      .then((_res) => {
        dispatch(authActions.logout({}));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startAuthentication = (phone: string, password: string, csrfToken: string) => {

  return (dispatch: StateDispatch) => {
    dispatch(authActions.authenticationInProgress());
    let credentials = {
      phone: Number(phone.trim()) || null,
      password: password,
      email: '',
      
    }
    if(validateEmail(phone)){
      credentials.email = phone
      credentials.phone =null
    } 
    
    let config= getTokenConfig(csrfToken)

    ApiService.apiCall(EndPoints.LOGIN, credentials, config)
      .then((res) => {
      
        //  dispatch(authActions.authenticationSuccess(res))
        localStorage.setItem('jwt', JSON.stringify(res.data.token))
        dispatch(authActions.authenticationSuccess(res?.data?.data));
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(
          authActions.authenticationFiles("email or password is incorrect")
        );

        // if(history){
        //   history?.push('notfound')
        // }
      });
  };
};

export const startRegistration = (user: User, csrfToken: string) => {
  return (dispatch: StateDispatch) => {
    dispatch(authActions.authenticationInProgress());
    let config= getTokenConfig(csrfToken)
    ApiService.apiCall(EndPoints.SIGNUP, user, config)
      .then((res) => {
     
        //  dispatch(authActions.authenticationSuccess(res))
        dispatch(authActions.registrationSuccess(res?.data?.data));
        localStorage.setItem('user', JSON.stringify(res.data.data?.user))
        localStorage.setItem('jwt', JSON.stringify(res.data.token))
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
        dispatch(
          authActions.authenticationFiles(
            err?.response?.data?.message || "something went wrong"
          )
        );
      });
  };
};

export const updateUSer = (form: any) => {
  return (dispatch: StateDispatch) => {
    dispatch(authActions.authenticationInProgress());
    const token = localStorage.getItem('jwt')
    let config= {
      headers: {
        Authorization: ''
      }
    }
    if(token && token !=='undefined'){
    
      config.headers.Authorization="Bearer " + JSON.parse(token)
    }
 
    ApiService.apiCall(EndPoints.UPDATE_ME, form, config)
      .then((res) => {
   
        //  dispatch(authActions.authenticationSuccess(res))
        if(res?.data?.data.user._id){
          dispatch(authActions.updateUserSuccess(res?.data?.data.user));
          localStorage.setItem('user', JSON.stringify(res?.data?.data.user))
        }else {
          dispatch(
            authActions.authenticationFiles(
              "something went wrong"
            )
          );
        }
 
        
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(
          authActions.authenticationFiles(
            err?.response?.data?.message || "something went wrong"
          )
        );
      });
  };
};





// security token
export const getCtoken = () => {
  return (dispatch: StateDispatch) => {
    // dispatch(authActions.authenticationInProgress());
    // let config= getTokenConfig()
    ApiService.apiCall(EndPoints.GET_C_TOKEN, null)
      .then((res) => {
   
        //  dispatch(authActions.authenticationSuccess(res))
       
        //  ApiService.addCToken()
          dispatch(authActions.cTokenAdded(res.data?.token))
      })
      .catch((err: any) => {
        console.log(err);
        // dispatch(
        //   authActions.authenticationFiles(
        //     err?.response?.data?.message || "something went wrong"
        //   )
        // );
      });
    // ApiService.addCToken()
  };
};