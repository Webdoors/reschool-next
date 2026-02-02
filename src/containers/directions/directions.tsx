import courseImage from "../../img/blog/2.jpg";
import courseImage1 from "../../img/blog/1.jpg";
import image1 from "../../img/team/1.jpg";

import { useEffect, useState } from 'react';
import { startFetchingCourses, startFetchingDirections,startFetchingGroupsForCourse } from '../../store/courses/courses-effects';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/reducer';
import DirectionCard from "../../components/course/direction-card";
import CourseCard from "../../components/course/course-card";
import { coursesAction } from '../../store/courses/courses.slice';
import directionAction  from '../../store/courses/courses.slice';
import { CourseModel } from '../../models/courseModel';
import { DirectionModel } from '../../models/directionModel';
import GroupCard from '../../components/course/group-card';
import EmptyState from '../../ui/empty-state';
import { useHistory } from 'react-router';
import {ApiService} from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
const DirectionsContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()
  const courses = useSelector((state: RootState)=> state.coursesState.courses)
  const directions = useSelector((state: RootState)=> state.coursesState.directions)
  const activeDirection = useSelector((state: RootState)=> state.coursesState.activeDirection)
  const activeModule = useSelector((state: RootState)=> state.coursesState.activeModule)
  const activeLocation = useSelector((state: RootState)=> state.coursesState.activeLocation)
  const groupsLoading = useSelector((state: RootState)=> state.coursesState.groupsLoading)
  const activeCourse = useSelector((state: RootState)=> state.coursesState.activeCourse)
  const [started, setStarted ] = useState(false)
  const [locations, setLocations] = useState<any>(null); // Re
  useEffect(()=>{
    ApiService.apiCall(EndPoints.GET_LOCATIONS)
        .then((res: any) => {
          setLocations(res?.data?.data); // Assuming this is an array
        })
        .catch((err: any) => {
          // console.log(err?.response?.data?.message);
          if (history) {
            // history.push('/notfound');
          }
        });
    dispatch(
        startFetchingDirections()
    );
  }, [history])


  const activeCourseChanged = (course: CourseModel)=>{
    if(!started){
      setStarted(true)
    }
      dispatch(coursesAction.activeCourseChanged({course}))
      dispatch(startFetchingGroupsForCourse(course.id))
     
  }
  const activeDirectionChanged = (direction: DirectionModel)=>{
    if(!started){
      setStarted(true)
    }
    dispatch(coursesAction.activeDirectionChanged({direction}))
    history.push(`/modules`)

  }

const navigateToCourseHandler =(id: string, groupId: string)=>{
  history.push(`${id}/${groupId}`)

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
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility
  const showDirections = () => {
    setIsVisible(true);
  };
let k=0
let k2=0
  return (
    <div className="wrapper circle-bg pb-5 LIGHTS" style={{ background: "#272b2f", paddingTop: '130px' }}>
      {/* <div className="circle-color fixed">
        <div className="gradient-circle" />
        <div className="gradient-circle two" />
      </div> */}
      {/* ==================== Start Header ==================== */}
      {/*<section*/}
      {/*  className="page-header sub-bg "*/}
      {/*  style={{ padding: "50px 0", background: "#111215" }}*/}
      {/*>*/}
      {/*  <div className="container">*/}
      {/*    <div className={"row justify-content-center"}>*/}
      {/*  */}
      {/*      <div className="col-lg-8 col-md-9">*/}
      {/*        <div className="cont text-center py-0">*/}
      {/*          <h1 className="mb-10 text-white color-font-mob">აირჩიეთ ძირითადი მიმართულება</h1>*/}
      {/*          /!*<p>ისწავლე დამოუკიდებლად სწავლა</p>*!/*/}
      {/*          {activeDirection?.name}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className={"serv-arch"} style={{borderRadius: "20px 20px 0px 0px"}} data-scroll-index={1}>
        <div className={"container"}  style={{ background: "#131415",borderRadius:"30px 30px",padding:"3rem 7rem 2rem 7rem"}} >
          <div className={"row justify-content-center"}>
            <div className="cont text-center py-4">
              <h1 className="mb-10 text-white color-font-mob" style={{fontFamily: "Helvetica_Neue_LT_GEO", fontFeatureSettings: "'case' on"}}>აირჩიეთ სასურველი ლოკაცია</h1>
              {/*<p>ისწავლე დამოუკიდებლად სწავლა</p>*/}
              {activeLocation?.name_ka}
            </div>
            <div className="container">
            <div className="row justify-content-center">
              {
                locations?.map((location:any,i:number) => {
                  if (location) {
                    k = k + 1
                    return <div key={location.id} className="col-4 LOCATION" onClick={showDirections} style={{
                      textAlign: "center",
                      color:"#FFF",
                      fontFamily: "Helvetica_Neue_LT_GEO",
                      fontFeatureSettings: "'case' on"
                    }}>
                      <div>{location?.name}</div>
                      <div style={{marginTop:"3px",fontFamily: "'NinoMtavruli', 'bpg_nino_mtavruliregular', sans-serif",fontSize:"14px"}}>{location?.address}</div>
                    </div>
                  } else {
                    return ''
                  }
                })
              }
            </div>
            </div>
          </div>
        </div>
      </section>
      {isVisible && <section className={"serv-arch "} style={{borderRadius: "20px 20px 20px 20px"}} data-scroll-index={1}>
        <div className={"container"}  style={{ background: "#131415",borderRadius:"30px",padding:"3rem 7rem 2rem 7rem"}} >
          <div className={"row justify-content-center"}>
            <div className="cont text-center py-4">
              <h1 className="mb-10 text-white color-font-mob" style={{fontFamily: "Helvetica_Neue_LT_GEO", fontFeatureSettings: "'case' on"}}>აირჩიეთ სასურველი ასაკობრივი ჯგუფი</h1>
              {/*<p>ისწავლე დამოუკიდებლად სწავლა</p>*/}
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
        </div>
      </section>}


    </div>
  )
}

export default DirectionsContainer
