import blog1 from "../../img/blog/1.jpg";
import blog2 from "../../img/blog/2.jpg";
import logoLight from "../../img/logo.webp";
import call from "../../img/Call.svg";
import location from "../../img/Location.svg";
import message from "../../img/Message.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../../ui/image/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faTiktok,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { terms_route } from "../../api/endPoints";
// import {fac} from '@fortawesome/free-solid-svg-icons'w
export const FooterComponent: React.FC = () => {
  const { t, i18n } = useTranslation();

  // console.log('Current Language:', i18n.language);
  return (
    <footer className="sub-bg">
      <div className="container">
        <div className="row" style={{ justifyContent: "space-around" }}>
          <div className="col-lg-4">
            <div className="item md-mb50">
              <div className="title">
                <div className="d-none">{t("Welcome to React")}</div>
                <div className="text-white H5">{t("contact information")}</div>
              </div>
              <ul style={{ paddingLeft: "0" }}>
                <li>
                  <ResponsiveImage
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "30px",
                    }}
                    link={message}
                    name="message icon"
                  />

                  <div className="cont">
                    <div className="text-white H6">{t("email")}</div>
                    <p>
                      <a href="mailto:reschoolspace@gmail.com">
                        reschoolspace@gmail.com
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <ResponsiveImage
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "30px",
                    }}
                    link={call}
                    name="call icon"
                  />
                  <div className="cont">
                    <div className="text-white H6">{t("tel")}</div>
                    <p style={{ margin: 0 }}>
                      <a href="tel:+995551420099">+995 551 420 099</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="item md-mb50">
              <div className="title">
                <div className="text-white H5">{t("addresses")}</div>
              </div>
              <ul style={{ paddingLeft: "0" }}>
                <li>
                  <ResponsiveImage
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "30px",
                    }}
                    link={location}
                    name="location icon"
                  />
                  <div className="cont">
                    <div className="text-white H6">{t("tbilisi")}</div>
                    <div className="item">
                      <a
                        target="_blank"
                        href="https://maps.app.goo.gl/p9RmMhNnm2snSm7n8"
                      >
                        <div className="H6" style={{ color: "#a4a7b1" }}>
                          {t("central")}, <br /> {t("reinvent")}{" "}
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <ResponsiveImage
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "30px",
                    }}
                    link={location}
                    name="location icon"
                  />
                  <div className="cont">
                    <div className="text-white H6">{t("kutaisi")}</div>
                    <div className="item">
                      <a
                        target="_blank"
                        href="https://maps.app.goo.gl/UKCYox1ukrKNvct18"
                      >
                        <div className="H6" style={{ color: "#a4a7b1" }}>
                          {t("kutaisiaddress")}
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <ResponsiveImage
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "30px",
                    }}
                    link={location}
                    name="location icon"
                  />
                  <div className="cont">
                    <div className="H6 text-white">{t("batumi")}</div>
                    <div className="item">
                      <a
                        target="_blank"
                        href="https://maps.app.goo.gl/Pw5nDFgnqkj6w9p56"
                      >
                        <div className="H6" style={{ color: "#a4a7b1" }}>
                          {t("batumiaddress")}{" "}
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4" style={{ display: "none" }}>
            <div className="item ">
              <div className="title">
                <div className="text-white H5">ჩვენი კურსები</div>
              </div>
              <ul style={{ paddingLeft: "0" }}>
                <li>
                  <div className="img">
                    <img src={blog1.src} alt="" />
                  </div>
                  <div className="sm-post">
                    <p>
                      The Start-Up Ultimate Guide to Make Your WordPress
                      Journal.
                    </p>
                    <span className="date">14 sep 2021</span>
                  </div>
                </li>
                <li>
                  <div className="img">
                    <img src={blog2.src} alt="" />
                  </div>
                  <div className="sm-post">
                    <p>
                      The Start-Up Ultimate Guide to Make Your WordPress
                      Journal.
                    </p>
                    <span className="date">14 sep 2021</span>
                  </div>
                </li>
                <li>
                  <div className="subscribe">
                    <input type="text" placeholder="Type Your Email" />
                    <span className="subs pe-7s-paper-plane" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="item">
              <div className="logo d-none" style={{ marginBottom: "30px" }}>
                <img src={logoLight.src} alt="logo light" />
              </div>

              <div
                className="social"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <a
                  href="https://www.facebook.com/reschool2022/"
                  style={{ borderColor: "#EA3B3B" }}
                  target="_blank"
                  aria-label="Facebook"
                >
                  {" "}
                  <FontAwesomeIcon icon={faFacebook} />{" "}
                </a>
                <a
                  href="https://www.linkedin.com/company/86423263/admin/"
                  style={{ borderColor: "#19B6EF" }}
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href="https://www.instagram.com/reschool.world/"
                  style={{ borderColor: "#00E531" }}
                  target="_blank"
                  aria-label="Instagram"
                >
                  {" "}
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.tiktok.com/@reschool.world"
                  style={{ borderColor: "#FFEF20" }}
                  target="_blank"
                  aria-label="TikTok"
                >
                  {" "}
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
                {/* <a href="https://www.youtube.com/channel/UCfJeggXfZFBGXV5_C7Wk7gA" target="_blank"> <FontAwesomeIcon icon={faYoutube} /></a>*/}
                {/* <a href="https://www.instagram.com/reeducate9/" target="_blank"> <FontAwesomeIcon icon={faGithub} /></a> */}
              </div>
              <div
                style={{ marginBottom: "0px", marginTop: "40px" }}
                className="nav-item"
              >
                <a
                  href={`/${i18n.language}/terms`}
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    fontSize: "16px",
                  }}
                  className="add-hover"
                >
                  {t("Terms of Service")}
                </a>
              </div>
              <div
                style={{ marginBottom: "0px", marginTop: "20px" }}
                className="nav-item"
              >
                2025. {t("rights reserved")}
              </div>
              <ul style={{ padding: 0, marginTop: "50px" }}>
                {/* <li  >
    <span style={{marginRight: '10px'}}  className="icon pe-7s-map-marker" />
    <div className="cont">
        <h6 className='text-white' >შეხვედრები ტარდება</h6>
        <p className='margin-none' >მოსწავლე ახალგაზრდობის ეროვნული სასახლე, შოთა რუსთაველის გამზირი N6</p>
    </div>
</li> */}
              </ul>
              <div className="copy-right margin-none d-none">
                <p>© 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
