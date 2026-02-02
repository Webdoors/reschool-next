import { ApiService } from "../../api/api.service";
import { StateDispatch } from "../reducer";
import { adminActions } from "./admin-slice";
import * as EndPoints from "../../api/endPoints";
import { coursesAction } from "../courses/courses.slice";
import { getTokenConfig } from "../../utils/utils";
import { startFetchingCourses, startFetchingGroups, startFetchingMentors } from "../courses/courses-effects";

export const startFetchingStudents = (history?: any) => {

  return (dispatch: StateDispatch) => {
    // const history = useHistory()
    const config = getTokenConfig()
    ApiService.apiCall(EndPoints.GET_STUDENTS, null, config)
      .then((res) => {
      
       console.log(res)
        dispatch(adminActions.studentsFetchedSuccessfully(res?.data?.data?.students));
      
    
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);

        dispatch(
          adminActions.errorOccurred(
            err?.response?.data?.message || "something went wrong"
          )
        );
        console.log('hereeeeeeeeeeeeeeeeeeeeee')
        if(history){
          // history?.push('/notfound')
        }
        // history.push('/notfound')
      });
  };
};
export const startFetchingAdmins = (history?: any) => {
  return (dispatch: StateDispatch) => {
    // const history = useHistory()
    let config= getTokenConfig()
    ApiService.apiCall(EndPoints.GET_ADMINS, null, config)
    .then((res) => {
      
      
      dispatch(adminActions.adminsFetchedSuccessfully(res?.data?.data?.admins));
      
      
    })
    .catch((err: any) => {
      console.log(err?.response?.data?.message);
      dispatch(
        adminActions.errorOccurred(
          err?.response?.data?.message || "something went wrong"
          )
          );
          // history.push('/notfound')
          if(history){
            // history?.push('/notfound')
          }
      });
  };
};
export const updateUSerByAdmin = (form: any, history?: any, csrfToken?: string) => {
    return (dispatch: StateDispatch) => {
     
    
      dispatch(adminActions.startUpdating());
  
      let config= getTokenConfig(csrfToken)
      
     
      ApiService.apiCall(EndPoints.UPDATE_USER, form, config)
        .then((res) => {
     
     
         dispatch(adminActions.studentUpdatedSuccessfully(res.data.data.user))
         dispatch(startFetchingStudents())
         dispatch(startFetchingMentors())
         dispatch(startFetchingGroups())
        })
        .catch((err: any) => {
          console.log(err);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
          if(history){
            // history?.push('/notfound')
          }
       
        });
    };
  };
export const updateStudent = (form: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());
      let config= getTokenConfig()
      
   
      ApiService.apiCall(EndPoints.UPDATE_STUDENT, form, config)
        .then((res) => {
     
          console.log(res)
        })
        .catch((err: any) => {
          console.log(err);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
export const createUSerByAdmin = (form: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());

      let config= getTokenConfig()
      
    
      ApiService.apiCall(EndPoints.CREATE_USER, form, config)
        .then((_res) => {
     
      
         dispatch(startFetchingStudents())
         dispatch(startFetchingMentors())
         dispatch(adminActions.updateSuccess({}))
        })
        .catch((err: any) => {
          console.log(err);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };


  
  export const deleteCourse = (id: string) => {
    return (dispatch: StateDispatch) => {

      dispatch(adminActions.startUpdating());
        let config = getTokenConfig()
      ApiService.apiCall(EndPoints.DELETE_COURSE, id, config)
        .then((res) => {
        
          //  dispatch(authActions.authenticationSuccess(res))
          dispatch(coursesAction.deleteCourse({id}));
          dispatch(adminActions.courseDeleted({}))
          
         
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const deleteUser = (id: string) => {
    return (dispatch: StateDispatch) => {

      dispatch(adminActions.startUpdating());
        let config = getTokenConfig()
      ApiService.apiCall(EndPoints.DELETE_USER, id, config)
        .then((res) => {
        
          dispatch(startFetchingStudents())
          dispatch(startFetchingAdmins())
          dispatch(startFetchingMentors())
         
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const deleteGroup = (id: string) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());

        let config = getTokenConfig()
      ApiService.apiCall(EndPoints.DELETE_GROUP, id, config)
        .then((res) => {
        
          dispatch(startFetchingGroups())
          dispatch(adminActions.courseDeleted({}))
        
          dispatch(startFetchingGroups())
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };


  export const updateCourse = (data: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());
   
        let config = getTokenConfig()
        config.param = data.get('id')
      ApiService.apiCall(EndPoints.UPDATE_COURSE, data, config)
        .then((res) => {
       
       

       
       
          dispatch(coursesAction.updateCourseByAdmin({course:res.data.data.data}))
          dispatch(adminActions.updateIsSuccessFull({}))
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const updateEvent = (data: any, statusChange?: boolean) => {
    return (dispatch: StateDispatch) => {
 
      if(!statusChange){
        dispatch(adminActions.startUpdating());
      }
   
   
        let config = getTokenConfig()
        config.param = data.get('id')
      ApiService.apiCall(EndPoints.UPDATE_EVENTS, data, config)
        .then((res) => {
       
       
          dispatch(getEventsAdmin())
          dispatch(getEvents())
          if(!statusChange){
            dispatch(adminActions.updateIsSuccessFull({}))
          }
       
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const addParticipant = (data: any, statusChange?: boolean) => {
    return (dispatch: StateDispatch) => {
 
      if(!statusChange){
        dispatch(adminActions.startUpdating());
      }
   
   
        let config = getTokenConfig()
        config.param = data.get('id')
      ApiService.apiCall(EndPoints.ADD_PARTICIPANT_EVENT, data, config)
        .then((res) => {
       
       
          // dispatch(getEventsAdmin())
          dispatch(adminActions.toggleParticipantAdded(true))
          if(!statusChange){
            dispatch(adminActions.updateIsSuccessFull({}))
          }
       
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const createEvent = (data: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());
   
        let config = getTokenConfig()
        config.param = data.get('id')
      ApiService.apiCall(EndPoints.CREATE_EVENT, data, config)
        .then((res) => {
       
        

          dispatch(getEventsAdmin())
       dispatch(getEvents())
       dispatch(adminActions.updateIsSuccessFull({}))
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const deleteEvent = (data: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());
      console.log('deleting started')
        let config = getTokenConfig()
        config.param = data.get('id')
        console.log(data.get('id'))
      ApiService.apiCall(EndPoints.DELETE_EVENT, data, config)
        .then((res) => {
       
       
          console.log('deleted')
          dispatch(getEventsAdmin())
       dispatch(getEvents())
        dispatch(adminActions.courseDeleted({}))
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const createCourseByAdmin = (data: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());
   
        let config = getTokenConfig()
        config.param = data.get('id')
      ApiService.apiCall(EndPoints.CREATE_COURSE, data, config)
        .then((res) => {
      
       

          dispatch(startFetchingCourses())
  
          dispatch(adminActions.updateIsSuccessFull({}))
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const createGroupByAdmin = (data: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());
  
        let config = getTokenConfig()
        config.param = data.get('id')
      ApiService.apiCall(EndPoints.CREATE_GROUP, data, config)
        .then((res) => {
         
       

          dispatch(startFetchingCourses())
          dispatch(startFetchingGroups())
          dispatch(startFetchingStudents())
          dispatch(adminActions.updateIsSuccessFull({}))
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };

  export const updateGroupByAdmin = (data: any) => {
    return (dispatch: StateDispatch) => {
      dispatch(adminActions.startUpdating());
    
        let config = getTokenConfig()
        config.param = data.get('id')
      ApiService.apiCall(EndPoints.UPDATE_GROUP, data, config)
        .then((res) => {
      
       

       
       
          dispatch(coursesAction.updateGroupByAdmin({group:res.data.data.data}))
          dispatch(adminActions.updateIsSuccessFull({}))
          dispatch(startFetchingGroups())
          dispatch(startFetchingStudents())
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };


  export const getEvents = () => {
    return (dispatch: StateDispatch) => {
      // dispatch(authActions.authenticationInProgress());
     
      ApiService.apiCall(EndPoints.GET_EVENTS)
        .then((res) => {
     
          //  dispatch(authActions.authenticationSuccess(res))
          dispatch(adminActions.eventsAdded(res?.data?.data?.events || []))
          // console.log(res.data)
          
        })
        .catch((err: any) => {
          console.log(err);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };
  export const getEventsAdmin = () => {
    return (dispatch: StateDispatch) => {
      // dispatch(authActions.authenticationInProgress());
      let config= getTokenConfig()
      ApiService.apiCall(EndPoints.GET_EVENTS_ADMIN, null, config)
        .then((res) => {
     
          //  dispatch(authActions.authenticationSuccess(res))
          dispatch(adminActions.addEventsAdm(res?.data?.data?.events || []))
          console.log(res.data)
          
        })
        .catch((err: any) => {
          console.log(err);
          dispatch(
            adminActions.errorOccurred(
              err?.response?.data?.message || "something went wrong"
            )
          );
        });
    };
  };