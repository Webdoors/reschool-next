import { createSlice } from "@reduxjs/toolkit";
import { EventModel } from "../../models/event";

import { User } from "../../models/userModel";

const initialSettingsState: {
  LoggedIn: boolean;
  studentUpdateSuccess: boolean
  token?: string;
  user: User | null;
  students: User[],
  admins: User[],
  loading: boolean;
  error: string;
  userUpdateSuccess: boolean;
  showUpdateModal: boolean;
  courseDeleted: boolean;
  updateSuccess: boolean;
  events: EventModel[],
  adminEvents: EventModel[],
  participantAdded: boolean,
} = { studentUpdateSuccess: false, participantAdded: false, events: [], adminEvents: [], updateSuccess: false, LoggedIn: false, user: null, students: [], admins: [], userUpdateSuccess: false, loading: false, showUpdateModal: false, error: "", courseDeleted: false };
const AdminSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    startUpdating(state) {
      state.loading = true;
    },

    showUpdateModal(state, action: {payload: boolean}){
      state.showUpdateModal = action.payload;
      state.userUpdateSuccess = false;
      state.loading= false
    },
    updateUserSuccess(state, action: {payload: User}){
      state.user =action.payload;
      state.loading =false;
      state.error=''
      state.userUpdateSuccess =true
    },
    studentsFetchedSuccessfully (state, action: {payload: [User] }){
   
        state.students = action.payload
    },
    adminsFetchedSuccessfully (state, action: {payload: [User] }){
    
        state.admins = action.payload
    },
    studentUpdatedSuccessfully (state, action: {payload: User }){
     
      const studentsCopy =[...state.students]

      const editedIndex = studentsCopy.findIndex((user)=> user?._id ===action.payload._id)
        if(editedIndex >=0){
          state.students[editedIndex] = action.payload
        }

        
        state.studentUpdateSuccess = true
     
    },
    updateSuccess(state, _action){
      state.studentUpdateSuccess = true
    },
    courseDeleted(state, _action){
        state.courseDeleted = !state.courseDeleted
    },
    resetInfo(state, _action){
      state.studentUpdateSuccess =false;
      state.loading =false
      state.courseDeleted =false
      state.updateSuccess =false
    },
    updateIsSuccessFull(state, _action){
      state.updateSuccess =true
      state.loading =false
    },
    eventsAdded(state, action: {payload: EventModel[]} ){
      state.events = action.payload
    },
    addEventsAdm(state, action: {payload: EventModel[]} ){
      state.adminEvents = action.payload
    },
    toggleParticipantAdded(state, action: {payload: boolean}){
      console.log(state.participantAdded)
      state.participantAdded = action?.payload
    },
    errorOccurred(state, _action){
        state.error ='something went wrong'
    }


  },
});

export const adminActions = AdminSlice.actions;

export default AdminSlice.reducer;
