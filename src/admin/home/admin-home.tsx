
import './styles.css'
import './media.css'
import {FcManager} from 'react-icons/fc'
import {MdEventAvailable} from 'react-icons/md'
import {MdGroup} from 'react-icons/md'
import {FaLayerGroup,  } from 'react-icons/fa'
import {AiFillEdit } from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseLine} from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store/reducer'
import { useSelector } from 'react-redux'
import { User } from '../../models/userModel'
import UsersTable from '../components/user-table/userTable'
import { useHistory } from 'react-router'
import { getTableName } from '../../utils/utils'
import ModuleTable from '../components/module-table/module'
import UserEdit from '../components/user-edit/edit-modal'
import Overlay from '../../ui/overlay/overlay'
import ShowIf from '../../utils/showIf'
import { useDispatch } from 'react-redux'
import { getEventsAdmin, startFetchingAdmins, startFetchingStudents, updateCourse, updateEvent, updateGroupByAdmin, updateUSerByAdmin } from '../../store/admin/admin-effects'
import { adminActions } from '../../store/admin/admin-slice'
import ModuleEdit from '../components/module-edit/moduleEdit'
import { CourseModel } from '../../models/courseModel'
import { Group } from '../../models/groupModel'
import GroupEdit from '../components/group-edit/groupEdit'

import {TiPlus} from 'react-icons/ti'

import SearchComponent from '../../ui/search/search'
import EventTable from '../components/event-table/eventTable'
import EventEdit from '../components/event-edit/eventEdit'
import { EventModel } from '../../models/event'
import SelectForm from '../ui/select-form/select-form'
import SelectEvent from '../ui/select-form/select-event'


type TabNames = 'users' | 'students' | 'mentors' | 'module' | 'groups' | 'admins' | 'events' | 'waiting'

export const HomeContainer: React.FC = ()=>{
  
  const history = useHistory()
  const user = useSelector((state: RootState)=> state.auth.user)
  const studentUpdateSuccess = useSelector((state: RootState)=> state.admin.studentUpdateSuccess)
  const deleteSuccess = useSelector((state: RootState)=> state.admin.courseDeleted)
  const updateSuccess = useSelector((state: RootState)=> state.admin.updateSuccess)
  const dispatch: AppDispatch = useDispatch();
  const [createMode, setCreateMode] = useState(false)

  const [searchingWords, setSearchingWords] = useState('')

  const [waitingCourse, setWaitingCourse] = useState<CourseModel>()
  const [waitingStudents, setWaitingStudents] = useState<User[]>([])
  // waiting least for active course
  // const [waitingLeast, setWaitingLeast] = useState<CourseModel>()



  const [userEditMode, setUserEditMode] = useState(false)
  const [editingUser, setEditingUser] = useState<User>()

  const [courseEditMode, setCourseEditMode] = useState(false)
  const [editingCourse, setEditingCourse] = useState<CourseModel>()

  const [groupEditMode, setGroupEditMode] = useState(false)
  const [eventEditMode, setEventEditMode] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventModel>()
  const [editingGroup, setEditingGroup] = useState<Group>()

  const [showWaiting, setShowWaiting] = useState(true)
  const [showUsers, setShowUsers] = useState(true)
  const [showEvents, setShowEvents] = useState(false)
  const [showMobMenu,setShowMobMenu ] = useState(false)
  
  const [activeEventId, setActiveEvenId]= useState('')
  const [activeEvent, setActiveEvent]= useState<EventModel>()
  const [eventIsActive, setEventIsActive]= useState<boolean>(true)

  const [page, setPage] = useState<'users' | 'module' | 'group' | 'events' | 'waiting'>('users')
  const [regStudents, setRegStudents] = useState<User[]>([])

  const [activeTab, setActiveTab] = useState<TabNames>('users')
  const admins =    useSelector((state: RootState)=> state.admin.admins)
  const students =    useSelector((state: RootState)=> state.admin.students)
  const mentors =    useSelector((state: RootState)=> state.coursesState.mentors)
  const events =    useSelector((state: RootState)=> state.admin.adminEvents)
  const loading =    useSelector((state: RootState)=> state.admin.loading)

  const groups =    useSelector((state: RootState)=> state.coursesState.groups)
  const courses =    useSelector((state: RootState)=> state.coursesState.courses)
  const cToken =    useSelector((state: RootState)=> state.auth.c_token)

useEffect(()=>{
 console.log(user)

  if(!user || (user && user?.role !=='admin') ){
     history.push('/notfound')
}
}, [user])


  useEffect(()=>{
   

 
  
    if(activeTab ==='students'){
      let registeredStudents: User[] =[]   
      const registeredStudentss = students?.filter((s: any)=> s?.courses?.length> 0)
      registeredStudentss?.forEach((student : any)=>{
          student?.courses?.forEach((course: any)=>{
              const group = groups.find((cr)=> cr?._id === course._id)
  
        
          const studentCopy = {...student}
          studentCopy.groupName = group?.name_ka
          studentCopy.groupId = group?._id
              registeredStudents.push(studentCopy)
          })
      })
      setRegStudents(registeredStudents)
    }else {
      setRegStudents([])
    }
   
  
  }, [activeTab, groups, students])


useEffect(()=>{
  dispatch(getEventsAdmin())
  dispatch(startFetchingAdmins(history))
  dispatch(startFetchingStudents(history))
},[])

useEffect(()=>{
  const form = new FormData()
  form.append('id', String(activeEvent?._id))
  form.append('status', eventIsActive? 'active': 'disabled' )


  dispatch(updateEvent(form, true))
},[eventIsActive, activeEvent?._id, dispatch])











  const setActiveTabHandler = (e: React.MouseEvent<HTMLLIElement>, tabName:  TabNames | null, event?: EventModel)=>{
    // console.log(id)
    if(event?._id){
      console.log(event?._id)
      setActiveEvenId(event?._id)
      setActiveEvent(event)
      setEventIsActive(()=>event.status==='active'? true: false)
      setPage('events')
      setActiveTab('events')
    }

    if(tabName){
      setActiveTab(tabName)
    }
  
    setSearchingWords('')

    e.stopPropagation()
    if(page !=='users'){
      // toggleTabs('user')
    }
   
  }


  
  
  const userEditHandler = (user: User)=>{
    setEditingUser(user)
    setUserEditMode(true)
    
  }
  const moduleEditHandler = (module: CourseModel | Group)=>{
    if(module.type ==='COURSE'){
      setEditingCourse(module)
      setCourseEditMode(true)

    }else{
      setGroupEditMode(true)
    
      setEditingGroup(module)
    }

  }

  const eventEditHandler =()=>{
    setEventEditMode(true)
    setEditingEvent(activeEvent)
  }
    

  const [toggleId, setToggleId]=useState('003')
  const toggleIdHandler =(id: any)=>{
    if(toggleId === id){
      setToggleId('')
      return 
    }
    setToggleId(id)
  }

  const toggleTabs =(param: 'user' | 'module' | 'group' | 'events' | 'waiting')=>{
    const callBack = (prev: boolean)=> !prev
      if(param ==='user'){
     
        setShowUsers(callBack)
        setPage('users')
        setActiveTab('users')
      }
      if(param ==='module'){
     
        setShowUsers(false)
        setPage('module')
        setActiveTab('module')
      }
      if(param ==='waiting'){
        setShowWaiting(true)
        setPage('waiting')
        setActiveTab('waiting')
        setShowUsers(false)
      }
      if(param ==='group'){
   
        setShowUsers(false)
        setPage('group')
        setActiveTab('groups')
      }
      if(param ==='events'){
        setShowUsers(false)
        setShowEvents((prev)=> !prev)
        setPage('events')
        setActiveTab('events')
        dispatch(getEventsAdmin())
        if(events?.length){
          setActiveEvenId(events[0]._id)
          setActiveEvent(events[0])
        }
      }
     setSearchingWords('')
  }
 

  const toggleMobMenu = ()=> {
    setShowMobMenu(prev=> !prev)
  }







  let users;

  if(activeTab === 'users'){
    users = students
    
  }
  if(activeTab==='students'){
    users = regStudents
  }

  if(activeTab === 'mentors'){
    users = mentors
  }
  if(activeTab === 'admins'){
    users = admins
  }

  users = users?.filter(user=>searchingWords ? ( user?.name_ka?.toLocaleLowerCase() + user.lastName_ka.toLocaleLowerCase() ).includes(searchingWords) || user?.phone?.toLocaleLowerCase().includes(searchingWords) || user?.id_number?.includes(searchingWords) || user?.email?.toLocaleLowerCase()?.includes(searchingWords)   : true)
  

  let RenderTable: any =[]


    if(page ==='users'){
      RenderTable = users?.map((student: any, i: number)=> {
        
    
    
        return  <UsersTable groups={groups}  userEditClicked={()=> userEditHandler(student)} showMentors={activeTab ==='mentors'? true: false} key={student._id + i} showGroups={activeTab==='students'? true: false} student={student} toggleIdHandler={toggleIdHandler} toggleId={toggleId} />
    
    
    
      })
    }else if(page ==='group' || page ==='module') {
          let sCourses = courses.filter(course=> searchingWords? course?.name_ka.includes(searchingWords) : true )
          let sGroups = groups.filter(course=> searchingWords? course?.name_ka.includes(searchingWords) : true )
          let renderItems = page==='module' ?  sCourses: sGroups
          RenderTable = renderItems?.map((module: any, i: number)=>{
            return <ModuleTable moduleEditStarted={()=> moduleEditHandler(module)} course={module} showGroups={activeTab==='groups'} key={module._id + i} toggleIdHandler={toggleIdHandler}  toggleId={toggleId}  />
          } )
    }else if(page==='events') {
        RenderTable = activeEvent?.participants?.length?  activeEvent?.participants?.map((participant, i)=>{
          return <EventTable key={participant?.email +i}  totalParticipants={0} toggleId={participant?.email} participant={participant}  eventClicked= {(e)=> ''} />
        }): <tr style={{padding: '20px'}} ><th>დამსწრე არ მოიძებნა</th></tr>
    }else if(page==='waiting'){
      RenderTable = waitingStudents?.map((student: any, i: number)=> {
        
    
    
        return  <UsersTable groups={groups}  userEditClicked={()=> userEditHandler(student)} showMentors={activeTab ==='mentors'? true: false} key={student._id + i} showGroups={activeTab==='students'? true: false} student={student} toggleIdHandler={toggleIdHandler} toggleId={toggleId} />
    
    
    
      })
    }


  const overlayClicked= ()=>{
    setUserEditMode(false)
    setCourseEditMode(false)
    setGroupEditMode(false)
    dispatch(adminActions.resetInfo({}))
    setCreateMode(false)
    setEventEditMode(false)
    // setEditingUser(null)
  }


  const updateHandler = (form: any)=>{
  
    dispatch(updateUSerByAdmin(form, null, cToken))
  }

  const modalCloseHandler=()=>{
     setUserEditMode(false)
     setCourseEditMode(false)
    dispatch(adminActions.resetInfo({}))
    setCreateMode(false)
  }


  const updateModuleHandler = (form: any)=>{

    dispatch(updateCourse(form))
  }

  const updateGroup = (form: any) =>{

    dispatch(updateGroupByAdmin(form))
  }

  const createHandler =()=>{
    setCreateMode(true)
   
  }

  const createEvent =()=>{
    setCreateMode(true)
    setPage('events')
    setActiveTab('events')
  }

  const searchingHendler = (searched: string)=>{
   setSearchingWords(searched)
  }

  const toggleEventIsActive =()=>{
    setEventIsActive(prev=> !prev)
  }
  const eventChangeHandler =(info: string)=>{
    // console.log(info)

    if(page==='events'){
      const activeEvent = events.find((event)=> event?.title===info || event._id ===info)
      // console.log(activeEvent)
      if(activeEvent){
        setActiveEvenId(activeEvent?._id)
        setActiveEvent(activeEvent)
      }
    }else if(page==='waiting'){
      const waitingCourse1 = courses.find((course)=>{
          console.log(course?.name_ka, info)
          console.log(course._id, info)
    
        return course?.name_ka.trim()===info.trim() || course._id ===info})
      setWaitingCourse(waitingCourse1)
      if(waitingCourse1){
        const studentsWaiting = students.filter(student=> waitingCourse1.waitingLeast.includes(student?._id as string))
        setWaitingStudents(studentsWaiting)
        console.log(studentsWaiting)
      }else {
        setWaitingStudents([])
      }

    }
   
    
  }



    return <div  className='a_wrapper'>

<ShowIf if={userEditMode || createMode && page ==='users'}>
<UserEdit  studentsTab={activeTab==='students'? true: false} createMode={createMode} groups={groups as any} mentor={activeTab==='mentors'? true: false}  closeModal={modalCloseHandler} editSuccess={studentUpdateSuccess}  updateUser={updateHandler} user={editingUser} />

</ShowIf>
<ShowIf if={courseEditMode  || createMode && page ==='module'}>
<ModuleEdit createMode={createMode} deleteSuccess={deleteSuccess} groups={groups as any} mentor={true}  closeModal={overlayClicked} editSuccess={updateSuccess}  updateModule={updateModuleHandler} course={editingCourse} />

</ShowIf>
<ShowIf if={groupEditMode  || createMode && page ==='group'}>
<GroupEdit students={students} createMode={createMode} mentors={mentors} courses={courses} deleteSuccess={deleteSuccess} groups={groups as any} mentor={true}  closeModal={overlayClicked} editSuccess={updateSuccess}  updateGroup={updateGroup} group={editingGroup} />

</ShowIf>
<ShowIf if={eventEditMode   || createMode && page ==='events'}>
  
<EventEdit event={editingEvent as any}  
students={students} createMode={createMode} mentors={mentors} courses={courses} deleteSuccess={deleteSuccess} groups={groups as any} mentor={true}  closeModal={overlayClicked} editSuccess={updateSuccess}  loading={loading} updateGroup={updateGroup} group={editingGroup} />

</ShowIf>
    
<Overlay show={userEditMode || courseEditMode || groupEditMode || createMode || eventEditMode}  overlayClicked={overlayClicked} />

    


 
    <div onClick={toggleMobMenu} className='a_burger-menu' style={{position: 'absolute', top: '100px', left: '20px', cursor: 'pointer' }}>
      <GiHamburgerMenu size={'30px'} color='#12c2e9' />
    
      </div>
{/* needed to be seperate component */}
    <div className={`left-side-bar ${showMobMenu? 'open' : ''}`}>
  
      <div className="brand-logo">
        <a href="index.html">
          <img
            src="vendors/images/deskapp-logo.svg"
            alt=""
            className="dark-logo"
          />
          <img
            src="vendors/images/deskapp-logo-white.svg"
            alt=""
            className="light-logo"
          />
        </a>
        <div className="close-sidebar" data-toggle="left-sidebar-close">
          <i className="ion-close-round" />
        </div>
      </div>
     
    
      <div className="menu-block customscroll">
      <div className='a_close' onClick={toggleMobMenu} style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px', cursor: 'pointer'}} >
          <RiCloseLine size={'25px'} color='#fff'/>
        </div>
        <div className="sidebar-menu">
          <ul id="accordion-menu">
            <li className="dropdown">
              <a onClick={()=>toggleTabs('user')} className="dropdown-toggle">
                <FcManager style={{width: '30px'}} className="micon bi bi-house" />
                <span className="mtext" style={{cursor: 'pointer'}} >მომხმარებლები</span>
              </a>
              <ul className={`submenu ${showUsers? 'sidebar_users-show': '' }`}  >
                <li onClick={(e)=> setActiveTabHandler(e, 'users')} >
                  <a  style={{cursor: 'pointer'}} className={` ${ activeTab === 'users' ?'a-active--nav': ''}`} >all users</a>
                </li>
                <li onClick={(e)=> setActiveTabHandler(e,'students')}>
                  <a  style={{cursor: 'pointer'}} className={` ${ activeTab === 'students' ?'a-active--nav': ''}`}  >სტუდენტები</a>
                </li>
                <li onClick={(e)=> setActiveTabHandler(e,'mentors')}>
                  <a  style={{cursor: 'pointer'}} className={` ${ activeTab === 'mentors' ?'a-active--nav': ''}`} >მენტორები</a>
                </li>
                <li onClick={(e)=> setActiveTabHandler(e,'admins')}>
                  <a  style={{cursor: 'pointer'}} className={` ${ activeTab === 'admins' ?'a-active--nav': ''}`} >ადმინები</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a style={{cursor: 'pointer'}}  onClick={()=>toggleTabs('module')} className="dropdown-toggle remove_arrow">
                <FaLayerGroup color='#12c2e9' style={{width: '25px'}} className="micon bi bi-textarea-resize" />
                <span className="mtext">მოდულები</span>
              </a>
            
            </li>
            <li className="dropdown">
              <a style={{cursor: 'pointer'}}  onClick={()=>toggleTabs('group')} className="dropdown-toggle remove_arrow">
                <MdGroup color='#12c2e9'  style={{width: '30px'}} className="micon bi bi-table" />
                <span className="mtext">ჯგუფები</span>
              </a>
             
            </li>
            <li className="dropdown">
              <a onClick={()=>toggleTabs('events')} style={{cursor: 'pointer'}} className="dropdown-toggle">
                <MdEventAvailable color='#12c2e9' style={{width: '30px',}} className="micon bi bi-house" />
                <span className="mtext" style={{cursor: 'pointer'}} >ივენთები</span>

               
              </a>
              <ul className={`submenu ${showEvents? 'sidebar_users-show': '' }`}  >
{/*             
                {
                  //events.map(event=> {
                    return <li key={event._id} onClick={(e)=> setActiveTabHandler(e, null,  event)} >
                    <a  style={{cursor: 'pointer'}} className={` ${ event._id == activeEventId ?'a-active--nav': ''}`} >{event?.title}</a>
                  </li>
                  }) 
                } */}
                <li style={{ justifySelf: 'flex-end', height: '40px'}} className='edit-button' onClick={createEvent}  >CREATE EVENT</li>
              </ul>
            </li>
            <li className="dropdown">
              <a style={{cursor: 'pointer'}}  onClick={()=>toggleTabs('waiting')} className="dropdown-toggle remove_arrow">
                <MdGroup color='#12c2e9'  style={{width: '30px'}} className="micon bi bi-table" />
                <span className="mtext">მომლოდინეთა სია</span>
              </a>
             
            </li>
        
          </ul>
        </div>
      </div>
    </div>
    <div onClick={toggleMobMenu} className={`mobile-menu-overlay ${showMobMenu?'show': ''}`} />
    <div className="main-container" style={{paddingBottom: '400px'}} >
      <div className="xs-pd-20-10 pd-ltr-20">
        {/* <div className="title pb-20">
          <h2 className="h3 mb-0">რეგისტრირებული მომხმარებლები</h2>
        </div> */}
     
    
        <div className="card-box pb-10" style={{marginBottom: '100px', position: 'relative'}} >
          <div className="h5 pd-20 mb-0"> { activeTab==='events' || activeTab==='waiting'?   <div className="form-group w-50">


<SelectEvent roleChange={true} courses={activeTab==='waiting'? courses: undefined} valueChanged={eventChangeHandler} id={activeEvent?._id} events={events}  />
</div>

:

getTableName().get(activeTab)} {page==='events'? '': '(' +RenderTable?.length +')'}  {activeTab==='events' && events?.length ?  <AiFillEdit onClick={eventEditHandler} style={{cursor: 'pointer'}} size={'25px'} color="#12c2e9" />: ''}      </div>
     
        {
          page!=='events'  ?<div className="admin__create" onClick={createHandler} > Create <TiPlus size={'25px'} color="#12c2e9" /></div>  :  <div className="form-check form-switch admin__toggle">
          
          <input checked={eventIsActive}  onChange={toggleEventIsActive} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
         
        </div>
        } 
        
          {/* <Search/> */}
          <SearchComponent searchValue={searchingWords} searching={searchingHendler} />
          <table className="data-table table nowrap">
            <thead>
              <tr>
                <th className="table-plus">  {page ==='users'? 'სახელი და გვარი': 'სახელი და გვარი'} </th>
                <th  className='id_desktop'> {page ==='users'&& activeTab==='students' ? 'გადახდილი თანხა': page ==="events"? 'იმეილი' : page==='users'? 'პირადი ნომერი' : page==='group'? 'დღეები': 'ფასი'}</th>
                <th  className='phone_desktop'>{page ==='users'? 'ტელეფონის ნომერი': page==='group'? 'საათები': page==='events'? 'ტელეფონის ნომერი': 'დაწყების თარიღი'}</th>
              {page!=='events'  ? <th className='imeil_desktop' >{page ==='users'? 'იმეილი':page==='group'? 'სტუდენტების რაოდენობა': 'შეხვედრების რაოდენობა'}</th> : ''}  

             {  activeTab==='students'? <th className='imeil_desktop'>ჯგუფი</th>: '' }
             <th className='id_desktop' >edit</th>
              </tr>
            </thead>
            <tbody>



              {

RenderTable

               
              }



        
        

            
            
            
            </tbody>
          </table>
        </div>
       
      
      
      </div>
    </div>
    {/* welcome modal start */}

    {/* <button className="welcome-modal-btn">
      <i className="fa fa-download" /> Download
    </button> */}
    {/* welcome modal end */}
    {/* js */}
    {/* Google Tag Manager (noscript) */}
   

 
    {/* End Google Tag Manager (noscript) */}
  </div>
  
  
}


export default HomeContainer