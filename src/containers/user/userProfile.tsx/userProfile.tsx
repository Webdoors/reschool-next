import { useEffect, useState } from "react";
import React from "react";
import image from "../../../img/hero.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./profile.css";
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { RootState } from "../../../store/reducer";
import { useSelector, useDispatch } from "react-redux";

import { AiFillEdit } from "react-icons/ai";
import { authActions } from "../../../store/auth/auth-slice";
import Image from "../../../ui/image/image";
import CourseCard from "../../../components/course/course-card";
import GroupCard from "../../../components/course/group-card";
import EmptyState from "../../../ui/empty-state";
import { useHistory } from "react-router";
import { img_route } from "../../../api/endPoints";
import ShowIf from "../../../utils/showIf";

const UserProfile: React.FC = () => {
  const history = useHistory();

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const editHandler = () => {
    dispatch(authActions.showUpdateModal(true));
  };
  const activeCourseChanged = () => {};
  const scrollToCourseHandler = (emptyComp?: boolean) => {
    let element: any = document.querySelector(".scroll-to");

    if (emptyComp) {
      return;
    }
    if (window.location.href.includes("profilesc")) {
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const navigateToCourseHandler = (id: string) => {
    history.push(id);
  };
  return (
    <div>
      <div className={"bottom__line"}>
        <header
          className="freelancre valign  "
          style={{ paddingTop: "150px", minHeight: "70vh" }}
        >
          <div className="container ">
            <div className="row" style={{ marginBottom: "100px" }}>
              <div className="col-lg-4">
                <div className="img mn-mob">
                  {/* <img src={image} alt="img" /> */}
                  <Image
                    link={`${img_route}${user?.photo}`}
                    name={user?.name_ka || "img"}
                  />
                </div>
              </div>
              <div
                className="col-lg-8 valign "
                style={{ position: "relative" }}
              >
                <div className="cont">
                  <h1 className="cd-headline clip text-white">
                    {user?.name_ka} {user?.lastName_ka}
                    <a
                      onClick={editHandler}
                      className="cursor-hover"
                      style={{
                        position: "absolute",
                        right: "30px",
                        top: "10px",
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                    >
                      <AiFillEdit cursor={"pointer"} color="#12c2e9" />
                    </a>
                    {/* <span className="cd-words-wrapper">
                <b className="is-visible color-font fw-600">Mobile Apps</b>
                <b className="color-font fw-600">Landing Pages</b>
                <b className="color-font fw-600">Awesome Design</b>
              </span> */}
                  </h1>
                </div>
              </div>
            </div>
            <div className="states">
              <div className="container">
                <ul className="flex">
                  <li className="flex">
                    <div className="numb valign">
                      <h3 className="text-white">
                        {user?.courses?.length || 0}
                      </h3>
                    </div>
                    <div className="text valign">
                      <p>
                        მოდულები
                        {/* <br />  */}
                      </p>
                    </div>
                  </li>
                  {/* <li className="flex">
              <div className="numb valign">
                <h3 className="text-white" >{user?.courses?.length}</h3>
              </div>
              <div className="text valign">
                <p>დასრულებული კურსები </p>
              </div>
            </li> */}
                  <div className="social" style={{ display: "flex" }}>
                    {user?.social_page?.includes("facebook") ? (
                      <a
                        href={user.social_page}
                        target="_blank"
                        className="soc-icons"
                        aria-label="Facebook"
                      >
                        {" "}
                        <FontAwesomeIcon icon={faFacebook} />{" "}
                      </a>
                    ) : user?.social_page?.includes("linkedin") ? (
                      <a
                        href={user?.social_page}
                        target="_blank"
                        className="soc-icons"
                        aria-label="LinkedIn"
                      >
                        {" "}
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    ) : user?.social_page?.includes("instagram") ? (
                      <a
                        href={user?.social_page}
                        target="_blank"
                        className="soc-icons"
                        aria-label="Instagram"
                      >
                        {" "}
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    ) : (
                      ""
                    )}
                    {!user?.social_page ? (
                      <React.Fragment>
                        <ShowIf if={user?.facebook}>
                          <a
                            style={{ cursor: "pointer" }}
                            href={user?.facebook}
                            target="_blank"
                            className="soc-icons"
                            aria-label="Facebook"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faFacebook} />{" "}
                          </a>
                        </ShowIf>
                        <ShowIf if={user?.instagram}>
                          <a
                            style={{ cursor: "pointer" }}
                            href={user?.instagram}
                            target="_blank"
                            className="soc-icons"
                            aria-label="Instagram"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faInstagram} />{" "}
                          </a>
                        </ShowIf>
                        <ShowIf if={user?.linkedin}>
                          <a
                            style={{ cursor: "pointer" }}
                            href={user?.linkedin}
                            target="_blank"
                            className="soc-icons"
                            aria-label="LinkedIn"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faLinkedin} />{" "}
                          </a>
                        </ShowIf>
                        <ShowIf if={user?.github}>
                          <a
                            style={{ cursor: "pointer" }}
                            href={user?.github}
                            target="_blank"
                            className="soc-icons"
                            aria-label="GitHub"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faGithub} />{" "}
                          </a>
                        </ShowIf>
                      </React.Fragment>
                    ) : (
                      ""
                    )}

                    {/* <a href="https://www.instagram.com/reeducate9/" target="_blank" className='soc-icons'> <FontAwesomeIcon icon={faTwitter} /></a> */}
                  </div>
                  {/* <li className="mail-us">
              <a href="mailto:your@email.com?subject=Subject">
                <div className="flex">
                  <div className="text valign">
                    <div className="full-width">
                      <p>Get In Touch</p>
                      <h6 className='text-white' >{user?.email}</h6>
                    </div>
                  </div>
                  <div className="mail-icon">
                    <div className="icon-box">
                      <span className="icon color-font pe-7s-mail" />
                    </div>
                  </div>
                </div>
              </a>
            </li> */}
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div style={{ marginTop: "10px" }}>
        <h3
          className="text-white ta-center"
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontWeight: "normal",
            letterSpacing: "8px",
          }}
        >
          {" "}
          მოდულები{" "}
        </h3>

        {user?.courses?.length ? (
          user?.courses?.map((group: any) => {
            return (
              <GroupCard
                student={user}
                pdfUrl={
                  (user as any)?.certificates?.find(
                    (certificate: { groupId: string; pdfUrl: number }) =>
                      certificate?.groupId === group?.id,
                  )?.pdfUrl
                }
                studentScore={
                  (user as any)?.scores?.find(
                    (score: { groupId: string; scoreValue: number }) =>
                      score?.groupId === group?.id,
                  )?.scoreValue
                }
                profileMode={true}
                gropeLoaded={scrollToCourseHandler}
                groupClicked={() => navigateToCourseHandler(group.courseId)}
                key={group?._id}
                group={group}
              />
            );
          })
        ) : (
          <EmptyState
            emptyComponentLoaded={() => scrollToCourseHandler(true)}
            message={"მოდულები არ მოიძებნა"}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
