import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch } from "../../store/reducer"; // Replace with your actual import
import { useDispatch } from "react-redux";
import { GET_CERT } from "../../api/endPoints"; // Replace with your actual import
import { ApiService } from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import cert from "../../img/cert.png";
import dload from "../../img/download.svg";
import sign from "../../img/sign.png";
import message from "../../img/Message.svg";
import arrowup from "../../img/chevron-up.svg";
import arrowdown from "../../img/chevron-down.svg";
import { useTranslation } from "react-i18next";
const CertContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [certInfo, setCertInfo] = useState<any>(null); // Replace 'any' with the actual type of your certificate information
  const { code } = useParams() as { code: string }; // Get the code from the URL
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(false);
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(1);
  const handlePrint = () => {
    const printableElement = document.getElementById("certPrintable");

    if (printableElement) {
      const printWindow = window.open("Certificate", "_blank");
      if (printWindow) {
        printWindow.document.write(
          "<html><head><title>Certificate</title></head><body>",
        );
        printWindow.document.write(
          '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">',
        );
        printWindow.document.write(`
  <style>
    @font-face {
      font-family: "Helvetica_Neue_LT_GEO";
      src: local('Helvetica_Neue_LT_GEO'), url('${process.env.PUBLIC_URL}/fonts/HELVETICA_NEUE_LT_GEO_65_MEDIUM.TTF') format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: "Helvetica_Neue_LT_GEO_75";
      src: local('Helvetica_Neue_LT_GEO_75'), url('${process.env.PUBLIC_URL}/fonts/Helvetica_Neue_LT_GEO_75_Bold.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: "Helvetica_Neue_LT_GEO_55";
      src: local('Helvetica_Neue_LT_GEO_55'), url('${process.env.PUBLIC_URL}/fonts/Helvetica_Neue_LT_GEO_55_Roman.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    body{
      width: auto;
      position: relative;
      display: inline-block;
    }
    div.MDIV{
    margin-top: -2%!important;
    width: 54%!important;
    right:3%!important;
    }
    ul{
    list-style: none;
    }
     @page {
      size: landscape;
    }
    @media print {
      body {
        size: auto;
        margin: 0px 20px; /* Reset margin to ensure full page utilization */
      }
    }
  </style>
`);

        printWindow.document.write(printableElement.innerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 1000);
      }
    }
  };

  useEffect(() => {
    // Fetch certificate information
    ApiService.apiCall(EndPoints.GET_CERT, code)
      .then((res: any) => {
        setCertInfo(res?.data);

        // You can also dispatch an action here if needed
        // dispatch(yourAction(res?.data?.data?.data));
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
        // Dispatch an action to handle the error
        // dispatch(yourErrorAction(err?.response?.data?.message || 'Something went wrong'));
        if (history) {
          // Optionally, navigate to a 'not found' or 'error' page
          // history.push('/notfound');
        }
      });
  }, [code, dispatch, history]);
  console.log("d", certInfo);
  const toggleVisibility1 = () => {
    setIsVisible1(true);
    setIsVisible2(false);
    setActiveTab(1);
  };
  const toggleVisibility2 = () => {
    setIsVisible2(true);
    setIsVisible1(false);
    setActiveTab(2);
  };
  const toggleItem = (id: number) => {
    // If the item is already open, close it, otherwise open the clicked item
    setOpenItemId(openItemId === id ? null : id);
  };
  return (
    <div
      className="main-content "
      style={{ marginTop: "10px", overflow: "hidden" }}
    >
      <div
        className="CERTDIV"
        style={{
          background: "#000",
          margin: "120px 24% 100px",
          borderRadius: "22px",
        }}
      >
        {certInfo && (
          <div className="container mt-80" style={{ paddingTop: "20px" }}>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="form md-mb50">
                  <div
                    className="fw-700  mb-10 d-flex justify-content-center"
                    style={{
                      fontFamily: "Helvetica_Neue_LT_GEO_55",
                      overflow: "hidden",
                      fontFeatureSettings: "'case' on",
                      fontWeight: "100",
                    }}
                  >
                    <div
                      className="text-center "
                      onClick={() => toggleVisibility1()}
                      style={{
                        color: "white",
                        fontWeight: "100",
                        cursor: "pointer",
                        paddingTop: "14px",
                        backgroundColor:
                          activeTab === 1 ? "#1b1b1b" : "transparent",
                      }}
                    >
                      {t("certificate")}
                      <span className="LINE mt-3"></span>
                    </div>
                    <div
                      className="text-center "
                      onClick={() => toggleVisibility2()}
                      style={{
                        color: "white",
                        fontWeight: "100",
                        cursor: "pointer",
                        paddingTop: "14px",
                        backgroundColor:
                          activeTab === 2 ? "#1b1b1b" : "transparent",
                      }}
                    >
                      {t("Information")}
                      <span className="LINE mt-3"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!certInfo && (
          <div className="container mt-80" style={{ paddingTop: "20px" }}>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="form md-mb50">
                  <div
                    className="fw-700 pb-3 mb-10 text-white d-flex justify-content-center"
                    style={{
                      fontFamily: "Helvetica_Neue_LT_GEO_55",
                      overflow: "hidden",
                      fontFeatureSettings: "'case' on",
                      fontWeight: "100",
                    }}
                  >
                    No certificate found
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isVisible1 && certInfo && (
          <section className="contact" style={{ padding: "0px 0px 50px 0px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-11 mx-auto">
                  <div className="form md-mb50">
                    <div className="" id="certPrintable">
                      <img style={{}} src={(cert as any).src} />
                      <div
                        className="MDIV"
                        style={{
                          position: "absolute",
                          width: "27%",
                          top: "36%",
                          right: "27%",
                          marginLeft: "42%",
                          marginBottom: "110px",
                          fontFamily: "Helvetica_Neue_LT_GEO_55",
                          fontFeatureSettings: "'case' on",
                        }}
                      >
                        <div className="text-center mx-auto justify-content-center d-flex d-inline-block">
                          <span
                            style={{
                              color: "#18b6ee",
                              fontWeight: "bold",
                              fontSize: "20px",
                              fontFamily: "Helvetica_Neue_LT_GEO_75",
                              borderBottom: "solid 2px #18b6ee",
                            }}
                          >
                            {t("Certificate")}
                          </span>
                        </div>
                        <span
                          className=" mt-3"
                          style={{
                            marginTop: "15px",
                            textAlign: "center",
                            color: "white",
                            display: "block",
                            fontSize: "14px",
                            fontFamily: "Helvetica_Neue_LT_GEO_55",
                            fontWeight: "200",
                          }}
                        >
                          {t("Confirms that")}
                        </span>
                        <span
                          className=""
                          style={{
                            display: "block",
                            textAlign: "center",
                            color: "#18b6ee",
                            fontSize: "16px",
                          }}
                        >
                          {lang === "ka"
                            ? certInfo?.cert?.name_ka
                            : certInfo?.cert?.name_en}
                        </span>
                        <span
                          className=""
                          style={{
                            display: "block",
                            textAlign: "center",
                            color: "white",
                            fontSize: "14px",
                          }}
                        >
                          {t("წარმატებით გაიარა სასწავლო კურსები")}
                        </span>
                        <div style={{ color: "white", marginTop: "30px" }}>
                          {lang === "ka" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: certInfo?.cert?.text_ka?.replace(
                                  /\n/g,
                                  "",
                                ),
                              }}
                            />
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: certInfo?.cert?.text_en?.replace(
                                  /\n/g,
                                  "",
                                ),
                              }}
                            />
                          )}
                        </div>
                        <div className="row mt-4" style={{ marginTop: "20px" }}>
                          <div className="col-6">
                            <span
                              className=""
                              style={{ display: "block", color: "white" }}
                            >
                              {t("salome mgeladze")}
                              <img
                                className="ms-2"
                                style={{
                                  height: "25px",
                                  width: "auto",
                                  filter: "brightness(3.5)",
                                }}
                                src={(sign as any).src}
                              />
                            </span>
                            <span className="" style={{ color: "white" }}>
                              {t("რესქულის")}{" "}
                              <span style={{ color: "#18b6ee" }}>
                                {t("founder")}
                              </span>
                            </span>
                          </div>
                          <div className="col-6">
                            <span
                              className=""
                              style={{ display: "block", color: "white" }}
                            >
                              {t("Certificate N")}:
                            </span>
                            <span className="" style={{ color: "#18b6ee" }}>
                              #{certInfo?.cert?.code}
                            </span>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-6">
                            <span
                              className=""
                              style={{ display: "block", color: "white" }}
                            >
                              {t("Issue Date")}:
                            </span>
                            <span className="" style={{ color: "#18b6ee" }}>
                              {lang === "ka"
                                ? certInfo?.cert?.issuedate_ka
                                : certInfo?.cert?.issuedate_en}
                            </span>
                          </div>
                          <div className="col-6">
                            <span
                              className=""
                              style={{ display: "block", color: "white" }}
                            >
                              {t("check certificate")}:
                            </span>
                            <span className="" style={{ color: "#18b6ee" }}>
                              https://reschool.world
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4" onClick={handlePrint}>
                      <span
                        style={{
                          fontFamily: "Helvetica_Neue_LT_GEO_55",
                          fontFeatureSettings: "'case' on",
                          fontWeight: "100",
                          borderBottom: "1px solid rgb(170, 82, 139)",
                          padding: "15px 30px",
                          background:
                            "linear-gradient(to right, rgb(18 194 233), rgb(196 113 237), rgb(246 79 89))",
                          borderRadius: "7px",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {t("Download")}
                        <img
                          className="ms-2"
                          style={{ width: "20px" }}
                          src={(dload as any).src}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {isVisible2 && (
          <section>
            <div className="container">
              <div
                style={{
                  background: "#000",
                  padding: "30px 30px",
                  marginBottom: "8px",
                  borderRadius: "10px",
                  color: "#FFF",
                }}
                key={module.id}
              >
                <table
                  className="CERTTABLE"
                  style={{
                    width: "100%",
                    fontFeatureSettings: "'case' on",
                    textAlign: "center",
                    background: "#000",
                    fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                    fontSize: "16px",
                    color: "#FFF",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#000",
                        fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#FFF",
                      }}
                    >
                      <th>{t("სასწავლო კურსი")}</th>
                      <th>{t("კურსის სტატუსი")}</th>
                      <th>{t("მენტორი")}</th>
                      <th>{t("საათების რაოდენობა")}</th>
                      <th>{t("ჩატარების თარიღები")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certInfo?.certinfo?.map((item: any) => {
                      return (
                        <tr
                          style={{
                            background: "#000",
                            fontFamily: "Helvetica_Neue_LT_GEO_55, serif",
                            fontSize: "16px",
                            color: "#FFF",
                          }}
                          key={item.id}
                        >
                          <td>
                            {lang === "ka" ? item?.course_ka : item?.course_en}
                          </td>
                          <td>
                            {lang === "ka" ? item?.status_ka : item?.status_en}
                          </td>
                          <td>
                            {lang === "ka" ? item?.mentor_ka : item?.mentor_en}
                          </td>
                          <td>
                            {lang === "ka" ? item?.hours_ka : item?.hours_en}
                          </td>
                          <td>
                            {lang === "ka" ? item?.dates_ka : item?.dates_en}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CertContainer;
