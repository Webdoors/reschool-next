import React, { useState } from "react";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/reducer";
import CourseCardHome from "../../components/course/course-home";
import DirectionCardHome from "../../components/course/direction-home";
import MentorCard from "../../components/course/mentord-card";
import { useDispatch } from "react-redux";
// import { Link } from 'react-router-dom'; // Removed redundant link
import { coursesAction } from "../../store/courses/courses.slice";
import { User } from "../../models/userModel";
import { CourseModel } from "../../models/courseModel";
import { DirectionModel } from "../../models/directionModel";
import { startFetchingGroupsForCourse } from "../../store/courses/courses-effects";
import ShowIf from "../../utils/showIf";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import img1 from "../../img/swiper/1.jpeg";
import img2 from "../../img/swiper/2.jpeg";
import img3 from "../../img/swiper/3.jpg";
import img4 from "../../img/swiper/IMG_4507_2.png";
import img5 from "../../img/swiper/IMG_4637_2.png";
import img6 from "../../img/swiper/IMG_4643_2.png";
import img7 from "../../img/swiper/IMG_4534_2.png";
import img8 from "../../img/swiper/IMG_4581_2.png";
import img9 from "../../img/swiper/IMG_4623_2.png";
import img10 from "../../img/swiper/IMG_4659_2.png";
import img11 from "../../img/swiper/IMG_4718_2.png";
import img12 from "../../img/swiper/IMG_4744_2.png";
import img13 from "../../img/swiper/IMG_5610_2.png";
import img14 from "../../img/swiper/IMG_5633_2.png";
import img15 from "../../img/swiper/IMG_5642_2.png";
import img16 from "../../img/swiper/IMG_5648_2.png";
import img17 from "../../img/swiper/IMG_4744_2.png";
import rect4 from "../../img/rectangle4.png";
import balls from "../../img/balls.svg";
import bonus1 from "../../img/bonus1.png";
import bonus2 from "../../img/bonus2.png";
import bonus3 from "../../img/bonus3.png";
import bonus4 from "../../img/bonus4.png";
import bonus5 from "../../img/bonus5.png";
import bonus6 from "../../img/bonus6.png";
import bonusb from "../../img/bonusb.png";
import courseb from "../../img/courseb.png";
import testcard from "../../img/testcard.png";
import leptop from "../../img/leptop.png";
import moduleback from "../../img/modules.png";
import ModuleCard from "../../components/course/module-card";
import ResponsiveImage from "../../ui/image/image";
import { img_route } from "../../api/endPoints";
import DirectionCard from "../../components/course/direction-card";
import { ApiService } from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import { useTranslation } from "react-i18next";

export const HomeContainer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const router = useRouter();
  const courses = useSelector((state: RootState) => state.coursesState.courses);
  const directions = useSelector(
    (state: RootState) => state.coursesState.directions,
  );
  const mentors = useSelector((state: RootState) => state.coursesState.mentors);
  const loggedIn = useSelector((state: RootState) => state.auth.LoggedIn);
  const dispatch: AppDispatch = useDispatch();
  const [TestimonialInfo, setTestimonialInfo] = useState<any>(null);
  const [isCourse, setCourse] = useState<any>(null);
  const query = useSearchParams();
  const [aboutInfo, setAboutInfo] = useState<any>(null);
  const mergedModules: any = {};

  directions.forEach((direction) => {
    direction.modules.forEach((module: any) => {
      let moduleName = module?.name_ka;

      if (!mergedModules[moduleName]) {
        mergedModules[moduleName] = Object.assign({}, module, {
          directionName_ka: direction?.name_ka,
        });
      }
    });
  });

  const modulesall = Object.values(mergedModules);

  useEffect(() => {
    const trId = query.get("payment_transaction_id");
    const groupId = query.get("groupId");
    const fail = query.get("fail");

    if (trId && groupId) {
      localStorage.setItem("groupId", JSON.stringify(groupId));

      router.push(`/${lang}/profile/${groupId}`);
    }
    if (fail) {
      router.push(`/${lang}/fail`);
    }
  });
  useEffect(() => {
    markActiveCourse();
  }, [courses]);
  useEffect(() => {
    // Fetch certificate information
    ApiService.apiCall(EndPoints.GET_NEWSHOME)
      .then((res: any) => {
        // console.log("resHome", res);
        setAboutInfo(res?.data?.data?.data || res?.data?.data || res?.data);
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
      });
  }, []);

  useEffect(() => {
    ApiService.apiCall(EndPoints.GET_TESTIMONIAL)
      .then((res: any) => {
        setTestimonialInfo(res?.data?.data); // Assuming this is an array
      })
      .catch((err: any) => {
        if (history) {
          // history.push('/notfound');
        }
      });
  }, []);

  const directionClicked = (direction: DirectionModel) => {
    dispatch(coursesAction.activeDirectionChanged({ direction }));
    router.push(`/${lang}/modules/`);
  };
  const courseClicked = (course: CourseModel) => {
    dispatch(coursesAction.activeCourseChanged({ course }));
    dispatch(startFetchingGroupsForCourse(course._id));
    router.push(`/${lang}/courses/`);
  };

  const mentrorClickedHandler = (mentor: User) => {
    dispatch(coursesAction.mentorPageActivated(mentor));
    router.push(`/${lang}/mentor/${mentor._id}`);
  };
  const handleCourseClick = (module: any): any => {
    //console.log("modu",module)
    if (module?.id === 2) {
      window.location.href = `/${lang}/courses/1`;
    } else if (module?.id === 5) {
      window.location.href = `/${lang}/courses/56`;
    } else if (module?.id === 3) {
      window.location.href = `/${lang}/courses/50`;
    } else if (module?.id === 6) {
      window.location.href = `/${lang}/courses/60`;
    } else if (module?.id === 7) {
      window.location.href = `/${lang}/courses/63`;
    } else {
      router.push(`/${lang}/courses`);
    }
  };
  const markActiveCourse = () => {
    const courses = document.querySelectorAll(".courses-s");

    courses.forEach((el: any) => {
      el.addEventListener("mouseenter", (e: any) => {
        courses.forEach((e: any) => {
          if (e.classList.contains("active")) {
            e.classList.remove("active");
          }
        });
        if (!el.classList.contains("active")) {
          el.classList.add("active");
        }
      });
      el.addEventListener("mouseleave", (e: any) => {
        let count = 0;
        document.querySelectorAll(".courses-s").forEach((e: any) => {
          if (e.classList.contains("active")) {
            count++;
          }
        });

        if (el.classList.contains("active") && count !== 1) {
          el.classList.remove("active");
        }
      });
    });
  };
  const imageStyle = {
    margin: "auto",
    width: "110px",
    // Add more styles if needed
  };

  const sanitizeUrl = (url: string) => {
    if (!url || url.includes("undefined") || url.includes("null")) {
      return "";
    }
    // Standardize to double-slash format for this specific domain as requested
    let cleaned = url;
    if (
      cleaned.includes("api.reschool.world") &&
      !cleaned.includes("api.reschool.world//")
    ) {
      cleaned = cleaned.replace("api.reschool.world/", "api.reschool.world//");
    }
    // Handle duplicated storage segments
    cleaned = cleaned.replace(/\/+storage\/+storage\//g, "/storage/");

    // Handle doubled absolute URLs (occurs when base is prepended to an already absolute URL)
    if (cleaned.includes("http") && cleaned.lastIndexOf("http") > 0) {
      cleaned = cleaned.substring(cleaned.lastIndexOf("http"));
    }
    return cleaned;
  };

  // Initialize state for the single input field
  const [inputValue, setInputValue] = useState<string>("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Redirect to /#/cert/{inputValue}
    router.push(`/${lang}/cert/${inputValue}`);
  };

  return (
    <div>
      <div className="main-content">
        <section className=" section-padding" style={{ paddingBottom: "0px" }}>
          <div className="container">
            <div
              className="wow H3 animated bottom-cl-stars text-white"
              style={{ visibility: "visible", position: "relative" }}
            >
              <div className="">
                <span style={{ marginBottom: "20px" }}>
                  <ResponsiveImage
                    link={balls}
                    name="balls decoration"
                    style={{ width: "40px" }}
                  />
                </span>
              </div>
              <div className="">
                <span style={{ borderBottom: "solid 1px #aa528b" }}>
                  {t("our news")}
                </span>
              </div>
              <div
                className="d-none"
                style={{
                  fontFamily: "Helvetica_Neue_LT_GEO_55",
                  fontSize: "16px",
                  marginTop: "10px",
                  lineHeight: "27px",
                  fontWeight: "lighter",
                }}
              >
                გაეცანით ყველა ამჟამინდელ მიმართულებას, რომლის <br />
                სწავლებასაც ჩვენ ვანხორციელებთ.
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className={"col-12"}>
                <div className={"row"}>
                  {aboutInfo?.news?.map((req: any, i: number) => {
                    return (
                      <a
                        key={i}
                        href={`/${lang}/article/${lang === "ka" ? req.slug_ka : req.slug_en}`}
                        className={"col-12 col-sm-4 mb-3"}
                      >
                        <div className={"row"}>
                          <div className={"col-12"}>
                            {lang === "ka" ? (
                              <div
                                className="cont text-center row "
                                style={{
                                  backgroundImage: `url(${sanitizeUrl(`${img_route}${req?.photo_ka}`)})`,
                                  height: "300px",
                                  backgroundSize: "cover",
                                  borderRadius: "16px",
                                  marginBottom: "20px",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  margin: "auto",
                                }}
                              ></div>
                            ) : (
                              <div
                                className="cont text-center row"
                                style={{
                                  backgroundImage: `url(${sanitizeUrl(`${img_route}${req?.photo_en}`)})`,
                                  height: "300px",
                                  backgroundSize: "cover",
                                  borderRadius: "16px",
                                  marginBottom: "20px",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  margin: "auto",
                                }}
                              ></div>
                            )}
                          </div>
                          <div
                            style={{ color: "#40A6F2" }}
                            className={"col-12"}
                          >
                            {lang === "ka" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: req?.category_ka,
                                }}
                              />
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: req?.category_en,
                                }}
                              />
                            )}
                          </div>
                          <div
                            style={{
                              fontWeight: "bold",
                              color: "#fff",
                              margin: "10px 0px 5px 0px ",
                              height: "50px",
                            }}
                            className={"col-12"}
                          >
                            {lang === "ka" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: req?.title_ka,
                                }}
                              />
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: req?.title_en,
                                }}
                              />
                            )}
                          </div>
                          {/*<div style={{color: "#B1B1B1", margin: "0px 0px 5px 0px", minHeight: "30px"}}*/}
                          {/*     className={"col-12"}>*/}
                          {/*  {lang === 'ka' ? (*/}
                          {/*      <div dangerouslySetInnerHTML={{__html: req?.text_ka?.replace(/<[^>]*>?/gm, '').slice(0, 150)}}/>*/}
                          {/*  ) : (*/}
                          {/*      <div dangerouslySetInnerHTML={{__html: req?.text_en?.replace(/<[^>]*>?/gm, '').slice(0, 150)}}/>*/}
                          {/*  )}*/}
                          {/*</div>*/}
                          <div
                            style={{ color: "#B1B1B1" }}
                            className={"col-12"}
                          >
                            <small>
                              {lang === "ka" ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: req?.date,
                                  }}
                                />
                              ) : (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: req?.date,
                                  }}
                                />
                              )}
                            </small>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-12 text-center">
              <Link
                href={`/${lang}/news`}
                className="butn bord curve mt-30 hover-color border-new"
                style={{
                  width: "170px",
                  fontSize: "18px",
                  padding: "12px 3px",
                  textAlign: "center",
                  borderRadius: "39px!important",
                }}
              >
                {t("see all")}
              </Link>
            </div>
          </div>
        </section>
        {/* ==================== ჩვენი მენტორები==================== */}
        <section className=" section-padding">
          <div className="container">
            <div
              className="wow H3 animated bottom-cl-stars text-white"
              style={{ visibility: "visible", position: "relative" }}
            >
              <div className="">
                <span style={{ marginBottom: "20px" }}>
                  <ResponsiveImage
                    link={balls}
                    name="balls decoration"
                    style={{ width: "40px" }}
                  />
                </span>
              </div>
              <h2 className="text-white">
                <span style={{ borderBottom: "solid 1px #aa528b" }}>
                  {t("our courses")}
                </span>
              </h2>
              <div
                className="d-none"
                style={{
                  fontFamily: "Helvetica_Neue_LT_GEO_55",
                  fontSize: "16px",
                  marginTop: "10px",
                  lineHeight: "27px",
                  fontWeight: "lighter",
                }}
              >
                გაეცანით ყველა ამჟამინდელ მიმართულებას, რომლის <br />
                სწავლებასაც ჩვენ ვანხორციელებთ.
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {modulesall?.map((module: any, i) => {
                const getCourseHref = (m: any) => {
                  if (m?.id === 2) return `/${lang}/courses/1`;
                  if (m?.id === 5) return `/${lang}/courses/56`;
                  if (m?.id === 3) return `/${lang}/courses/50`;
                  if (m?.id === 6) return `/${lang}/courses/60`;
                  if (m?.id === 7) return `/${lang}/courses/63`;
                  return `/${lang}/courses`;
                };
                return (
                  <Link
                    key={i}
                    href={getCourseHref(module)}
                    className="col-md-4 col-lg-4 p-4 text-white CP d-grid"
                    style={{ textDecoration: "none" }}
                  >
                    <ResponsiveImage
                      link={moduleback}
                      name="imagemoduleback"
                      width={320}
                      height={339}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "20px",
                      }}
                    />
                    <div
                      className="COURSELIST"
                      style={{
                        marginTop: "-76%",
                        height: "339px",
                        fontFamily: "Helvetica_Neue_LT_GEO_55",
                        fontFeatureSettings: "'case' on",
                      }}
                    >
                      <div className="text-end">
                        <span
                          style={{
                            borderRadius: "10px",
                            background: "#131415",
                            margin: "14px",
                            padding: "2px 7px",
                          }}
                        >
                          {module.directionName}
                        </span>
                      </div>
                      <div className="d-flex" style={{}}>
                        <ResponsiveImage
                          link={`${img_route}${module?.photo}`}
                          name={module?.name || "default.jpg"}
                          width={110}
                          height={110}
                          unoptimized
                          style={{
                            margin: "auto",
                            width: "110px",
                            height: "110px",
                          }}
                        />
                      </div>
                      <div
                        className="text-center"
                        style={{
                          fontWeight: "light",
                          fontSize: "21px",
                          marginTop: "27px",
                        }}
                      >
                        {lang === "ka" ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: module.name_ka }}
                          />
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{ __html: module.name_en }}
                          />
                        )}
                      </div>
                      <div
                        className="text-center"
                        style={{
                          fontWeight: "light",
                          color: "#777",
                          fontFamily: "Helvetica_Neue_LT_GEO_55",
                        }}
                      >
                        {lang === "ka" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: module.description_ka,
                            }}
                          />
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: module.description_en,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="col-md-12 col-lg-12 p-4 mt-4 mb-3 text-center">
                <Link
                  href={`/${lang}/courses`}
                  className="butn bord curve mt-30 hover-color border-new"
                  style={{
                    width: "170px",
                    fontSize: "18px",
                    padding: "12px 3px",
                    textAlign: "center",
                    margin: "3px",
                    borderRadius: "39px!important",
                  }}
                >
                  {t("our courses")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ჩვენი მენტორები==================== */}
        <section className="team section-padding">
          <div className="container">
            <div
              className="wow H3 animated bottom-cl-stars text-white"
              style={{ visibility: "visible", position: "relative" }}
            >
              <div className="">
                <span style={{ marginBottom: "20px" }}>
                  <ResponsiveImage
                    link={balls}
                    name="balls decoration"
                    style={{ width: "40px" }}
                  />
                </span>
              </div>
              <div className="">
                <span style={{ borderBottom: "solid 1px #aa528b" }}>
                  {t("who is teaching")}
                </span>
              </div>
              <div
                className="d-none"
                style={{
                  fontFamily: "Helvetica_Neue_LT_GEO_55",
                  fontSize: "16px",
                  marginTop: "10px",
                  lineHeight: "27px",
                  fontWeight: "lighter",
                }}
              >
                გაეცანით ყველა ამჟამინდელი მიმართულების მენტორს, <br />
                რომელებიც თქვენს სწავლაზე არიან პასუხისმგებელნი
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row" style={{ justifyContent: "center" }}>
              {mentors?.length
                ? mentors.map((mentor, i) => {
                    // console.log("m",mentor.lastName)
                    if (mentor && mentor.top === 1 && mentor.photo != "") {
                      return (
                        <MentorCard
                          index={i}
                          key={mentor._id}
                          user={mentor}
                          mentorClicked={mentrorClickedHandler}
                        />
                      );
                    }
                  })
                : ""}
            </div>
          </div>
        </section>
        {/* ==================== ჩვენი მენტორები==================== */}
        <section className=" section-padding">
          <div className="container">
            <div
              className="wow H3 animated bottom-cl-stars text-white"
              style={{ visibility: "visible", position: "relative" }}
            >
              <div className="">
                <span style={{ marginBottom: "20px" }}>
                  <ResponsiveImage
                    link={balls}
                    name="balls decoration"
                    style={{ width: "40px" }}
                  />
                </span>
              </div>
              <div className="">
                <span style={{ borderBottom: "solid 1px #aa528b" }}>
                  {t("bonus modules")}
                </span>
              </div>
              <div
                className="d-none"
                style={{
                  fontFamily: "Helvetica_Neue_LT_GEO_55",
                  fontSize: "16px",
                  marginTop: "10px",
                  lineHeight: "27px",
                  fontWeight: "lighter",
                }}
              >
                გაეცანით ყველა ამჟამინდელ ბონუს მოდულს, რომლის სწავლებასაც{" "}
                <br />
                ძირითადი მიმართულების პარარელურად ვანხორციელებთ.
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 p-4 mb-3">
                <ResponsiveImage link={bonus1} name="bonus1" priority />
                <div
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    padding: "0px 60px",
                    fontFeatureSettings: "'case' on",
                    fontSize: "32px",
                    textAlign: "center",
                    marginTop: "-197px",
                    lineHeight: "37px",
                    fontWeight: "400",
                  }}
                >
                  {t("emotional inteligence")}
                </div>
              </div>
              <div
                style={{ height: "360px" }}
                className="col-md-4 col-lg-4 p-4 mb-3"
              >
                <ResponsiveImage link={bonus2} name="bonus2" />
                <div
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    padding: "0px 60px",
                    fontFeatureSettings: "'case' on",
                    fontSize: "32px",
                    textAlign: "center",
                    transform: "translateY(-195px)",
                    lineHeight: "37px",
                    fontWeight: "400",
                  }}
                >
                  {t("life planning")}
                </div>
              </div>
              <div
                style={{ height: "360px" }}
                className="col-md-4 col-lg-4 p-4 mb-3"
              >
                <ResponsiveImage link={bonus3} name="bonus3" />
                <div
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    padding: "0px 60px",
                    fontFeatureSettings: "'case' on",
                    fontSize: "32px",
                    textAlign: "center",
                    transform: "translateY(-195px)",
                    lineHeight: "37px",
                    fontWeight: "400",
                  }}
                >
                  {t("cyber security")}
                </div>
              </div>
              <div
                style={{ height: "360px" }}
                className="col-md-4 col-lg-4 p-4 mb-3"
              >
                <ResponsiveImage link={bonus4} name="bonus4" />
                <div
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    padding: "0px 60px",
                    fontFeatureSettings: "'case' on",
                    fontSize: "32px",
                    textAlign: "center",
                    transform: "translateY(-195px)",
                    lineHeight: "37px",
                    fontWeight: "400",
                  }}
                >
                  {t("artificial inteligence")}
                </div>
              </div>
              <div
                style={{ height: "360px" }}
                className="col-md-4 col-lg-4 p-4 mb-3"
              >
                <ResponsiveImage link={bonus5} name="bonus5" />
                <div
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    padding: "0px 60px",
                    fontFeatureSettings: "'case' on",
                    fontSize: "32px",
                    textAlign: "center",
                    transform: "translateY(-195px)",
                    lineHeight: "37px",
                    fontWeight: "400",
                  }}
                >
                  {t("attract investments")}
                </div>
              </div>
              <div
                style={{ height: "360px" }}
                className="col-md-4 col-lg-4 p-4 mb-3"
              >
                <ResponsiveImage link={bonus6} name="bonus6" />
                <div
                  style={{
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    padding: "0px 60px",
                    fontFeatureSettings: "'case' on",
                    fontSize: "32px",
                    textAlign: "center",
                    transform: "translateY(-195px)",
                    lineHeight: "37px",
                    fontWeight: "400",
                  }}
                >
                  {t("The way to earn money with technology")}
                </div>
              </div>
              <div className="col-md-12 col-lg-12 p-4 mb-0 mt-4 text-center">
                <Link
                  href={`/${lang}/courses/48?bonus=1`}
                  className="butn bord curve mt-30 hover-color border-new"
                  style={{
                    width: "170px",
                    fontSize: "18px",
                    padding: "12px 3px",
                    textAlign: "center",
                    margin: "3px",
                    borderColor: "#ccc",
                    background: "#232C41",
                    borderRadius: "39px!important",
                  }}
                >
                  {t("learn more")}
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* ==================== ჩვენი მენტორები==================== */}
        <section className=" section-padding">
          <div className="container">
            <div
              className="wow H3 animated bottom-cl-stars text-white"
              style={{ visibility: "visible", position: "relative" }}
            >
              <div className="">
                <span style={{ marginBottom: "20px" }}>
                  <ResponsiveImage
                    link={balls}
                    name="balls decoration"
                    style={{ width: "40px" }}
                  />
                </span>
              </div>
              <div className="">
                <span style={{ borderBottom: "solid 1px #aa528b" }}>
                  {t("photogallery")}
                </span>
              </div>
              <div
                className="d-none"
                style={{
                  fontFamily: "Helvetica_Neue_LT_GEO_55",
                  fontSize: "16px",
                  marginTop: "10px",
                  lineHeight: "27px",
                  fontWeight: "lighter",
                }}
              >
                გაეცანით Re:school ის გალერეას , სადაც წარმოდგენილია ჩვენი{" "}
                <br />
                სამუშაო სივრცის და მოსწავლეების სურათები.
              </div>
            </div>
          </div>
          <div className="container-fluid">
            {/*<div className="LINEBO"></div>*/}
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
              preventClicks={false}
              allowTouchMove={true}
              draggable={true}
              spaceBetween={20}
              autoplay={{ delay: 3000 }}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },

                670: {
                  slidesPerView: 2,
                },

                1050: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },

                1400: {
                  slidesPerView: 4,
                },
              }}
            >
              {[
                img1,
                img2,
                img3,
                img4,
                img5,
                img6,
                img7,
                img8,
                img9,
                img10,
                img11,
                img12,
                img13,
                img14,
                img15,
                img16,
                img17,
              ].map((img, idx) => (
                <SwiperSlide key={idx}>
                  <ResponsiveImage
                    style={{ borderRadius: "10px" }}
                    name={`gallery-${idx}`}
                    link={img}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/*<div className="LINEBO"></div>*/}
          </div>
        </section>
        {/* ==================== ჩვენი მენტორები==================== */}
        <section className=" section-padding">
          <div className="container">
            <div
              className="wow H3 animated bottom-cl-stars text-white"
              style={{ visibility: "visible", position: "relative" }}
            >
              <div className="">
                <span style={{ marginBottom: "20px" }}>
                  <ResponsiveImage
                    link={balls}
                    name="balls decoration"
                    style={{ width: "40px" }}
                  />
                </span>
              </div>
              <div className="">
                <span style={{ borderBottom: "solid 1px #ddd" }}>
                  {t("whatdotheysay")}
                </span>
              </div>
              <div
                className="d-none"
                style={{
                  fontFamily: "Helvetica_Neue_LT_GEO",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
              >
                გაეცანით Re:school ის შეფასებებს, სადაც გაიგებთ თუ როგორ <br />
                აფასებენ მათ მიერ განვლილ გზას ჩვენს სკოლაში.
              </div>
            </div>
          </div>
          <div className="container">
            {/*<div className="LINEBO"></div>*/}
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
              preventClicks={false}
              allowTouchMove={true}
              draggable={true}
              spaceBetween={20}
              autoplay={{ delay: 3000 }}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },

                670: {
                  slidesPerView: 2,
                },

                1050: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },

                1400: {
                  slidesPerView: 3,
                },
              }}
            >
              {TestimonialInfo?.map((testimonial: any, i: number) => {
                return (
                  <SwiperSlide key={i}>
                    <ResponsiveImage
                      style={{ borderRadius: "10px" }}
                      link={testcard}
                      name="testimonial card"
                    />
                    <div
                      style={{
                        marginTop: "-265px",
                        marginBottom: "80px",
                        color: "white",
                        padding: "0px 50px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Helvetica_Neue_LT_GEO_55",
                          height: "145px",
                          fontSize: "20px",
                        }}
                      >
                        {lang === "ka" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: testimonial?.text_ka,
                            }}
                          />
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: testimonial?.text_en,
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          verticalAlign: "top",
                          display: "inline-block",
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <ResponsiveImage
                          style={{ borderRadius: "50%" }}
                          width={60}
                          height={60}
                          link={`${img_route}${testimonial?.photo}`}
                          name="mentor"
                        />
                      </div>
                      <div
                        style={{
                          fontFamily: "Helvetica_Neue_LT_GEO_55",
                          fontFeatureSettings: "'case' on",
                          paddingLeft: "20px",
                          paddingTop: "5px",
                          width: "70px",
                          display: "inline-block",
                          verticalAlign: "top",
                        }}
                      >
                        {lang === "ka" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: testimonial?.name_ka,
                            }}
                          />
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: testimonial?.name_en,
                            }}
                          />
                        )}
                        <div
                          style={{
                            background:
                              "-webkit-linear-gradient(45deg, #12c2e9, #c471ed, #F64F59)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {testimonial?.course}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/*<div className="LINEBO"></div>*/}
          </div>
        </section>
        <section
          className="call-action section-padding bg-img"
          data-background="../../img/patrn.svg"
          style={{
            backgroundImage: 'url("../../img/patrn.svg")',
            paddingTop: "50px",
          }}
        >
          <div className="container MSDIV">
            <div className="row">
              <div
                className="col-md-6 col-lg-6 "
                style={{ textAlign: "center" }}
              >
                <ResponsiveImage link={leptop} name="laptop" />
              </div>
              <div
                className="col-md-6 col-lg-6 valign m-auto justify-content-center"
                style={{ textAlign: "center" }}
              >
                <form className="contact" onSubmit={handleSubmit}>
                  <div className="form mb-3" style={{ textAlign: "left" }}>
                    <label
                      htmlFor="singleInput LABEL1"
                      style={{
                        textAlign: "left",
                        display: "block",
                        fontFamily: "Helvetica_Neue_LT_GEO_75",
                        fontFeatureSettings: "'case' on",
                        fontSize: "37px",
                      }}
                    >
                      {t("checkcert")}
                    </label>
                    <div
                      style={{
                        display: "block",
                        textAlign: "left",
                        marginBottom: "20px",
                        fontFamily: "Helvetica_Neue_LT_GEO",
                        fontWeight: "lighter",
                        lineHeight: "30px",
                      }}
                    >
                      {t("certtext")}
                    </div>
                    <div className="col">
                      <div className="row">
                        <div className="col-12 col-sm-4 mb-3">
                          <input
                            style={{
                              fontWeight: "lighter",
                              fontFamily: "Helvetica_Neue_LT_GEO_75",
                              fontFeatureSettings: "'case' on",
                              fontSize: "14px",
                              width: "184px",
                              borderRadius: "5px",
                              border: "solid 1px #444",
                              display: "inline-block",
                            }}
                            className="text-center w-100"
                            type="text"
                            id="singleInput"
                            name="singleInput"
                            placeholder={t("certcode")}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-12 col-sm-3">
                          <button
                            style={{
                              fontWeight: "700",
                              width: "164px",
                              fontFeatureSettings: "'case' on",
                              display: "inline-block",
                              fontFamily: "Helvetica_Neue_LT_GEO_75",
                            }}
                            className="butn bord curve wow fadeInUp w-100 hover-color"
                            type="submit"
                          >
                            {t("check")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeContainer;
