import { img_route } from "../../api/endPoints";

import { PropsFn } from "../../models/propsFn";
import { User } from "../../models/userModel";

import ResponsiveImage from "../../ui/image/image";
import React from "react";
import { useTranslation } from "react-i18next";

const MentorCard: React.FC<{
  mentorClicked: (mentor: User) => any;
  user: User;
  index: number;
}> = (props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const mentorClickedHandler = () => {
    props.mentorClicked(props.user);
  };

  if (!isMounted) return null;

  return (
    <div
      onClick={mentorClickedHandler}
      className="col-lg-3 col-md-6 "
      style={{ marginBottom: "50px", cursor: "pointer" }}
    >
      <div className="item cir md-mb50 ">
        <a style={{ borderRadius: "26px", overflow: "hidden" }}>
          <div className="img">
            {props.user?.photo && (
              <ResponsiveImage
                link={`${img_route}${props.user?.photo}`}
                name={props.user?.name_ka || "default.jpg"}
                width={300}
                height={300}
                unoptimized
              />
            )}
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
                    {props.user.speciality}
                  </textPath>
                </text>
              </g>
            </svg>
          </div> */}
            <div className="info">
              <div className="text-white H5">
                {lang === "ka" ? (
                  <>
                    {props.user?.name_ka} {props.user?.lastName_ka}
                  </>
                ) : (
                  <>
                    {props.user?.name_en} {props.user?.lastName_en}
                  </>
                )}
              </div>
              <span> {props.user.speciality}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default MentorCard;
