"use client";

import { CourseModel } from "../../models/courseModel";
import GroupCard from "../../components/course/group-card";
import EmptyState from "../../ui/empty-state";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth/auth-slice";
import { AppDispatch, RootState } from "../../store/reducer";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  addToWaitingLeast,
  buyCourse,
  startFetchingDirections,
  startFetchingGroupsForCourse,
} from "../../store/courses/courses-effects";
import { purchaseHandler, romanNums } from "../../utils/utils";
import { Group } from "../../models/groupModel";
import ShowIf from "../../utils/showIf";
import Link from "next/link";
import RegisterModal from "../../components/register-modal/registerModal";
import Overlay from "../../ui/overlay/overlay";
import { coursesAction } from "../../store/courses/courses.slice";
import DirectionCard from "../../components/course/direction-card";
import ModuleCard from "../../components/course/module-card";
import { DirectionModel } from "../../models/directionModel";
import teo from "../../img/teo.png";
import CourseCard from "../../components/course/course-card";
import { img_route } from "../../api/endPoints";
import arrowup from "../../img/chevron-up.svg";
import arrowdown from "../../img/chevron-down.svg";
import { ApiService } from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../../ui/image/image";
export const CourseContainer: React.FC<{ course: CourseModel }> = (props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const params = useParams() as any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const directions = useSelector(
    (state: RootState) => state.coursesState.directions,
  );
  const activeCourse = useSelector(
    (state: RootState) => state.coursesState.activeCourse,
  );
  const activeDirection = useSelector(
    (state: RootState) => state.coursesState.activeDirection,
  );
  const activeModule = useSelector(
    (state: RootState) => state.coursesState.activeModule,
  );
  const userLogged = useSelector((state: RootState) => state.auth.LoggedIn);
  const studentAddedToWaitingLeast = useSelector(
    (state: RootState) => state.coursesState.studentAddedToWaitingLeast,
  );
  const courses = useSelector((state: RootState) => state.coursesState.courses);
  const [activeGroup, setActiveGroup] = useState<Group>();
  const [waitingMode, setWaitingMode] = useState<boolean>(false);
  const [started, setStarted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setIsVisible] = useState(true);
  const [isBonus, setBonus] = useState(false);
  const [isVisibleDetails, setIsVisibleDetails] = useState(true);
  const [isVisibleCourse, setIsVisibleCourse] = useState(true);
  const [isVisibleModules, setIsVisibleModules] = useState(true);
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [AdditinalInfo, setAdditinalInfo] = useState<any>(null);
  const [locations, setLocations] = useState<any>(null);
  const [isCourse, setCourse] = useState<any>(null);
  const [activeLocation, setActiveLocation] = useState(false);
  const [activeCurLocation, setActiveCurLocation] = useState([]);
  const [activeDirModules, setActiveDirModules] = useState([]);
  const filteredDirectionsRef: any = useRef([]);
  const filteredModulesRef: any = useRef([]);
  const [ModuleMentors, setModuleMentors] = useState<any>([]);
  const [CourseModule, setCourseModule] = useState<any>(null);
  const [isVisibleCont, setIsVisibleCont] = useState(true);
  const [currentName, setCurrentName] = useState("");
  useEffect(() => {
    const activeLocationId = activeLocation.toString(); // Convert to string for comparison
    const filteredDirections = directions.filter((direction) => {
      const locationIds = direction.locations;
      return locationIds.includes(activeLocationId);
    });

    filteredDirectionsRef.current = filteredDirections;
    setActiveCurLocation(filteredDirectionsRef.current);
    setTimeout(function () {
      if (window.innerWidth <= 768) {
        // Mobile device
        window.scrollTo(0, 580);
      } else {
        // Non-mobile device
        window.scrollTo(0, 310);
      }
    }, 2);
  }, [activeLocation]);
  useEffect(() => {
    const activeLocationId = activeLocation.toString();
    const filteredModules = activeDirection?.modules?.filter((module) => {
      const locationIds: any = module["locations"];
      return locationIds.includes(activeLocationId);
    });

    filteredModulesRef.current = filteredModules;
    setActiveDirModules(filteredModulesRef.current);
  }, [activeDirection, activeLocation]);

  useEffect(() => {
    directions?.forEach((direction) => {
      direction.modules?.forEach((m: any) => {
        if (m?.id == 3) {
          dispatch(coursesAction.activeModuleChanged({ module: m }));
        }
      });
    });
  }, [directions, dispatch]);

  useEffect(() => {
    if (!activeCourse && courses.length > 0 && params?.id) {
      const course = courses.find(
        (c: any) => c._id === params.id || c.id?.toString() === params.id,
      );
      if (course) {
        dispatch(coursesAction.activeCourseChanged({ course }));
      }
    }
  }, [activeCourse, courses, params?.id, dispatch]);

  useEffect(() => {
    ApiService.apiCall(EndPoints.GET_LOCATIONS)
      .then((res: any) => {
        setLocations(res?.data?.data);
      })
      .catch((err: any) => {});
    dispatch(startFetchingDirections());
  }, [router]);
  useEffect(() => {
    setTimeout(function () {}, 2);
    if (props.course?.groups?.length) {
    } else {
      dispatch(startFetchingGroupsForCourse(params?.id));
    }
    if (searchParams.has("bonus")) {
      setBonus(true);
      setIsVisibleCourse(true);
    }
  }, []);

  useEffect(() => {
    if (activeModule?.id || activeCourse?.module_id) {
      ApiService.apiCall(
        EndPoints.GET_ADDITIONAL,
        activeModule?.id || activeCourse?.module_id,
      )
        .then((res: any) => {
          //console.log("add3",res?.data?.data)
          setAdditinalInfo(res?.data?.data);
        })
        .catch((err: any) => {});

      ApiService.apiCall(
        EndPoints.GET_MODULEMENTORS,
        activeModule?.id || activeCourse?.module_id,
      )
        .then((res: any) => {
          // console.log("h",res)
          setModuleMentors(res?.data?.data);
        })
        .catch((err: any) => {});
      ApiService.apiCall(
        EndPoints.GET_MODULE,
        activeModule?.id || activeCourse?.module_id,
      )
        .then((res: any) => {
          if (res?.data?.data.length > 0) {
            setCourseModule(res?.data?.data[0]);
          }
        })
        .catch((err: any) => {});
    }

    setCourse(props.course);
    const isScroll = searchParams.has("scroll");
    if (isScroll) {
      setTimeout(function () {
        var elem = document.getElementById("COURSESDIV");
        // @ts-ignore
        if (elem) {
          var elementPosition =
            elem.getBoundingClientRect().top + window.scrollY;
          var offset = -50;
          var scrollPosition = elementPosition + offset;
          if (window.innerWidth <= 768) {
            window.scrollTo({ top: scrollPosition, behavior: "smooth" });
          } else {
            offset = -130;
            scrollPosition = elementPosition + offset;
            window.scrollTo({ top: scrollPosition, behavior: "smooth" });
          }
        }
      }, 2);
    }
  }, [activeCourse, activeModule]);
  useEffect(() => {
    const group = props?.course?.groups?.find(
      (grp) => grp._id.toString() === params.groupId,
    );
    if (group) {
      setActiveGroup(group);
    }
  }, [params, props.course]);
  useEffect(() => {
    //setCourse(props.course)
    // console.log("props",props)
    // console.log("course",props?.course)
    // console.log("course2",activeCourse)
    // console.log("course3",isCourse)
  }, [router]);

  const activeCourseChanged = (course: CourseModel) => {
    if (!started) {
      setStarted(true);
    }
    dispatch(coursesAction.activeCourseChanged({ course }));
    // dispatch(startFetchingGroupsForCourse(course._id))
  };

  const navigateToCourseHandler = (id: string, course: CourseModel) => {
    activeCourseChanged(course);
    if (isVisibleModules) {
      setTimeout(function () {
        var elem = document.getElementById("COURSESDIV");
        // @ts-ignore
        var elementPosition = elem.getBoundingClientRect().top + window.scrollY;
        var offset = -50;
        var scrollPosition = elementPosition + offset;
        if (window.innerWidth <= 768) {
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        } else {
          offset = -130;
          scrollPosition = elementPosition + offset;
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        }
      }, 2);
    } else {
      setTimeout(function () {
        window.scrollTo(0, 1950);
      }, 2);
    }
    // console.log("clicked",course)

    router.push(`/${lang}/courses/${id}`);
    dispatch(coursesAction.activeCourseChanged({ course }));
    setCourse(course);
    // console.log("aris2",isCourse)
    setIsVisible(true);
    setIsVisibleDetails(true);
  };

  const activeModuleChanged = (module: DirectionModel) => {
    if (!started) {
      setStarted(true);
    }
    setIsVisibleCont(true);
    dispatch(coursesAction.activeModuleChanged({ module }));
    setTimeout(function () {
      var elem = document.getElementById("COURSEDIV");
      // @ts-ignore
      var elementPosition = elem.getBoundingClientRect().top + window.scrollY;
      var offset = -50;
      var scrollPosition = elementPosition + offset;
      if (window.innerWidth <= 768) {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      } else {
        offset = -130;
        scrollPosition = elementPosition + offset;
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
    }, 2);
    showModules();
    showCourse();
    setIsVisibleDetails(false);
  };

  const activeDirectionChanged = (direction: DirectionModel) => {
    if (!started) {
      setStarted(true);
    }
    dispatch(coursesAction.activeDirectionChanged({ direction }));
    let element: any = document.querySelector(".scroll-to");
    setTimeout(function () {
      var elem = document.getElementById("MODULEDIV");
      // @ts-ignore
      var elementPosition = elem.getBoundingClientRect().top + window.scrollY;
      var offset = -50;
      var scrollPosition = elementPosition + offset;
      if (window.innerWidth <= 768) {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      } else {
        offset = -100;
        scrollPosition = elementPosition + offset;
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
    }, 2);
    showModules();
  };
  const toggleRegModal = (id: string, groupId: string, mobile?: boolean) => {
    if (
      activeGroup?.students?.length &&
      activeGroup.students.length > 25 &&
      userLogged
    ) {
      setWaitingMode(true);
      return;
    }

    if (!userLogged) {
      // dispatch(authActions.toggleRegistrationModal(true))
      // dispatch(buyCourse(id, groupId))
      purchaseHandler(id);
    } else {
      // dispatch(buyCourse(id, groupId))
      purchaseHandler(id);
    }
  };

  const toggleRegModalFromMobile = (id: string, groupId: string) => {
    if (
      activeGroup?.students?.length &&
      activeGroup.students.length > 25 &&
      userLogged
    ) {
      setWaitingMode(true);
      return;
    }

    purchaseHandler(id);
  };

  const toWaitingLeast = () => {
    if (props.course?._id) {
      dispatch(addToWaitingLeast(props?.course?._id));
    }
  };

  const disableWaitingModeHandler = () => {
    setWaitingMode(false);
    dispatch(coursesAction.addedToWaitingLeast(false));
  };
  const toggleItem = (id: number) => {
    // If the item is already open, close it, otherwise open the clicked item
    setOpenItemId(openItemId === id ? null : id);
  };
  const toggleVisibility = () => {
    setIsVisible(false);
    if (isVisibleModules) {
      setTimeout(function () {
        var elem = document.getElementById("ADDITDIV");
        // @ts-ignore
        var elementPosition = elem.getBoundingClientRect().top + window.scrollY;
        var offset = -100;
        var scrollPosition = elementPosition + offset;
        if (window.innerWidth <= 768) {
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        } else {
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        }
      }, 2);
    } else {
      setTimeout(function () {
        if (window.innerWidth <= 768) {
          // Mobile device
          window.scrollTo(0, 1050);
        } else {
          // Non-mobile device
          window.scrollTo(0, 770);
        }
      }, 2);
    }
  };
  const showCourse = () => {
    setIsVisibleCourse(true);
  };
  const hideCourse = () => {
    setIsVisibleCourse(false);
  };
  const showModules = () => {
    setIsVisibleModules(true);
  };
  const hideModules = () => {
    setIsVisibleModules(false);
  };
  const showDirections = (location_id: any) => {
    setActiveLocation(location_id);
    setIsVisible(true);
    hideCourse();
    hideModules();
  };
  let k = 0;

  const handleSlideChange = (swiper: any) => {
    const currentSlide = swiper.realIndex;
    //console.log(currentSlide)
    const currentMentor = ModuleMentors[currentSlide];
    if (lang === "ka") {
      setCurrentName(currentMentor?.name_ka || "");
    } else {
      setCurrentName(currentMentor?.name_en || "");
    }
  };

  return (
    <div className="wrapper LIGHTS">
      {waitingMode ? (
        <React.Fragment>
          <RegisterModal
            addToWaiting={toWaitingLeast}
            buttonText={"დამატება"}
            success={studentAddedToWaitingLeast}
            successText={"თქვენ წარმატებით დაემატეთ მომლოდინეთა სიაში!"}
            waitingMode={true}
            closeModal={disableWaitingModeHandler}
            title={"სამწუხაროდ ჯგუფზე ადგილები შევსებულია"}
          />
        </React.Fragment>
      ) : (
        ""
      )}

      <Overlay show={waitingMode} overlayClicked={disableWaitingModeHandler} />
      <section
        className={"serv-arch mt-5"}
        style={{ borderRadius: "20px 20px 0px 0px" }}
        data-scroll-index={1}
      >
        <div
          className={"container MSDIV"}
          style={{
            background: "#131415",
            borderRadius: "30px 30px",
            padding: "3rem 7rem 2rem 7rem",
          }}
        >
          <div className={"row justify-content-center"}>
            <div className="cont text-center py-4">
              <h1
                className="mb-10 text-white color-font-mob"
                style={{
                  fontFamily: "Helvetica_Neue_LT_GEO",
                  fontFeatureSettings: "'case' on",
                }}
              >
                {t("choose prefered location")}
              </h1>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                {locations?.map((location: any, i: number) => {
                  if (location) {
                    k = k + 1;
                    const isActive = location.id === activeLocation;
                    return (
                      <div
                        key={location.id || i}
                        className="col-4 CP LOCATION add-hover"
                        onClick={() => showDirections(location.id)}
                        style={{
                          textAlign: "center",
                          color: "#FFF",
                          fontFamily: "Helvetica_Neue_LT_GEO",
                          fontFeatureSettings: "'case' on",
                          opacity: !isActive ? 0.5 : 1,
                        }}
                      >
                        <div>
                          {lang === "ka" ? (
                            <>{location?.name_ka}</>
                          ) : (
                            <>{location?.name_en}</>
                          )}
                        </div>
                        <div
                          style={{
                            marginTop: "3px",
                            fontFamily:
                              "'NinoMtavruli', 'bpg_nino_mtavruliregular', sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          {lang === "ka" ? (
                            <>{location?.address_ka}</>
                          ) : (
                            <>{location?.address_en}</>
                          )}
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {isVisible && activeLocation && (
        <section className="serv-arch" style={{ borderRadius: "20px" }}>
          <div
            className={"container MSDIV"}
            style={{
              background: "#131415",
              borderRadius: "30px",
              padding: "3rem 7rem 2rem 7rem",
            }}
          >
            <div className={"row justify-content-center"}>
              <div className="cont text-center py-4">
                <h1
                  className="mb-10 text-white color-font-mob"
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO",
                    fontFeatureSettings: "'case' on",
                  }}
                >
                  {t("choose prefered age category")}
                </h1>
              </div>
              {activeCurLocation?.map((crs: any, i: number) => {
                if (crs) {
                  k = k + 1;
                  return (
                    <DirectionCard
                      key={crs._id || crs.id || i}
                      directionClicked={activeDirectionChanged}
                      direction={crs}
                      index={k}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            {isVisibleModules && (
              <div id="MODULEDIV" className={"row justify-content-center"}>
                {activeDirModules?.map((crs: any, i) => {
                  if (crs) {
                    k = k + 1;
                    return (
                      <ModuleCard
                        key={crs._id || crs.id || i}
                        moduleClicked={activeModuleChanged}
                        module={crs}
                        index={k}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
          </div>
        </section>
      )}
      {isVisibleCourse && (
        <section>
          <div
            className="container mt-3 MSDIV"
            id="COURSEDIV"
            style={{
              color: "#FFF",
              background: "#131415",
              borderRadius: "30px",
              padding: "3rem 7rem 2rem 7rem",
            }}
          >
            <div className="row">
              <div className="col-12 col-sm-5">
                <Swiper
                  navigation={false}
                  modules={[Navigation, Pagination, Autoplay]}
                  style={{
                    zIndex: 0,
                    height: "500px",
                    minHeight: "500px",
                    background: "#dddddd1a",
                    borderRadius: "30px",
                  }}
                  className="mySwiper"
                  preventClicks={false}
                  allowTouchMove={true}
                  draggable={true}
                  spaceBetween={20}
                  onSlideChange={handleSlideChange}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  loop={ModuleMentors?.length > 1}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },

                    670: {
                      slidesPerView: 1,
                    },

                    1050: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },

                    1400: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {ModuleMentors?.map((slider: any, i: number) => {
                    return (
                      <SwiperSlide
                        key={slider?.id || slider?._id || i}
                        style={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <ResponsiveImage
                          style={{
                            borderRadius: "10px",
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          link={`${img_route}${slider?.photo}`}
                          name="dd"
                          unoptimized
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="col-12 col-sm-7">
                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "32px",
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    fontFeatureSettings: "'case' on",
                  }}
                >
                  {lang === "ka" ? (
                    <>
                      {activeModule ? (
                        <>{activeModule.name_ka}</>
                      ) : (
                        <>{CourseModule?.name_ka}</>
                      )}
                    </>
                  ) : (
                    <>
                      {activeModule ? (
                        <>{activeModule.name_en}</>
                      ) : (
                        <>{CourseModule?.name_en}</>
                      )}
                    </>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    fontFeatureSettings: "'case' on",
                  }}
                >
                  {currentName}
                  <div
                    onClick={() => toggleVisibility()}
                    style={{ padding: "9px 12px 6px 12px" }}
                    className="BLUB d-inline-block mt-3 mt-sm-0"
                  >
                    + {t("additional modules")}
                  </div>
                </div>
                <div
                  className="MTEXT"
                  style={{
                    background: "rgb(0, 0, 0)",
                    padding: "30px",
                    borderRadius: "21px",
                    width: "120%",
                    transform: "translateX(-15%)",
                    marginTop: "30px",
                    fontSize: "18px",
                    lineHeight: "40px",
                    color: "rgb(241, 241, 241)",
                    fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                  }}
                >
                  {lang === "ka" ? (
                    <>
                      {" "}
                      {activeModule ? (
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: activeModule.text_ka,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: CourseModule?.text_ka,
                            }}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      {activeModule ? (
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: activeModule.text_en,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: CourseModule?.text_en,
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <select style={{ visibility: "hidden" }}>
                    <option>აირჩიეთ საფეხური</option>
                  </select>
                  <button
                    className="butn bord d-none curve mt-30 hover-color border-new"
                    style={{
                      float: "right",
                      width: "47%",
                      fontSize: "18px",
                      padding: "12px 3px",
                      textAlign: "center",
                      margin: "3px",
                      borderRadius: "39px!important",
                    }}
                  >
                    {t("buy the course")}
                  </button>
                  <a
                    target="_blank"
                    href="https://forms.gle/uC49R5XNa8VUrTsd8"
                    className="butn bord curve mt-30 hover-color border-new"
                    style={{
                      width: "65%",
                      fontSize: "18px",
                      padding: "15px 3px 7px",
                      textAlign: "center",
                      margin: "3px",
                      borderRadius: "39px!important",
                    }}
                  >
                    {t("courseregister")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {isVisibleCourse && (
        <section>
          <div
            id="COURSESDIV"
            className="container mt-4 py-0"
            style={{
              color: "#FFF",
              background: "#131415",
              borderRadius: "30px",
              padding: "3rem 7rem 2rem 7rem",
            }}
          >
            <div
              className="row"
              style={{
                background: "#000",
                color: "#f1f1f1",
                fontFamily: "Helvetica_Neue_LT_GEO_55",
                fontFeatureSettings: "'case' on",
                margin: "0px -112px",
                borderRadius: "30px 30px 0px 0px",
              }}
            >
              {activeModule?.courses?.map((crs: any, i) => {
                // console.log(crs.groups[0])
                // console.log("ddd",crs)
                if (crs && crs.showHide === "1") {
                  k = k + 1;
                  return (
                    <CourseCard
                      key={crs._id || crs.id || i}
                      custom={isCourse}
                      courseClicked={() => navigateToCourseHandler(crs.id, crs)}
                      course={crs}
                      index={k}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </section>
      )}
      {isVisible && isVisibleCourse && isVisibleDetails && (
        <section>
          <div
            className="container mb-4 py-0 MSDIV"
            style={{
              color: "#FFF",
              background: "#131415",
              borderRadius: "0px 0px 30px 30px",
              padding: "3rem 7rem 2rem 7rem",
            }}
          >
            <div className="row mb-5" style={{ overflow: "hidden" }}>
              <div className="col-lg">
                <div className="item mt-30 BOXI">
                  <h6 style={{ color: "#FFF" }}>{t("Start date")}</h6>
                  <p>
                    <span className="y-c" style={{ color: "#FFF" }}>
                      {lang === "ka" ? (
                        <>{isCourse?.startDate_ka}</>
                      ) : (
                        <>{isCourse?.startDate_en}</>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-lg">
                <div className="item mt-30 BOXI">
                  <h6 style={{ color: "#FFF" }}>{t("Duration")}</h6>
                  <p className="y-c" style={{ color: "#FFF" }}>
                    {lang === "ka" ? (
                      <>{isCourse?.numberOfLectures_ka}</>
                    ) : (
                      <>{isCourse?.numberOfLectures_en}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg">
                <div className="item mt-30 BOXI">
                  <h6 style={{ color: "#FFF" }}>{t("location")}</h6>
                  <p className="y-c" style={{ color: "#FFF" }}>
                    {lang === "ka" ? (
                      <>{isCourse?.location_ka}</>
                    ) : (
                      <>{isCourse?.location_en}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg">
                <div className="item mt-30 BOXI">
                  <h6 style={{ color: "#FFF" }}>{t("schedule")}</h6>

                  <p className="y-c" style={{ color: "#FFF" }}>
                    {lang === "ka" ? (
                      <>{isCourse?.schedule_ka}</>
                    ) : (
                      <>{isCourse?.schedule_en}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg">
                <div className="item mt-30 BOXI">
                  <h6 style={{ color: "#FFF" }}>{t("price")}</h6>

                  <p className="y-c" style={{ color: "#FFF" }}>
                    {props?.course?.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="row d-none">
              <div className="col-lg-3 col-md-4">
                <div className="htit">
                  <h4 className="text-white">შესაძლებლობა </h4>
                </div>
              </div>
              <div className="col-lg-8 offset-lg-1 col-md-8 about-module">
                <div className="text js-scroll__content">
                  <p className="extra-text" style={{ fontSize: "15px" }}>
                    {isCourse?.detailDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-3 col-md-4">
                <div className="htit">
                  <h4 className="text-white">{t("goal of the course")} </h4>
                </div>
              </div>
              <div className="col-lg-8 offset-lg-1 col-md-8">
                <div className="text js-scroll__content">
                  <p
                    className="extra-text"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                    }}
                  >
                    {lang === "ka" ? (
                      <>{isCourse?.purpose_ka} </>
                    ) : (
                      <>{isCourse?.purpose_en} </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-3 col-md-4">
                <div className="htit">
                  <h4 className="text-white">
                    {t("Prerequisite for admission to the course")}
                  </h4>
                </div>
              </div>
              <div className="col-lg-8 offset-lg-1 col-md-8">
                <div className="text js-scroll__content">
                  <p
                    className="extra-text"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                    }}
                  >
                    <span className="">
                      {lang === "ka" ? (
                        <>{isCourse?.educational_requirement_ka} </>
                      ) : (
                        <>{isCourse?.educational_requirement_en} </>
                      )}
                    </span>
                  </p>
                  <p className="extra-text" style={{ fontSize: "15px" }}></p>

                  <ShowIf
                    if={isCourse?.computer_requirement?.data ? true : false}
                  >
                    <div
                      className="extra-text"
                      style={{ fontFamily: "Helvetica_Neue_LT_GEO_55, serif" }}
                    >
                      <span className="">
                        {" "}
                        {props?.course?.computer_requirement?.name}:{" "}
                      </span>

                      <ul>
                        {props?.course?.computer_requirement?.data?.map(
                          (req: string, i: number) => {
                            return (
                              <li
                                style={{
                                  fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                                }}
                                key={`req-${i}-${req.slice(0, 10)}`}
                              >
                                {req}
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  </ShowIf>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-3 col-md-4">
                <div className="htit">
                  <h4 className="text-white">
                    {t("Main topics of the course")}
                  </h4>
                </div>
              </div>
              <div className="col-lg-8 offset-lg-1 col-md-8">
                <div
                  className="text js-scroll__content"
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                  }}
                >
                  {isCourse?.silabus?.[0]?.[0] ? (
                    <>
                      {isCourse?.silabus?.[0]?.map((el: any, index: any) => {
                        return (
                          <React.Fragment key={`syllabus-group-${index}`}>
                            <ul
                              className="smp-list ps-0"
                              style={{ paddingBottom: "10px" }}
                            >
                              {el?.silabus_data?.map((item: any, i: number) => {
                                return (
                                  <React.Fragment
                                    key={`syllabus-item-${index}-${i}`}
                                  >
                                    <p
                                      className=""
                                      style={{
                                        fontFamily:
                                          "Helvetica_Neue_LT_GEO_55, serif",
                                        marginTop: i === 0 ? "0px" : "0px",
                                      }}
                                    >
                                      {lang === "ka" ? (
                                        <>
                                          {item?.subject_ka} {item?.name_ka}
                                        </>
                                      ) : (
                                        <>
                                          {item?.subject_en}{" "}
                                          {item?.name_en}{" "}
                                        </>
                                      )}
                                    </p>
                                    {item?.silabus_data?.map(
                                      (subItem: any, subI: number) => {
                                        return (
                                          <li
                                            key={`syllabus-subItem-${index}-${i}-${subI}`}
                                            className=""
                                            style={{
                                              color: "#a4a7b1",
                                              opacity: "0.8",
                                              fontFamily:
                                                "Helvetica_Neue_LT_GEO_55, serif",
                                            }}
                                          >
                                            {lang === "ka" ? (
                                              <>{subItem?.name_ka}</>
                                            ) : (
                                              <>{subItem?.name_en} </>
                                            )}
                                          </li>
                                        );
                                      },
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </ul>
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {isCourse?.silabus?.map((elAlt: any, indexAlt: any) => {
                        return (
                          <React.Fragment
                            key={`syllabus-alt-group-${indexAlt}`}
                          >
                            <ul
                              className="smp-list ps-0"
                              style={{ paddingBottom: "10px" }}
                            >
                              {elAlt?.silabus_data?.map(
                                (itemAlt: any, iAlt: number) => {
                                  return (
                                    <React.Fragment
                                      key={`syllabus-alt-item-${indexAlt}-${iAlt}`}
                                    >
                                      <p
                                        className=""
                                        style={{
                                          fontFamily:
                                            "Helvetica_Neue_LT_GEO_55, serif",
                                          marginTop: iAlt === 0 ? "0px" : "0px",
                                        }}
                                      >
                                        {lang === "ka" ? (
                                          <>
                                            {itemAlt?.subject_ka}{" "}
                                            {itemAlt?.name_ka}
                                          </>
                                        ) : (
                                          <>
                                            {itemAlt?.subject_en}{" "}
                                            {itemAlt?.name_en}{" "}
                                          </>
                                        )}
                                      </p>
                                      {itemAlt?.silabus_data?.map(
                                        (subItemAlt: any, subIAlt: number) => {
                                          return (
                                            <li
                                              key={`syllabus-alt-subItem-${indexAlt}-${iAlt}-${subIAlt}`}
                                              className=""
                                              style={{
                                                color: "#a4a7b1",
                                                opacity: "0.8",
                                                fontFamily:
                                                  "Helvetica_Neue_LT_GEO_55, serif",
                                              }}
                                            >
                                              {lang === "ka" ? (
                                                <>{subItemAlt?.name_ka}</>
                                              ) : (
                                                <>{subItemAlt?.name_en} </>
                                              )}
                                            </li>
                                          );
                                        },
                                      )}
                                    </React.Fragment>
                                  );
                                },
                              )}
                            </ul>
                          </React.Fragment>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-3 col-md-4">
                <div className="htit">
                  <h4 className="text-white">{t("learning outcomes")}</h4>
                </div>
              </div>
              <div className="col-lg-8 offset-lg-1 col-md-8">
                <p
                  className="text js-scroll__content "
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                  }}
                >
                  {lang === "ka" ? (
                    <>{isCourse?.results_ka} </>
                  ) : (
                    <>{isCourse?.results_en}</>
                  )}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className="htit">
                  <h4 className="text-white">{t("Desired computer data")}</h4>
                </div>
              </div>
              <div className="col-lg-8 offset-lg-1 col-md-8">
                <p
                  className="text js-scroll__content "
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                  }}
                >
                  {lang === "ka" ? (
                    <>{isCourse?.technical_requirement_ka} </>
                  ) : (
                    <>{isCourse?.technical_requirement_en}</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isVisible && isVisibleCourse && (
        <section>
          <div id="ADDITDIV" className="container my-5">
            <h2
              style={{
                fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                fontSize: "16px",
                color: "#FFF",
                fontFeatureSettings: "'case' on",
              }}
            >
              {t(
                "The following bonus modules are included in the course package you choose",
              )}
            </h2>
            {AdditinalInfo?.map((module: any, i: number) => (
              <div
                style={{
                  background: "#222",
                  padding: "30px 30px",
                  marginBottom: "8px",
                  borderRadius: "10px",
                  color: "#FFF",
                }}
                key={module.id || module._id || i}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleItem(module.id)} // Toggle the accordion item on click
                >
                  <h3 className="mb-0" style={{ color: "#FFF" }}>
                    {lang === "ka" ? (
                      <>{module.title_ka} </>
                    ) : (
                      <>{module.title_en}</>
                    )}
                    {openItemId === module.id ? (
                      <img
                        style={{ width: "30px", float: "right" }}
                        src={arrowup}
                        alt="Collapse"
                      />
                    ) : (
                      <img
                        style={{ width: "30px", float: "right" }}
                        src={arrowdown}
                        alt="Expand"
                      />
                    )}
                  </h3>
                </div>
                {openItemId === module.id && (
                  <p
                    className="mb-0"
                    style={{ fontFamily: "Helvetica_Neue_LT_GEO_55, serif" }}
                  >
                    {lang === "ka" ? (
                      <>{module.text_ka} </>
                    ) : (
                      <>{module.text_en}</>
                    )}
                  </p>
                )}{" "}
                {/* Show the text if the item is open */}
              </div>
            ))}
          </div>
        </section>
      )}
      {/* <ErrorModal error='jajaj'/> */}

      {/* ==================== Start Header ==================== */}
      {/* ==================== Start Intro ==================== */}
    </div>
  );
};

export default CourseContainer;
