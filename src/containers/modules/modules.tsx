import courseImage from "../../img/blog/2.jpg";
import courseImage1 from "../../img/blog/1.jpg";
import image1 from "../../img/team/1.jpg";
import { useEffect, useState } from 'react';
import { startFetchingCourses, startFetchingDirections,startFetchingGroupsForCourse } from '../../store/courses/courses-effects';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/reducer';
import DirectionCard from "../../components/course/direction-card";
import CourseCard from "../../components/course/course-card";
import ModuleCard from "../../components/course/module-card";
import { coursesAction } from '../../store/courses/courses.slice';
import directionAction  from '../../store/courses/courses.slice';
import { CourseModel } from '../../models/courseModel';
import { DirectionModel } from '../../models/directionModel';
import {ModuleModel } from '../../models/moduleModel';
import GroupCard from '../../components/course/group-card';
import EmptyState from '../../ui/empty-state';
import { useHistory } from 'react-router';
const ModulesContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()
  const courses = useSelector((state: RootState)=> state.coursesState.courses)
  const directions = useSelector((state: RootState)=> state.coursesState.directions)
  const activeDirection = useSelector((state: RootState)=> state.coursesState.activeDirection)
  const activeModule = useSelector((state: RootState)=> state.coursesState.activeModule)
  const groupsLoading = useSelector((state: RootState)=> state.coursesState.groupsLoading)
  const activeCourse = useSelector((state: RootState)=> state.coursesState.activeCourse)
  const [started, setStarted ] = useState(false)
  useEffect(()=>{
    dispatch(
      startFetchingDirections()
    );
  }, [])

  const activeCourseChanged = (course: CourseModel)=>{
    if(!started){
      setStarted(true)
    }
      dispatch(coursesAction.activeCourseChanged({course}))
      dispatch(startFetchingGroupsForCourse(course._id))
     
  }
  const activeModuleChanged = (module: DirectionModel)=>{
    if(!started){
      setStarted(true)
    }

    dispatch(coursesAction.activeModuleChanged({module}))
    history.push(`/courses`)

  }

const navigateToCourseHandler =(id: string, groupId: string)=>{
  history.push(`${id}/${groupId}`)

}

  const activeDirectionChanged = (direction: DirectionModel)=>{
    if(!started){
      setStarted(true)
    }
    dispatch(coursesAction.activeDirectionChanged({direction}))
    history.push(`/modules`)

  }
const scrollToCourseHandler = (emptyComp?: boolean)=>{
  let element: any = document.querySelector(".scroll-to");

  if(emptyComp){
    // TODO in the future on empty state scroll
    // element = document.querySelector(".empty-comp");

    // console.log('heree')
    // window.scrollTo(0, 200);
    return
  }

element?.scrollIntoView({
  behavior: "smooth",
  block: "start",
  inline: "nearest"
});
}
let k=0
let k2=0
  return (
    <div className="wrapper circle-bg LIGHTS" style={{ background: "#111215", paddingTop: '100px' }}>
      {/* <div className="circle-color fixed">
        <div className="gradient-circle" />
        <div className="gradient-circle two" />
      </div> */}
      {/* ==================== Start Header ==================== */}
      <section className={"serv-arch "} style={{borderRadius: "20px"}} data-scroll-index={1}>
        <div className={"container"}
             style={{background: "#131415", borderRadius: "30px", padding: "3rem 7rem 2rem 7rem"}}>
          <div className={"row justify-content-center"}>
            <div className="cont text-center py-4">
              <h1 className="mb-10 text-white color-font-mob"
                  style={{fontFamily: "Helvetica_Neue_LT_GEO", fontFeatureSettings: "'case' on"}}>აირჩიეთ სასურველი
                კატეგორია</h1>
              {/*<p>ისწავლე დამოუკიდებლად სწავლა</p>*/}
              {activeDirection?.name_ka}
            </div>
            {
              directions?.map((crs, i) => {
                if (crs) {
                  k = k + 1
                  return <DirectionCard key={crs.id} directionClicked={activeDirectionChanged} direction={crs}
                                        index={k}/>
                } else {
                  return ''
                }
              })
            }
          </div>
          <div className={"row justify-content-center"}>
            {
              activeDirection?.modules?.map((crs: any, i) => {
                if (crs) {
                  k = k + 1
                  return <ModuleCard key={crs.id} moduleClicked={activeModuleChanged} module={crs} index={k}/>
                } else {
                  return ''
                }
              })
            }
          </div>
        </div>

      </section>

      <section className={"serv-arch "} data-scroll-index={1}>
        <div className={"container-fluid"}>

        </div>
      </section>


    </div>
  )
}

export default ModulesContainer
