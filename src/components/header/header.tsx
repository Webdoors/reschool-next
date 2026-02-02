import React, { useEffect, useState } from "react";
// import HomeImg from "../../img/banner.webp"; // Unused
import Link from "next/link";
import { AppDispatch, RootState } from "../../store/reducer";
import { useSelector } from "react-redux";
// import ShowIf from "../../utils/showIf"; // Unused
import stairs1 from "../../img/stairs1.svg";
import stairs2 from "../../img/stairs2.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { DirectionModel } from "../../models/directionModel";
import { coursesAction } from "../../store/courses/courses.slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ApiService } from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import { img_route } from "../../api/endPoints";
import { useRouter, useParams } from "next/navigation";
import ResponsiveImage from "../../ui/image/image";

export const HeaderComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const directions = useSelector(
    (state: RootState) => state.coursesState.directions,
  );
  const dispatch: AppDispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.LoggedIn);
  const router = useRouter();
  const params = useParams();
  const [SlidersInfo, setSlidersInfo] = useState<any>(null);
  const directionClicked = (direction: DirectionModel) => {
    dispatch(coursesAction.activeDirectionChanged({ direction }));
    router.push(`/${lang}/modules/`);
  };

  const [aboutInfo, setAboutInfo] = useState<any>(null);

  useEffect(() => {
    // Fetch certificate information
    ApiService.apiCall(EndPoints.GET_ABOUT)
      .then((res: any) => {
        // console.log("resAbout", res);
        setAboutInfo(res?.data?.data?.data || res?.data?.data || res?.data);
      })
      .catch((err: any) => {
        //console.log(err?.response?.data?.message);
      });
  }, []);
  useEffect(() => {
    ApiService.apiCall(EndPoints.GET_SLIDERS)
      .then((res: any) => {
        // console.log("h",res)
        setSlidersInfo(res?.data?.data); // Assuming this is an array
      })
      .catch((err: any) => {
        // Handle error
      });
  }, []);
  return (
    <React.Fragment>
      <header className="slider-st valign position-re">
        <div
          className="d-none"
          style={{
            color: "white",
            background: "#000000b0",
            top: "0px",
            zIndex: "9999",
            position: "fixed",
            width: "100%",
            height: "100%",
            fontSize: "60px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <div>
            <div>re:school </div>
            <div>მიმდინარეობს განახლება </div>
            <div
              style={{
                fontSize: "18px",
              }}
            >
              <div>ელ. ფოსტა </div>
              <div>reschoolspace@gmail.com</div>
              <div>ტელეფონი </div>
              <div>+551 420 099 </div>
            </div>
          </div>
        </div>
        <div
          className="BACKBLUR"
          style={{
            borderRadius: "2239px",
            background:
              "radial-gradient(102.75% 102.75% at 16.48% 18.31%, #8888C8 42.2%, #8388CC 57.85%, rgba(49, 129, 200, 0.51) 69.82%, rgba(60, 216, 214, 0.83) 84.62%)",
            filter: "blur(196px)",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        ></div>
        <div
          className="container MSDIV"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "140px",
            background: "#000",
            zIndex: "999",
            borderRadius: "49px",
          }}
        >
          <ResponsiveImage
            link={stairs1}
            name="stairs1"
            width={100}
            height={100}
            priority
            unoptimized
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              width: "100px",
              height: "100px",
            }}
          />
          <ResponsiveImage
            link={stairs2}
            name="stairs2"
            width={100}
            height={100}
            priority
            unoptimized
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0px",
              width: "100px",
              height: "100px",
            }}
          />
          <div className="row">
            <div className="col-lg-6 valign">
              <div className="cont md-mb50">
                <h1
                  className="mb-10 fw-400 text-white"
                  style={{
                    textAlign: "left",
                    display: "block",
                    fontFamily: "Helvetica_Neue_LT_GEO_75",
                    fontFeatureSettings: "'case' on",
                    fontSize: "39px",
                  }}
                >
                  <br />
                  {lang === "ka" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: aboutInfo?.hometitle_ka,
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: aboutInfo?.hometitle_en,
                      }}
                    />
                  )}
                </h1>
                <div
                  style={{
                    paddingRight: "20px",
                    fontFamily: "Helvetica_Neue_LT_GEO_55",
                    color: "#fff",
                    fontSize: "16px",
                  }}
                >
                  {lang === "ka" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: aboutInfo?.homesmalltext_ka,
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: aboutInfo?.homesmalltext_en,
                      }}
                    />
                  )}
                </div>

                <a
                  target="_blank"
                  href="https://forms.gle/uC49R5XNa8VUrTsd8"
                  className="butn bord curve mt-30 hover-color border-new"
                  style={{
                    width: "65%",
                    fontSize: "18px",
                    padding: "12px 3px",
                    textAlign: "center",
                    margin: "3px",
                    borderRadius: "39px!important",
                  }}
                >
                  <span suppressHydrationWarning>{t("courseregister")}</span>
                </a>

                {/* <ShowIf if={!loggedIn}>
                          <NavLink  to="signup" className="butn bord curve mt-30 hover-color border-new" style={{width: '47%', fontSize: '18px', padding: '12px 3px', textAlign: 'center', margin: '3px'}}>ვებ-გვერდზე რეგისტრაცია</NavLink>
                           </ShowIf>*/}
              </div>
            </div>
            <div className="col-lg-6 feat px-0">
              <div className="row " style={{ justifyContent: "center" }}>
                {/*{*/}
                {/*directions?.length?  directions.map((direction, i)=>{*/}
                {/*    if(direction){*/}
                {/*      return <DirectionCardHome key={direction.id} index={i} directionClicked={directionClicked} direction={direction} />*/}
                {/*    }*/}
                {/*   */}
                {/*  }): ''*/}
                {/*}*/}
                <Swiper
                  navigation={false}
                  modules={[Navigation, Pagination, Autoplay]}
                  style={{
                    padding: "0px",
                    background: "#dddddd1a",
                    borderRadius: "30px",
                  }}
                  className="mySwiper"
                  preventClicks={false}
                  allowTouchMove={true}
                  draggable={true}
                  spaceBetween={20}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  initialSlide={0}
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
                  {SlidersInfo?.map((slider: any, i: number) => {
                    return (
                      <SwiperSlide key={i}>
                        <ResponsiveImage
                          style={{
                            borderRadius: "10px",
                            width: "100%",
                            height: "auto",
                          }}
                          link={`${img_route}${lang === "ka" ? slider?.photo_ka : slider?.photo_en}`}
                          name="slider image"
                          unoptimized
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <div></div>
      </div>
    </React.Fragment>
  );
};

export default HeaderComponent;
