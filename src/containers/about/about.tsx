"use client";

import aboutImage1 from "../../img/about/1.jpeg";
import about1 from "../../img/1.png";
import about2 from "../../img/2.png";
import about3 from "../../img/3.png";
import about4 from "../../img/about4.png";
import main1 from "../../img/main1.jpg";
import main2 from "../../img/main2.jpg";
import main3 from "../../img/main3.jpg"; // Note: main3 usage was likely inferred, verifying if it exists in original imports
import logo3 from "../../img/logo3.png";
import logo2 from "../../img/reinvent.png";
import React, { useEffect, useState } from "react";
// import { Womans } from "../../models/womans"; // Not used in rendered code, commenting out
import { ApiService } from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import { useTranslation } from "react-i18next";

const AboutContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [aboutInfo, setAboutInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };
  useEffect(() => {
    // Fetch certificate information
    ApiService.apiCall(EndPoints.GET_ABOUT)
      .then((res: any) => {
        console.log("res", res);
        setAboutInfo(res?.data?.data);
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
      });
  }, []);

  return (
    <div
      className="wrapper circle-bg py-4 LIGHTS"
      style={{ marginTop: "50px" }}
    >
      <section
        className={"serv-arch "}
        style={{ borderRadius: "20px" }}
        data-scroll-index={1}
      >
        <div
          className={"container"}
          style={{
            background: "#262525",
            borderRadius: "30px",
            marginTop: "80px",
            padding: "0rem 0rem 0rem 0rem",
            overflow: "hidden",
          }}
        >
          <div
            className="cont text-center row BGABOUT"
            style={{
              background: "url('/img/aboutmain.jpeg')",
              height: "400px",
              backgroundSize: "99%",
              backgroundPosition: "right -267px",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Content hidden in original code too */}
          </div>
          <div
            className="row"
            style={{
              color: "#f1f1f1",
              fontFamily: "Helvetica_Neue_LT_GEO_55",
              background: "#000",
              fontFeatureSettings: "'case' on",
            }}
          >
            <div
              className={`col-12 col-sm-4 add-hover cursor-pointer text-center py-4 ACTIVEME TAB TAB1${activeTab === 1 ? " active-tab" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              {t("about us")}
            </div>
            <div
              className={`col-12 col-sm-4 text-center cursor-pointer add-hover py-4 TAB TAB2${activeTab === 2 ? " active-tab" : ""}`}
              onClick={() => handleTabClick(2)}
              style={{
                borderLeft: "solid 1px #12C2E9",
                borderRight: "solid 1px #F64F59",
              }}
            >
              {t("why reschool")}
            </div>
            <div
              className={`col-12 col-sm-4 text-center cursor-pointer py-4 add-hover TAB TAB3${activeTab === 3 ? " active-tab" : ""}`}
              onClick={() => handleTabClick(3)}
            >
              {t("our projects")}
            </div>
          </div>
          <div
            className="row AFTER my-5 d-none"
            style={{
              color: "#f1f1f1",
              fontFamily: "Helvetica_Neue_LT_GEO",
              fontFeatureSettings: "'case' on",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img style={{ width: "140px" }} src={logo2.src} alt="logo2" />
            <img style={{ width: "140px" }} src={logo3.src} alt="logo" />
          </div>

          {activeTab === 1 && (
            <div
              className="row  my-5 CONT1"
              style={{
                color: "#f1f1f1",
                fontFamily: '"Helvetica_Neue_LT_GEO_55", serif',
                fontFeatureSettings: "'case' on",
                display: "flex",
                padding: "0px 10%",
                justifyContent: "center",
              }}
            >
              {lang === "ka" ? (
                <div
                  className="col-12 col-sm-9 text-center mb-5"
                  dangerouslySetInnerHTML={{
                    __html: aboutInfo?.text1_ka?.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <div
                  className="col-12 col-sm-9 text-center mb-5"
                  dangerouslySetInnerHTML={{
                    __html: aboutInfo?.text1_en?.replace(/\n/g, "<br />"),
                  }}
                />
              )}
              <div className="col-12 col-sm-7">
                {lang === "ka" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text2_ka }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text2_en }}
                  />
                )}
              </div>
              <div className="col-12 col-sm-5">
                <img src={aboutImage1.src} alt="sss" />
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div
              className="row  my-5 CONT2"
              style={{
                color: "#f1f1f1",
                fontFamily: '"Helvetica_Neue_LT_GEO_55", serif',
                fontFeatureSettings: "'case' on",
                display: "flex",
                padding: "0px 10%",
                justifyContent: "center",
              }}
            >
              <div className="col-12 col-sm-4">
                <img src={main1.src} alt="sss" />
              </div>
              <div className="col-12 col-sm-4">
                <img src={main2.src} alt="sss" />
              </div>
              <div className="col-12 col-sm-4">
                <img src={main3.src} alt="sss" />
              </div>
              <div
                className="col-12"
                style={{ textAlign: "center", marginTop: "50px" }}
              >
                {lang === "ka" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text3_ka }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text3_en }}
                  />
                )}
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div
              className="row  my-5 CONT3"
              style={{
                color: "#f1f1f1",
                fontFamily: '"Helvetica_Neue_LT_GEO_55", serif',
                fontFeatureSettings: "'case' on",
                display: "flex",
                padding: "0px 10%",
                justifyContent: "center",
              }}
            >
              <div className="col-12 col-sm-2 order-1">
                <img
                  src={about1.src}
                  style={{ height: "200px", width: "auto" }}
                  alt="sss"
                />
              </div>
              {/* <div className="col-12 col-sm-10 order-2" style={{padding: "40px 0px"}}>
                 ... Content truncated in original view too ...
              </div> */}
              {/* Re-adding complete content structure based on original file */}
              <div
                className="col-12 col-sm-10 order-2"
                style={{ padding: "40px 0px" }}
              >
                {lang === "ka" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text4_ka }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text4_en }}
                  />
                )}
              </div>
              <div
                className="col-12 col-sm-10 order-4 order-sm-3"
                style={{ padding: "40px 0px" }}
              >
                {lang === "ka" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text5_ka }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text5_en }}
                  />
                )}
              </div>
              <div className="col-12 col-sm-2 order-3 order-sm-4">
                <img
                  src={about2.src}
                  style={{ height: "200px", width: "auto" }}
                  alt="sss"
                />
              </div>
              <div className="col-12 col-sm-2 order-5">
                <img
                  src={about3.src}
                  style={{ height: "200px", width: "auto" }}
                  alt="sss"
                />
              </div>
              <div
                className="col-12 col-sm-10 order-6"
                style={{ padding: "40px 0px" }}
              >
                {lang === "ka" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text6_ka }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text6_en }}
                  />
                )}
              </div>
              <div
                className="col-12 col-sm-10 order-7 order-sm-7"
                style={{ padding: "40px 0px" }}
              >
                {lang === "ka" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text7_ka }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: aboutInfo?.text7_en }}
                  />
                )}
              </div>
              <div className="col-12 col-sm-2 order-8 order-sm-8">
                <img
                  src={about4.src}
                  style={{ height: "200px", width: "auto" }}
                  alt="sss"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutContainer;
