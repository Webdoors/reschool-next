import { img_route } from "../../api/endPoints";
import { ModuleModel } from "../../models/moduleModel";
import ResponsiveImage from "../../ui/image/image";
import React from "react";
import { useTranslation } from "react-i18next";

const ModuleCard: React.FC<{
  moduleClicked: (module: ModuleModel) => any;
  module: ModuleModel;
  index: number;
}> = (props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const moduleClickHandler = () => {
    props.moduleClicked(props.module);
  };

  if (!isMounted) return null;

  return (
    <div
      onClick={moduleClickHandler}
      className={` item2 bg-img serv-arch-mob text-center`}
      data-background="img/module.png"
      style={{ cursor: "pointer" }}
    >
      <ResponsiveImage
        style={{
          width: "120px",
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        link={`${img_route}${props.module.photo}`}
        name={props.module.name_ka || "module"}
        width={120}
        height={120}
        unoptimized
      />
      <h6
        style={{ fontSize: "15px", color: "#fff" }}
        className="numb font_sz60"
      >
        {lang === "ka" ? (
          <>{props.module.name_ka} </>
        ) : (
          <>{props.module.name_en} </>
        )}
      </h6>
      <h5 className="text-white mt-4 d-none" style={{ fontSize: "17px" }}>
        მოდული
      </h5>
      <p className={`my-0 `} style={{ fontSize: "14px" }}></p>
      {/*  <a href="#0" className="custom-font more main-color">
      Read More
    </a> */}
    </div>
  );
};

export default ModuleCard;
