"use client";

// import image from '../../img/hero.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./mentor.css";
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/reducer";

import ResponsiveImage from "../../ui/image/image";
import { img_route } from "../../api/endPoints";
// import GroupCard from '../../components/course/group-card'
// import EmptyState from '../../ui/empty-state'
import { useRouter, useParams } from "next/navigation";
import ShowIf from "../../utils/showIf";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMentorData } from "../../store/courses/courses-effects";
import { useTranslation } from "react-i18next";

const MentorContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const params = useParams(); // Next.js useParams: returns { lang: string, id: string, ... }
  const router = useRouter(); // Next.js useRouter

  const dispatch = useDispatch<AppDispatch>();

  const mentorDataFromStore = useSelector(
    (state: RootState) => state.coursesState.mentorProfile,
  );

  const allMentors = useSelector(
    (state: RootState) => state.coursesState.mentors,
  );

  const mentorData =
    mentorDataFromStore ||
    allMentors.find((m) => String(m?._id) === String(params?.id));

  // const navigateToCourseHandler =(id: string)=>{
  // router.push(`/${lang}/courses/${id}`)
  // }

  useEffect(() => {
    if (params?.id) {
      // fetchMentorData expects (id, history). Passing router as history substitute if needed,
      // though logically it might behave differently or be ignored if commented out.
      dispatch(fetchMentorData(params.id as string, router));
    }
  }, [params, dispatch, router]);

  return (
    <div>
      {" "}
      <header
        className="freelancre valign "
        style={{ paddingTop: "150px", minHeight: "70vh" }}
      >
        <div className="container">
          <div className="row" style={{ marginBottom: "100px" }}>
            <div className="col-lg-4">
              <div className="img mn-mob">
                {mentorData?.photo && (
                  <ResponsiveImage
                    link={`${img_route}${mentorData?.photo}`}
                    name={mentorData?.name_ka || "default.jpg"}
                    width={400}
                    height={400}
                  />
                )}
              </div>
            </div>
            <div className="col-lg-8 valign">
              <div className="cont">
                <h1
                  className="cd-headline clip text-white "
                  style={{ fontSize: "20px" }}
                >
                  {lang === "ka" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          mentorData?.about_ka || "ჩემს შესახებ დასამატებელია",
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          mentorData?.about_en || "ჩემს შესახებ დასამატებელია",
                      }}
                    />
                  )}
                  <span className="cd-words-wrapper">
                    {/* <b className="is-visible color-font fw-600">Mobile Apps</b>
                <b className="color-font fw-600">Landing Pages</b>
                <b className="color-font fw-600">Awesome Design</b> */}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="states">
            <div className="container">
              <ul className="flex">
                {/* <li className="flex">
              <div className="numb valign">
                <h3 className="text-white" >12</h3>
              </div>
              <div className="text valign">
                <p  >Years <br /> Of Experience</p>
              </div>
            </li>
            <li className="flex">
              <div className="numb valign">
                <h3 className="text-white" >165</h3>
              </div>
              <div className="text valign">
                <p>Projects Completed <br /> In 19 Countries </p>
              </div>
            </li> */}
                <div className="social" style={{ display: "flex" }}>
                  <ShowIf if={mentorData?.facebook}>
                    <a
                      style={{ cursor: "pointer" }}
                      href={mentorData?.facebook}
                      target="_blank"
                      className="soc-icons"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faFacebook} />{" "}
                    </a>
                  </ShowIf>
                  <ShowIf if={mentorData?.instagram}>
                    <a
                      style={{ cursor: "pointer" }}
                      href={mentorData?.instagram}
                      target="_blank"
                      className="soc-icons"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faInstagram} />{" "}
                    </a>
                  </ShowIf>
                  <ShowIf if={mentorData?.linkedin}>
                    <a
                      style={{ cursor: "pointer" }}
                      href={mentorData?.linkedin}
                      target="_blank"
                      className="soc-icons"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faLinkedin} />{" "}
                    </a>
                  </ShowIf>
                  <ShowIf if={mentorData?.github}>
                    <a
                      style={{ cursor: "pointer" }}
                      href={mentorData?.github}
                      target="_blank"
                      className="soc-icons"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faGithub} />{" "}
                    </a>
                  </ShowIf>

                  {/* <a  style={{cursor: "pointer"}} href={mentorData?.linkedin} target="_blank" className='soc-icons'> <FontAwesomeIcon icon={faLinkedin} /></a> */}

                  {/* <a href="https://www.instagram.com/reeducate9/" target="_blank" className='soc-icons'> <FontAwesomeIcon icon={faTwitter} /></a> */}
                </div>
                <li className="mail-us">
                  <a href="mailto:your@email.com?subject=Subject">
                    <div style={{ visibility: "hidden" }} className="flex">
                      <div className="text valign">
                        <div className="full-width">
                          <p>Get In Touch</p>
                          <h6 className="text-white">Vie_Support@Gmail.Com</h6>
                        </div>
                      </div>
                      <div className="mail-icon">
                        <div className="icon-box">
                          <span className="icon color-font pe-7s-mail" />
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="line bottom left" />
      </header>
    </div>
  );
};

export default MentorContainer;
