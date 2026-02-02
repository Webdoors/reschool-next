import { createSlice } from "@reduxjs/toolkit";

import { CourseModel } from '../../models/courseModel';
import { Group } from '../../models/groupModel';
import {DirectionModel } from '../../models/directionModel';
import {ModuleModel } from '../../models/moduleModel';
import { User } from "../../models/userModel";
import cloneDeep from 'lodash.clonedeep';
interface TransactionInfo  {
  transactionId: string,
  transacttonUrl: string,
 }
const initialSettingsState: {
 courses: CourseModel[],
 groups: Group[],
 directions: DirectionModel[],
 activeCourse?: CourseModel | null,
 activeDirection?:DirectionModel | null,
 activeModule?:ModuleModel | null,
 activeLocation?:ModuleModel | null,
 loading: boolean,
 groupsLoading?: boolean,
 mentors: User[],
    module_id: string,
 mentorProfile?: User | null,
 error: string
 transaction: TransactionInfo,
 showPaymentModal: boolean,
 paymentModalLoading: boolean,
 purchasedCourseName: string,
 studentCourses:  [CourseModel?],
 addingStudentToGroupError: string,
 studentAddedToWaitingLeast?: boolean 

  
} = { courses: [],directions:[],loading: false, groups: [], module_id:'', studentAddedToWaitingLeast: false,transaction: {transactionId: '', transacttonUrl: ''}, showPaymentModal: true, paymentModalLoading: true, studentCourses: [], groupsLoading: false, mentors: [], addingStudentToGroupError: '', purchasedCourseName: '',  error: '', activeCourse: null,activeDirection: null};
const coursesSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    startFetchingCourses(state) {
      state.loading = true;
    },
    fetchingCoursesSuccess(state, action: { payload: [CourseModel] }) {
        
        
     
        // if(action.payload.length && !state.activeCourse){
        //        state.activeCourse = action.payload[0];
        //     (action.payload[0] as CourseModel).active =true
        // }else {
        //     action.payload.forEach((cr)=> {
        //      if(cr){
        //         cr.active = cr?._id===state.activeCourse?._id
        //      }
             
        //  })
         
        
        // }
        state.loading =false
        state.courses = action.payload
      
  
    },
    fetchingCoursesFile(state, action: { payload: string }) {
     state.error =action.payload
     state.groupsLoading =false
    },
    activeCourseChanged2(state, action: {payload: {course: any}}) {
        state.activeCourse = action.payload.course
    },
    activeCourseChanged(state, action: {payload: {course: CourseModel}}){

  
        
      state.courses.forEach(crs=> {
// console.log(crs?._id)
// console.log(action.payload.course?._id)
// console.log("here",(crs?._id === action.payload.course._id))
          if(crs?._id === action.payload.course._id){
   
              crs.active=true
              if(state.activeCourse?._id !== action.payload.course._id){
                    if(action.payload.course){
                      state.activeCourse = action.payload.course
                    }
             
              }
          }else if(crs){
            crs.active =false
          }
      })
       
   
    },
    activeDirectionChanged(state, action: {payload: {
    direction: DirectionModel
}}){
    
  
        state.activeDirection=action.payload.direction
        // console.log(state.activeDirection)
       
   
    },
    activeModuleChanged(state, action: {payload: {
    module: ModuleModel
}}){
    
  
        state.activeModule=action.payload.module
        // console.log(state.activeDirection)
       
   
    },
    startFetchingGroups(state, _action){
     
        state.groupsLoading =true
    },
    startFetchingGroupsSuccess(state, action: {payload: CourseModel}){
     
      state.groupsLoading =false
       const index = state.courses.findIndex(cr=> cr?._id === action.payload._id)
        
       state.activeCourse =action.payload
     
              
       if(state?.mentorProfile?._id && action?.payload?.groups){
        
           state.mentorProfile.groups = action.payload.groups
         
       }
        if(action.payload && state.courses[index]){
          (state.courses[index] as CourseModel).groups = action.payload.groups;
          (state.activeCourse as CourseModel).groups = action.payload.groups;
        }
        // in case brower refreshs on course page
       
        
       
    },
    fetchingDirectionsSuccess(state, action: {payload: [DirectionModel]}){
   
      state.directions = action.payload
    },
    fetchingMetnorsSuccess(state, action: {payload: [User]}){
   
      state.mentors = action.payload
    },
    mentorPageActivated(state, action: {payload: User}){
      state.mentorProfile = action.payload
    },
    transactionInfoAdded(state, action: {payload: TransactionInfo}){
      state.loading =true;
      state.transaction =action.payload
    },
    transactionSuccess(state, action: any){
     
      state.showPaymentModal =true
      state.paymentModalLoading = true
   
      // logics needed to add
    },
    closePaymentModal(state){
       state.showPaymentModal =false
       state.paymentModalLoading = false
      localStorage.removeItem('trs')
      state.addingStudentToGroupError = ''
    },
    addedToGroupSuccessFully(state, action: any){
      
      state.purchasedCourseName  =  action.payload
      state.paymentModalLoading =false
   
    },

    studentCoursesUpdated(state, action: {payload: [CourseModel]}){
        state.studentCourses =action.payload
    
    },
    addingStudentToGroupFail(state, action: any){
      state.addingStudentToGroupError = 'something went wrong'
    },
    mentorDataFetched(state, action: {payload: User}){
      state.mentorProfile = action.payload
    },
    groupsFetchedSuccessfully (state, action: {payload: [Group] }){
        state.groups = action.payload
    },
    directionsFetchedSuccessfully (state, action: {payload: [DirectionModel] }){
        state.directions = action.payload
    },

    deleteCourse(state, action: {payload: {id: string}}){
      state.courses = state.courses.filter((cr)=> cr?._id !== action.payload.id) 
    },
    updateCourseByAdmin(state, action: {payload: {course: CourseModel}}){
      const coursesCopy = cloneDeep(state.courses)
      const findIndex = state.courses.findIndex(course=> course._id === action.payload.course._id)

      if(findIndex >=0){
          coursesCopy[findIndex] = action.payload.course
          state.courses = coursesCopy
      }

   
    },
    updateGroupByAdmin(state, action: {payload: {group: Group}}){
      const coursesCopy = cloneDeep(state.groups)
      const findIndex = state.groups.findIndex(group=> group._id === action.payload.group._id)

      if(findIndex >=0){
          coursesCopy[findIndex] = action.payload.group
          state.groups = coursesCopy
      }

   
    },
    addedToWaitingLeast(state, action: {payload: boolean}){
        state.studentAddedToWaitingLeast = action.payload
    }
  

    // registrationSuccess(state, action: { payload: User }) {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
  },


});

export const coursesAction = coursesSlice.actions;
export const directionAction = coursesSlice.actions;
export const moduleAction = coursesSlice.actions;

export default coursesSlice.reducer;
