import { Group } from "../../models/groupModel";
import ResponsiveImage from "../../ui/image/image";

import Link from "next/link";
import { CourseModel } from "../../models/courseModel";
import React, { useEffect } from "react";
import { User } from "../../models/userModel";
import { img_route_courses, pdf_certificates } from "../../api/endPoints";
import ShowIf from "../../utils/showIf";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { purchaseHandler } from "../../utils/utils";
import { useTranslation } from "react-i18next";
const GroupCard: React.FC<{
  student?: User;
  index?: number;
  group: Group | CourseModel;
  studentScore?: number;
  groupClicked?: () => any;
  isCoursePage?: boolean;
  gropeLoaded?: () => void;
  courseDetailView?: boolean;
  loggedIn?: boolean;
  registrationClicked?: () => void;
  profileMode?: boolean;
  upLevel?: boolean;
  mentor?: User;
  toggleFromMobile?: () => void;
  pdfUrl?: string;
}> = (props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const student = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (props.gropeLoaded) {
      props.gropeLoaded();
    }
  });

  const registrationHAndler = (id: string) => {
    purchaseHandler(id);

    if (props.registrationClicked) {
      // props.groupClicked()
      // props.registrationClicked()
    }
  };

  // file download

  const downloadCertificateHandler = () => {
    fetch(`${pdf_certificates}/${props.pdfUrl}`).then((response) => {
      console.log(`${pdf_certificates}${props.pdfUrl}`);
      response.blob().then((blob) => {
        const a = document.createElement("a");
        const fileUrl = window.URL.createObjectURL(blob);
        a.href = fileUrl;
        console.log(student);
        if (student?.name_ka && student?.lastName_ka) {
          a.download = student?.name_ka + "__" + `${student?.lastName_ka}`;
        } else {
          a.download = "Certificate";
        }

        a.click();
      });
    });
  };

  return (
    <section
      className={`team about-ar section-padding scroll-to ${props.profileMode ? "bottom__line" : ""}   ${props.profileMode ? "bottom__line_right" : ""}`}
      data-scroll-index={1}
      style={{
        background: !props?.isCoursePage ? "#111215" : "",
        paddingTop: !props?.isCoursePage && !props.profileMode ? "" : "50px",
        backgroundColor: props.profileMode ? "transparent" : "rgb(35, 35, 35),",
      }}
    >
      <div className="container">
        <div
          className="row"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="col-lg-4 col-md-6">
            <div className="item cir md-mb50">
              <a>
                <div className="img">
                  <ResponsiveImage
                    link={props.group?.photo || "default.jpeg"}
                    name={props.group?.photo || "course photo"}
                    unoptimized
                  />
                  {/* <div id="circle">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="300px"
                    height="300px"
                    viewBox="0 0 300 300"
                    enableBackground="new 0 0 300 300"
                    xmlSpace="preserve"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
                      />
                    </defs>
                    <circle cx={150} cy={100} r={75} fill="none" />
                    <g>
                      <use xlinkHref="#circlePath" fill="none" />
                      <text fill="#fff">
                        <textPath xlinkHref="#circlePath">
                         {props.group.mentors?.length? props.group.mentors[0]?.speciality || props?.mentor?.speciality : 'არ არის მოცემული' }
                        </textPath>
                      </text>
                    </g> 
                  </svg>
                </div> */}
                  <div className="info">
                    <h5 className="text-white  fz-15">
                      {" "}
                      {props.group.mentors?.length
                        ? `${props.group.mentors[0]?.name_ka || props?.mentor?.name_ka} ${props.group.mentors[0]?.lastName_ka || props?.mentor?.lastName_ka}`
                        : "არ არის მოცემული"}
                    </h5>
                    <span>
                      {" "}
                      {props.group.mentors?.length
                        ? props.group.mentors[0]?.speciality ||
                          props?.mentor?.speciality
                        : "არ არის მოცემული"}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="content">
              <h6
                className="sub-title  ls2 text-u numb"
                style={{ color: "#9E86EC" }}
              >
                საფეხური [{props?.group?.level}]
              </h6>
              <h2 className="text-white">
                {lang === "ka" ? (
                  <>{props.group.name_ka}</>
                ) : (
                  <>{props.group.name_en}</>
                )}
              </h2>
              <p>{props.group?.shortDescription}</p>
              <ShowIf if={props?.studentScore ? true : false}>
                <h6 style={{ color: "#fff" }}>
                  მიღებული ქულა:{" "}
                  <span
                    style={{
                      color: "#9E86EC",
                      fontSize: "20px",
                      marginLeft: "10px",
                    }}
                  >
                    {" "}
                    {props.studentScore}
                  </span>
                </h6>
              </ShowIf>
              <ShowIf if={props?.pdfUrl ? true : false}>
                <div>
                  <button
                    onClick={downloadCertificateHandler}
                    className="btn text-light"
                    style={{ paddingLeft: "0" }}
                  >
                    <i className="fa fa-download"></i> CERTIFICATE
                  </button>
                </div>
              </ShowIf>

              {!props.courseDetailView ? (
                <Link
                  style={{ cursor: "pointer" }}
                  href={`/${lang}/courses/${props?.group?.courseId + "/" + props.group._id}`}
                  className="butn bord mt-30 hover-color"
                >
                  <span>იხილეთ სრულად</span>
                </Link>
              ) : (
                <React.Fragment>
                  {" "}
                  <a
                    className="butn bord mt-30 hover-color reg__mob"
                    style={{ cursor: "pointer" }}
                    onClick={props?.toggleFromMobile}
                  >
                    {" "}
                    <span>
                      {" "}
                      {!props.courseDetailView
                        ? "იხილეთ სრულად"
                        : "კურსზე ჩაწერა"}
                    </span>{" "}
                  </a>{" "}
                  <a
                    target="_blank"
                    href={props?.group?.payze}
                    className="butn bord mt-30 hover-color reg__desk"
                    style={{ cursor: "pointer" }}
                    onClick={() => registrationHAndler(props?.group?.courseId)}
                  >
                    {" "}
                    <span>
                      {" "}
                      {!props.courseDetailView
                        ? "იხილეთ სრულად"
                        : "კურსზე ჩაწერა"}
                    </span>{" "}
                  </a>{" "}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupCard;
