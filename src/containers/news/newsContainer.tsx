import aboutImage1 from "../../img/about/1.jpeg";

import React, {useEffect, useState} from "react";
import { Womans } from "../../models/womans";
import DirectionCard from "../../components/course/direction-card";
import {ApiService} from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import {useTranslation} from "react-i18next";
import {img_route} from "../../api/endPoints";
import {useParams} from "react-router-dom";
const NewsContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [name, setName] = useState<Womans>(Womans.MINADORA);
  const [aboutInfo, setAboutInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber:number) => {
    setActiveTab(tabNumber);
  };
  useEffect(() => {
    // Fetch certificate information
    ApiService.apiCall(EndPoints.GET_NEWS)
        .then((res:any) => {
          console.log("res",res)
          setAboutInfo(res?.data);
          // You can also dispatch an action here if needed
          // dispatch(yourAction(res?.data?.data?.data));
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);

        });
  }, []);
console.log("es",aboutInfo?.news)
  return (
      <div className="wrapper circle-bg py-4 LIGHTS" style={{marginTop: "50px"}}>
        <section className={"serv-arch "} style={{borderRadius: "20px"}} data-scroll-index={1}>
          <div className={"container"}
               style={{
                 background: "#262525",
                 borderRadius: "30px",
                 marginTop: "80px",
                 padding:"20px",
                 overflow: "hidden"
               }}>
            <div className="cont text-center row BGABOUT" style={{
              background: "url('/img/aboutmain.jpeg')", height: "400px",
              backgroundSize: "100%",
              borderRadius:"16px",
              margin:"0px",
              marginBottom:"20px",
              backgroundPosition: "0px -267px",
              backgroundRepeat: "no-repeat"
            }}>
              <div className="col-12 px-0 text-left">
                <div className="" style={{
                  width: '50%',
                  color: '#FFF',
                  position: 'relative',
                  textAlign: 'left',
                  transform: 'translateY(-50%)',
                  paddingLeft: '54px',
                  display: "none",
                  top: '50%',
                  fontSize: '28px',
                  fontFamily: 'Helvetica_Neue_LT_GEO_55',
                  fontFeatureSettings: "'case' on"
                }}>
                  <div>ჩვენი მიზანია</div>
                  <div>ტექნოლოგიების მომხმარებლები</div>
                  <div>მათ შემქმნელებად ვაქციოთ</div>
                  <div className="my-3" style={{
                    width: "100px",
                    background: 'linear-gradient(to right, rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89))',
                    height: "1px"
                  }}></div>
                  <div style={{fontSize: "14px"}}>რესქული</div>
                </div>
              </div>
            </div>
            <div className="row" style={{
              color: "#f1f1f1",
              marginBottom:"20px",
              fontFamily: 'Helvetica_Neue_LT_GEO_55',
              background: "#000",
              display:"none",
              fontFeatureSettings: "'case' on"
            }}>
              <div
                  className={`col-12 col-sm-4 add-hover cursor-pointer text-center py-4 ACTIVEME TAB TAB1${activeTab === 1 ? ' active-tab' : ''}`}
                  onClick={() => handleTabClick(1)}>Software Engineering
              </div>
              <div
                  className={`col-12 col-sm-4 text-center cursor-pointer add-hover py-4 TAB TAB2${activeTab === 2 ? ' active-tab' : ''}`}
                  onClick={() => handleTabClick(2)}
                  style={{borderLeft: "solid 1px #12C2E9", borderRight: "solid 1px #F64F59"}}>UI/UX Design
              </div>
              <div
                  className={`col-12 col-sm-4 text-center cursor-pointer py-4 add-hover TAB TAB3${activeTab === 3 ? ' active-tab' : ''}`}
                  onClick={() => handleTabClick(3)}>Artificial Inteligence
              </div>
            </div>
            <div className={"row"}>
            <div className={"col-12"}>
              <div className={"row"}>
                {
                  aboutInfo?.news?.map((req: any, i: number) => {
                    return <a href={`/${lang}/article/${lang === 'ka' ? req.slug_ka : req.slug_en}`} className={"col-12 col-sm-4 mb-3"}>
                      <div className={"row"}>
                        <div className={"col-12"}>

                          {lang === 'ka' ? (
                              <div className="cont text-center row" style={{
                                background: `url(${img_route}${req?.photo_ka})`, height: "300px",
                                backgroundSize: "cover",
                                borderRadius: "16px",
                                marginBottom: "20px",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                margin: "auto"
                              }}>
                              </div>
                          ) : (
                              <div className="cont text-center row BGABOUT" style={{
                                background:`url(${img_route}${req?.photo_en})`, height: "300px",
                                backgroundSize: "cover",
                                borderRadius: "16px",
                                marginBottom: "20px",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                margin: "auto"
                              }}>
                              </div>
                          )}
                        </div>
                        <div style={{color: "#40A6F2"}} className={"col-12"}>
                          {lang === 'ka' ? (
                              <div dangerouslySetInnerHTML={{__html: req?.category_ka}}/>
                          ) : (
                              <div dangerouslySetInnerHTML={{__html: req?.category_en}}/>
                          )}
                        </div>
                        <div style={{fontWeight: "bold", color: "#fff",margin:"10px 0px 5px 0px ","height":"50px"}} className={"col-12"}>
                          {lang === 'ka' ? (
                              <div dangerouslySetInnerHTML={{__html: req?.title_ka}}/>
                          ) : (
                              <div dangerouslySetInnerHTML={{__html: req?.title_en}}/>
                          )}
                        </div>
                        {/*<div style={{color: "#B1B1B1",margin:"0px 0px 5px 0px",minHeight:"30px"}} className={"col-12"}>*/}
                        {/*  {lang === 'ka' ? (*/}
                        {/*      <div dangerouslySetInnerHTML={{__html: req?.text_ka?.replace(/<[^>]*>?/gm, '').slice(0, 150)}}/>*/}
                        {/*  ) : (*/}
                        {/*      <div dangerouslySetInnerHTML={{__html: req?.text_en?.replace(/<[^>]*>?/gm, '').slice(0, 150)}}/>*/}
                        {/*  )}*/}
                        {/*</div>*/}
                        <div style={{color: "#B1B1B1"}} className={"col-12"}>
                          <small>
                            {lang === 'ka' ? (
                                <div dangerouslySetInnerHTML={{__html: req?.date}}/>
                            ) : (
                                <div dangerouslySetInnerHTML={{__html: req?.date}}/>
                            )}
                          </small>
                        </div>
                      </div>
                    </a>
                  })
                }




              </div>
            </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default NewsContainer;