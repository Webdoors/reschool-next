import aboutImage1 from "../../img/about/1.jpeg";
import aboutImage2 from "../../img/about/2.jpeg";
import aboutImage3 from "../../img/about/3.jpg";
import logo3 from "../../img/logo3.png";
import logo2 from "../../img/reinvent.png";
import backblack from "../../img/backblack.png";
import React, { useState } from "react";
import { Womans } from "../../models/womans";
import DirectionCard from "../../components/course/direction-card";
const AboutContainer: React.FC = () => {
  const [name, setName] = useState<Womans>(Womans.MINADORA);

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
            background: "#000",
            borderRadius: "30px",
            marginTop: "80px",
            padding: "0rem 0rem 0rem 0rem",
            overflow: "hidden",
          }}
        >
          <div
            className="cont text-center row"
            style={{
              background: "url('/img/about1.png')",
              height: "400px",
              backgroundSize: "auto",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="col-12 px-0 text-left">
              <div
                className=""
                style={{
                  width: "50%",
                  color: "#FFF",
                  position: "relative",
                  textAlign: "left",
                  transform: "translateY(-50%)",
                  paddingLeft: "54px",
                  top: "50%",
                  fontSize: "28px",
                  fontFamily: "Helvetica_Neue_LT_GEO",
                  fontFeatureSettings: "'case' on",
                }}
              >
                <div>ჩვენი მიზანია</div>
                <div>ტექნოლოგიების მომხმარებლები</div>
                <div>მათ შემქმნელებად ვაქციოთ</div>
                <div
                  className="my-3"
                  style={{
                    width: "100px",
                    background:
                      "linear-gradient(to right, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89))",
                    height: "1px",
                  }}
                ></div>
                <div style={{ fontSize: "14px" }}>რესქული</div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              background: "#000",
              color: "#f1f1f1",
              fontFamily: "Helvetica_Neue_LT_GEO",
              fontFeatureSettings: "'case' on",
            }}
          >
            <div className="col-4 text-center py-4 ACTIVEME">ჩვენს შესახებ</div>
            <div
              className="col-4 text-center py-4"
              style={{
                borderLeft: "solid 1px #12C2E9",
                borderRight: "solid 1px #F64F59",
              }}
            >
              რატომ რესქული?
            </div>
            <div className="col-4 text-center py-4">ჩვენი პროექტები</div>
          </div>
          <div
            className="row AFTER my-5"
            style={{
              color: "#f1f1f1",
              fontFamily: "Helvetica_Neue_LT_GEO",
              fontFeatureSettings: "'case' on",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "140px" }}
              src={(logo2 as any).src}
              alt="logo2"
            />
            <img
              style={{ width: "140px" }}
              src={(logo3 as any).src}
              alt="logo"
            />
          </div>
          <div
            className="row  my-5 px-5"
            style={{
              color: "#f1f1f1",
              fontFamily: '"Helvetica_Neue_LT_GEO", serif',
              fontFeatureSettings: "'case' on",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="col-9 text-center">
              {" "}
              რე:სქული რე:ინვენთ ჰოლდინგის საგანმანათლებლო პლატფორმაა და ფარავს
              9-დან 15-წლამდე ასაკს. ეს არის არაფორმალური განათლების სივრცე,
              სადაც თავად ინოვაციური პროექტების შემქმნელები, პრაქტიკოსი
              კვალიფიციური მენტორები ასწავლიან ბავშვებს ყველაზე მოთხოვნად
              ტექნოლოგიურ პროფესიებს. აქ სრულად ვპასუხობთ მომავლის გამოწვევებს
              და 21-ე საუკუნის შრომის ბაზრის მოთხოვნებს.
            </div>
          </div>
          <div
            className="row  my-5 "
            style={{
              padding: "0px 10%!important",
              color: "#f1f1f1",
              fontFamily: '"Helvetica_Neue_LT_GEO", serif',
              fontFeatureSettings: "'case' on",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="col-7">
              რე:სქულის თბილისის ფილიალი ფუნქციონირებს 2022 წლიდან. 2023 წლიდან
              თბილისის ფილიალს შეემატა ბათუმის ფილიალი. რე:სქულში სწავლება
              ხორციელდება ბავშვების ორ 9-11 და 12-15 ასაკობრივ ჯგუფებზე ოთხი
              ძირითადი მიმართულებით:
              <ul className="LEES mt-4">
                <li>ვებ პროგრამირება (FRONT-END) – 9 წლიდან,</li>
                <li>თამაშების შექმნა- 12 წლიდან,</li>
                <li>UI/UX დიზაინი- 12 წლიდან,</li>
                <li>გრაფიკული და ვებ დიზაინი - 9 წლიდან.</li>
              </ul>
            </div>
            <div className="col-5">
              <img src={(aboutImage1 as any).src} alt="sss" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContainer;
