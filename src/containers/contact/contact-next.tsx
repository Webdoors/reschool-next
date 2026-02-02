"use client";

// import mapImage from '../../img/contact_map.png'
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import message from "../../img/Message.svg";
import call from "../../img/Call.svg";
import location from "../../img/Location.svg";
import { useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../../ui/image/image";

const ContactContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  // const lang = i18n.language;
  const [showPopup, setShowPopup] = useState(false);
  const toggleVisibility = () => {
    setShowPopup(true);
  };
  return (
    <div
      className="main-content LIGHTS"
      style={{ marginTop: "50px", overflow: "hidden", background: "#000" }}
    >
      <section
        className="contact section-padding "
        style={{ padding: "70px 0" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="mb-4" style={{ color: "#FFF", fontSize: "27px" }}>
                <span>
                  {t("Text us")}
                  <span className="LINE w-100"></span>
                </span>
              </h2>
              <div
                className="form md-mb50 h-auto"
                style={{
                  background: "#131415",
                  padding: "34px",
                  borderRadius: "30px",
                }}
              >
                <form
                  action="https://webdoors.ge/partners/reschool/"
                  id="contact-form"
                >
                  <div className="messages" />
                  <div className="controls">
                    <div className="form-group">
                      <input
                        id="form_name"
                        style={{ fontFamily: "Helvetica_Neue_LT_GEO_55" }}
                        className="ps-3"
                        type="text"
                        name="name"
                        placeholder={t("name")}
                        required={true}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        id="form_email"
                        style={{ fontFamily: "Helvetica_Neue_LT_GEO_55" }}
                        className="ps-3"
                        type="tel"
                        name="email"
                        placeholder={t("tel")}
                        required={true}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        id="form_email"
                        style={{ fontFamily: "Helvetica_Neue_LT_GEO_55" }}
                        className="ps-3"
                        type="email"
                        name="tel"
                        placeholder={t("email")}
                        required={true}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        id="form_message"
                        style={{ fontFamily: "Helvetica_Neue_LT_GEO_55" }}
                        className="mt-3"
                        name="message"
                        placeholder={t("whatdoyouthink")}
                        rows={4}
                        required={true}
                        defaultValue={""}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{ fontSize: "21px" }}
                      onClick={() => toggleVisibility()}
                      className="butn mt-3 bord font-nino w-100"
                    >
                      {t("send")}
                    </button>
                  </div>
                </form>
                {showPopup && (
                  <div className="success-popup">
                    <p>Successfully sent!</p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-3">
              <h2 className="mb-4" style={{ color: "#FFF", fontSize: "27px" }}>
                <span>
                  {t("contact us")}
                  <span className="LINE w-100"></span>
                </span>
              </h2>

              <div className="row mx-0">
                <div
                  className="col-lg-12"
                  style={{
                    background: "#131415",
                    padding: "34px",
                    borderRadius: "30px",
                  }}
                >
                  <div className="cont-info">
                    <h3 className="wow text-white">{t("contact")}</h3>
                    <ul className="mb-0" style={{ paddingLeft: "0" }}>
                      <li>
                        <ResponsiveImage
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                          link={message}
                          name="message icon"
                        />

                        <div
                          className="cont"
                          style={{ display: "inline-grid" }}
                        >
                          <h6 className="text-white">{t("email")}</h6>
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
                            marginRight: "10px",
                          }}
                          link={call}
                          name="call icon"
                        />
                        <div
                          className="cont"
                          style={{ display: "inline-grid" }}
                        >
                          <h6 className="text-white">{t("tel")}</h6>
                          <p style={{ margin: 0 }}>
                            <a href="tel:+995551420099">+995 551 420 099</a>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-lg-12 mt-3"
                  style={{
                    background: "#131415",
                    padding: "34px",
                    borderRadius: "30px",
                  }}
                >
                  <div className="cont-info">
                    <h3 className="wow text-white" data-splitting>
                      {t("addresses")}
                    </h3>
                    <ul className="mb-0" style={{ paddingLeft: "0" }}>
                      <li>
                        <ResponsiveImage
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                          link={location}
                          name="location icon"
                        />
                        <div
                          className="cont"
                          style={{ display: "inline-grid" }}
                        >
                          <h6 className="text-white">{t("tbilisi")}</h6>
                          <div className="item">
                            <a
                              target="_blank"
                              href="https://drive.google.com/file/d/1AbVmT_c9lENWWsPzb4VnNosKYd4p-gzx/view"
                            >
                              <h6 style={{ color: "#a4a7b1" }}>
                                {t("central")}
                              </h6>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <ResponsiveImage
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                          link={location}
                          name="location icon"
                        />
                        <div
                          className="cont"
                          style={{ display: "inline-grid" }}
                        >
                          <h6 className="text-white">{t("kutaisi")}</h6>
                          <div className="item">
                            <a
                              target="_blank"
                              href="https://drive.google.com/file/d/1AbVmT_c9lENWWsPzb4VnNosKYd4p-gzx/view"
                            >
                              <h6 style={{ color: "#a4a7b1" }}>
                                {t("kutaisiaddress")}
                              </h6>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <ResponsiveImage
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                          link={location}
                          name="location icon"
                        />
                        <div
                          className="cont"
                          style={{ display: "inline-grid" }}
                        >
                          <h6 className="text-white">{t("batumi")}</h6>
                          <div className="item">
                            <a
                              target="_blank"
                              href="https://drive.google.com/file/d/1AbVmT_c9lENWWsPzb4VnNosKYd4p-gzx/view"
                            >
                              <h6 style={{ color: "#a4a7b1" }}>
                                {t("batumiaddress")}
                              </h6>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-1 CONTACT">
              <h2 style={{ height: "35px" }}></h2>
              <div className="row h-75 mx-0 pt-4">
                <div
                  className="col-12 h-100"
                  style={{
                    background: "#131415",
                    padding: "34px",
                    borderRadius: "30px",
                  }}
                >
                  <div className="social h-100 SOCIAL2">
                    <a
                      href="https://www.facebook.com/reschool2022/"
                      style={{ borderColor: "#EA3B3B" }}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faFacebook} />{" "}
                    </a>
                    <a
                      href="https://www.linkedin.com/company/86423263/admin/"
                      style={{ borderColor: "#19B6EF" }}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                      href="https://www.instagram.com/reschool.world/"
                      style={{ borderColor: "#00E531" }}
                      target="_blank"
                    >
                      {" "}
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@reschool.world"
                      style={{ borderColor: "#FFEF20" }}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faTiktok} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactContainer;
