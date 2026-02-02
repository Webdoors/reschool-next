import { BsLightningCharge } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { ImMagicWand } from "react-icons/im";
import { IoIosCube } from "react-icons/io";
import { img_route_courses, img_route_icons } from "../../api/endPoints";
//import courseImage from "../../img/blog/2.jpg";
import { DirectionModel } from "../../models/directionModel";
import { PropsFn } from "../../models/propsFn";
import IconImage from "../../ui/iconImage/iconImage";
import Background from "../../img/reschool-background.png";
import asset1 from "../../img/ban1.png";
import asset2 from "../../img/ban2.png";
import ResponsiveImage from "../../ui/image/image";

const DirectionCardHome: React.FC<{
  directionClicked: (direction: DirectionModel) => any;
  direction: DirectionModel;
  index: number;
}> = (props) => {
  const directionClickHandler = () => {
    props.directionClicked(props.direction);
  };

  return (
    <div
      onClick={directionClickHandler}
      style={{
        cursor: "pointer",
        // backgroundImage: "url(" + (props.direction.name=="9-11"?asset2:asset1) + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="col-lg-6 col-md-6 items courses-s md-mb30 p-0"
    >
      <div className="item wow fadeIn" data-wow-delay=".3s">
        <span
          className="icon"
          style={{
            marginBottom: props.direction.name_ka == "9-11" ? "" : "37px",
          }}
        >
          {/* <i className="ion-ios-monitor" /> */}

          {/* {  props.index ===0 ? <FiMonitor  />: 
      props.index ===1? 
      <BsLightningCharge/>:   props.index ===2?    <IoIosCube/>
    :    <ImMagicWand/> }  */}
          <ResponsiveImage
            link={props.direction.name_ka == "9-11" ? asset1.src : asset2.src}
            name="direction icon"
            style={{ transform: "scale(1)" }}
          />
        </span>
        {/*<h6 style={{fontSize: '44px',fontFamily:"BrownLLC"}} className="numb font_sz60 text-white">{props.direction.name} </h6>*/}
        <p></p>
        <a onClick={directionClickHandler} className="more-stroke">
          <span />
        </a>
      </div>
    </div>
  );
};

export default DirectionCardHome;
