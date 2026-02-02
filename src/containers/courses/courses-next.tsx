"use client";

// import courseImage from "../../img/blog/2.jpg";
// import courseImage1 from "../../img/blog/1.jpg";
// import teo from "../../img/teo.png";
import React, { useEffect, useState, useRef } from "react";
import {
  startFetchingCourses,
  startFetchingDirections,
} from "../../store/courses/courses-effects";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/reducer";
import CourseCard from "../../components/course/course-card";
import { coursesAction } from "../../store/courses/courses.slice";
import { CourseModel } from "../../models/courseModel";
// import GroupCard from '../../components/course/group-card';
// import EmptyState from '../../ui/empty-state';
import { useRouter, useParams } from "next/navigation";
import { DirectionModel } from "../../models/directionModel";
import DirectionCard from "../../components/course/direction-card";
import ModuleCard from "../../components/course/module-card";
import { img_route } from "../../api/endPoints";
// import { Link } from 'react-router-dom';
import { ApiService } from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import arrowup from "../../img/chevron-up.svg";
import arrowdown from "../../img/chevron-down.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ResponsiveImage from "../../ui/image/image";

const CoursesContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const params = useParams(); // Next.js useParams
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const courses = useSelector((state: RootState) => state.coursesState.courses);
  const directions = useSelector(
    (state: RootState) => state.coursesState.directions,
  );
  const filteredDirectionsRef: any = useRef([]);
  const filteredModulesRef: any = useRef([]);
  const activeCourse = useSelector(
    (state: RootState) => state.coursesState.activeCourse,
  );
  const activeDirection = useSelector(
    (state: RootState) => state.coursesState.activeDirection,
  );
  const activeModule = useSelector(
    (state: RootState) => state.coursesState.activeModule,
  );
  // const groupsLoading = useSelector((state: RootState) => state.coursesState.groupsLoading)
  const [started, setStarted] = useState(false);
  const [AdditinalInfo, setAdditinalInfo] = useState<any>(null);
  const [isVisibleCont, setIsVisibleCont] = useState(true);
  const [isCourse, setCourse] = useState<any>(null);
  const [isVisibleCourse, setIsVisibleCourse] = useState(false);
  const [isVisibleModules, setIsVisibleModules] = useState(false);
  const [activeLocation, setActiveLocation] = useState(1);
  const [activeCurLocation, setActiveCurLocation] = useState([]);
  const [activeDirModules, setActiveDirModules] = useState([]);
  const [ModuleMentors, setModuleMentors] = useState<any>([]);
  // const [CourseModule, setCourseModule] = useState<any>(null);
  const [locations, setLocations] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    dispatch(startFetchingCourses());
  }, []);

  useEffect(() => {
    const activeLocationId = activeLocation.toString();
    const filteredDirections = directions.filter((direction) => {
      const locationIds = direction.locations;
      return locationIds.includes(activeLocationId);
    });

    filteredDirectionsRef.current = filteredDirections;
    setActiveCurLocation(filteredDirectionsRef.current);

    // Client-side window usage safety check
    if (typeof window !== "undefined") {
      setTimeout(function () {
        if (filteredDirectionsRef.current.length > 0) {
          if (window.innerWidth <= 768) {
            window.scrollTo(0, 600);
          } else {
            window.scrollTo(0, 350);
          }
        }
      }, 2);
    }
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
    if (Number(activeModule?.id ?? 0) > 0) {
      ApiService.apiCall(EndPoints.GET_ADDITIONAL, activeModule?.id)
        .then((res: any) => {
          setAdditinalInfo(res?.data?.data);
        })
        .catch((err: any) => {
          // handle error
        });

      ApiService.apiCall(EndPoints.GET_MODULEMENTORS, activeModule?.id).then(
        (res: any) => {
          setModuleMentors(res?.data?.data);
        },
      );

      ApiService.apiCall(EndPoints.GET_MODULE, activeModule?.id).then(
        (res: any) => {
          // ...
        },
      );
    }
  }, [activeModule]);

  useEffect(() => {
    ApiService.apiCall(EndPoints.GET_LOCATIONS).then((res: any) => {
      setLocations(res?.data?.data);
    });
    dispatch(startFetchingDirections());
  }, []);

  const activeCourseChanged = (course: CourseModel) => {
    if (!started) {
      setStarted(true);
    }
    dispatch(coursesAction.activeCourseChanged({ course }));
  };

  const showDirections = (location_id: any) => {
    setActiveLocation(location_id);
    setIsVisible(true);
    hideCourse();
    hideModules();
  };

  const navigateToCourseHandler = (id: string, course: any) => {
    dispatch(coursesAction.activeCourseChanged({ course }));
    router.push(`/${lang}/courses/${id}?scroll=1`);
    setCourse(course);
  };

  const activeModuleChanged = (module: DirectionModel) => {
    if (!started) {
      setStarted(true);
    }
    setIsVisibleCont(true);
    dispatch(coursesAction.activeModuleChanged({ module }));

    if (typeof window !== "undefined") {
      setTimeout(function () {
        var elem = document.getElementById("COURSEDIV");
        if (elem) {
          var elementPosition =
            elem.getBoundingClientRect().top + window.scrollY;
          var offset = -50;
          var scrollPosition = elementPosition + offset;
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        }
      }, 2);
    }
    showCourse();
  };

  const activeDirectionChanged = (direction: DirectionModel) => {
    if (!started) {
      setStarted(true);
    }
    dispatch(coursesAction.activeDirectionChanged({ direction }));

    if (typeof window !== "undefined") {
      setTimeout(function () {
        var elem = document.getElementById("MODULEDIV");
        if (elem) {
          var elementPosition =
            elem.getBoundingClientRect().top + window.scrollY;
          var offset = -50;
          var scrollPosition = elementPosition + offset;
          if (window.innerWidth > 768) {
            offset = -100;
            scrollPosition = elementPosition + offset;
          }
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        }
      }, 2);
    }
    showModules();
  };

  let k = 0;

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const toggleVisibility2 = () => {
    if (typeof window !== "undefined") {
      setTimeout(function () {
        var elem = document.getElementById("ADDITDIV");
        if (elem) {
          var elementPosition =
            elem.getBoundingClientRect().top + window.scrollY;
          var offset = -100;
          var scrollPosition = elementPosition + offset;
          window.scrollTo({ top: scrollPosition, behavior: "smooth" });
        }
      }, 2);
    }
    setIsVisible2(true);
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

  const displayedMentors =
    activeLocation === 3
      ? ModuleMentors.filter((m: any) =>
          [
            "https://api.reschool.world/storage/tik.PNG",
            "https://api.reschool.world/storage/t.jpg",
          ].includes(`${img_route}${m?.photo}`),
        )
      : activeLocation === 2
        ? ModuleMentors.filter((m: any) =>
            ["https://api.reschool.world/storage/mir.jpg"].includes(
              `${img_route}${m?.photo}`,
            ),
          )
        : ModuleMentors;

  const handleSlideChange = (swiper: any) => {
    const currentSlide = swiper.realIndex;
    const currentMentor = displayedMentors[currentSlide];
    if (lang === "ka") {
      setCurrentName(currentMentor?.name_ka || "");
    } else {
      setCurrentName(currentMentor?.name_en || "");
    }
  };
  return (
    <div
      className="wrapper circle-bg LIGHTS"
      style={{ background: "#111215", paddingTop: "100px" }}
    >
      <section
        className={"serv-arch"}
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
                        key={location.id}
                        className="col-4 CP LOCATION add-hover"
                        onClick={() => showDirections(location.id)}
                        style={{
                          textAlign: "center",
                          color: "#FFF",
                          cursor: "pointer",
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
                    return "";
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {isVisible && (
        <section className={"serv-arch "} style={{ borderRadius: "20px" }}>
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
                      key={crs.id}
                      directionClicked={activeDirectionChanged}
                      direction={crs}
                      index={k}
                    />
                  );
                } else {
                  return "";
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
                        key={crs.id}
                        moduleClicked={activeModuleChanged}
                        module={crs}
                        index={k}
                      />
                    );
                  } else {
                    return "";
                  }
                })}
              </div>
            )}
          </div>
        </section>
      )}
      <section></section>
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
                    background: "#dddddd1a",
                    borderRadius: "30px",
                  }}
                  className="mySwiper"
                  preventClicks={false}
                  allowTouchMove={true}
                  draggable={true}
                  spaceBetween={20}
                  onInit={handleSlideChange}
                  onSlideChange={handleSlideChange}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  loop={true}
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
                  {(activeLocation === 3
                    ? ModuleMentors.filter((m: any) =>
                        [
                          "https://api.reschool.world/storage/tik.PNG",
                          "https://api.reschool.world/storage/t.jpg",
                        ].includes(`${img_route}${m?.photo}`),
                      )
                    : activeLocation === 2
                      ? ModuleMentors.filter((m: any) =>
                          [
                            "https://api.reschool.world/storage/mir.jpg",
                          ].includes(`${img_route}${m?.photo}`),
                        )
                      : ModuleMentors
                  )?.map((slider: any, i: number) => (
                    <SwiperSlide key={i}>
                      <ResponsiveImage
                        style={{ borderRadius: "10px" }}
                        link={`${img_route}${slider?.photo}`}
                        name="mentor"
                        width={500}
                        height={500}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="col-12 col-sm-7">
                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "25px",
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    fontFeatureSettings: "'case' on",
                    display: "inline-block",
                  }}
                >
                  {lang === "ka" ? (
                    <>{activeModule?.name_ka}</>
                  ) : (
                    <>{activeModule?.name_en.toUpperCase()}</>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    fontFeatureSettings: "'case' on",
                  }}
                >
                  {currentName}
                  <div
                    onClick={() => toggleVisibility2()}
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: activeModule?.text_ka ?? "",
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: activeModule?.text_en ?? "",
                      }}
                    />
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
      {isVisible && isVisibleCourse && (
        <section>
          <div
            className="container my-4 py-0"
            style={{
              color: "#FFF",
              background: "rgb(12 12 12)",
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
                borderRadius: "30px",
              }}
            >
              {activeModule?.courses?.map((crs: any, i) => {
                if (crs && crs.showHide === "1") {
                  k = k + 1;
                  return (
                    <CourseCard
                      key={crs.id}
                      custom={isCourse}
                      courseClicked={() => navigateToCourseHandler(crs.id, crs)}
                      course={crs}
                      index={k}
                    />
                  );
                } else {
                  return "";
                }
              })}
            </div>
          </div>
        </section>
      )}
      {isVisible2 && (
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
            {AdditinalInfo?.map((module: any) => (
              <div
                style={{
                  background: "#222",
                  padding: "30px 30px",
                  marginBottom: "8px",
                  borderRadius: "10px",
                  color: "#FFF",
                }}
                key={module.id}
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
                      <ResponsiveImage
                        style={{ width: "30px", float: "right" }}
                        link={arrowup}
                        name="Collapse"
                      />
                    ) : (
                      <ResponsiveImage
                        style={{ width: "30px", float: "right" }}
                        link={arrowdown}
                        name="Expand"
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
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CoursesContainer;
