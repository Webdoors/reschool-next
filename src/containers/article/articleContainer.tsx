import React, {useEffect, useState} from "react";
import { Womans } from "../../models/womans";
import DirectionCard from "../../components/course/direction-card";
import {ApiService} from "../../api/api.service";
import * as EndPoints from "../../api/endPoints";
import {useTranslation} from "react-i18next";
import { useParams, useHistory } from 'react-router-dom';
import { AppDispatch } from '../../store/reducer'; // Replace with your actual import
import { useDispatch } from 'react-redux';
import {img_route} from "../../api/endPoints";
const ArticleContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [name, setName] = useState<Womans>(Womans.MINADORA);
  const [aboutInfo, setAboutInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const { slug } = useParams<{ slug: string }>();
  const handleTabClick = (tabNumber:number) => {
    setActiveTab(tabNumber);
  };
  useEffect(() => {
    // Fetch certificate information
    ApiService.apiCall(EndPoints.GET_ARTICLE,slug)
        .then((res:any) => {
          console.log("res",res)
          setAboutInfo(res?.data);
          // You can also dispatch an action here if needed
          // dispatch(yourAction(res?.data?.data?.data));
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);

        });
  }, [slug, dispatch, history]);
console.log("aboutInfo",aboutInfo)
  return (
      <div className="wrapper circle-bg py-4 LIGHTS" style={{marginTop: "50px"}}>
        <section className={"serv-arch "} style={{borderRadius: "20px"}} data-scroll-index={1}>
            <div className={"container"}
                 style={{
                     background: "#100F0F",
                     borderRadius: "30px",
                     marginTop: "80px",
                     padding: "20px",
                     overflow: "hidden"
                 }}>
                <div style={{color: "#40A6F2", textAlign: "center", marginBottom: "20px"}}>{t("Published")} &nbsp;
                    {aboutInfo?.article?.date}</div>
                <h1 style={{color: "#FFF", textAlign: "center", fontWeight: "bold"}}>
                    {lang === 'ka' ? (
                        <div dangerouslySetInnerHTML={{__html: aboutInfo?.article?.title_ka}}/>
                    ) : (
                        <div dangerouslySetInnerHTML={{__html: aboutInfo?.article?.title_en}}/>
                    )}

                </h1>
                <div style={{color: "#B1B1B1", textAlign: "center", marginBottom: "40px"}}><small>
                   </small></div>

                <img src={`${img_route}${lang === 'ka' ? aboutInfo?.article?.photo_ka :aboutInfo?.article?.photo_en}`} style={{borderRadius: "16px",position:"relative",height:"auto",display:"inline-block",width:"98%",left:"50%",transform:"translateX(-50%)"}}
                     alt="sss"/>
                <div className="row" style={{
                    color: "#f1f1f1",
                    marginBottom: "20px",
                    fontFamily: 'Helvetica_Neue_LT_GEO_55',
                    background: "#000",
                    fontFeatureSettings: "'case' on"
                }}>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <div style={{color: "#B1B1B1", margin: "30px 0%", textAlign: "justify"}} className={"row"}>
                            {lang === 'ka' ? (
                                <div dangerouslySetInnerHTML={{__html: aboutInfo?.article?.text_ka?.replace(/\n/g, '<br />')}}/>
                            ) : (
                                <div dangerouslySetInnerHTML={{__html:aboutInfo?.article?.text_en?.replace(/\n/g, '<br />')}}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
  );
};

export default ArticleContainer;