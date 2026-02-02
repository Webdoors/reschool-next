import {  img_route_courses } from "../../api/endPoints";
import bg from "../../img/direction.png";
import { DirectionModel } from '../../models/directionModel';
import {useTranslation} from "react-i18next";



const DirectionCard: React.FC<{directionClicked: (direction: DirectionModel)=>any,direction: DirectionModel, index: number}> = (props)=>{
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const directionClickHandler = ()=>{
        props.directionClicked(props.direction)
    }


    return    <div
    onClick={directionClickHandler}
    className={`item bg-img serv-arch-mob`}
    style={{
      cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }} 
  >

    <h6 style={{fontSize: '80px',color:'#FFF'}} className="text-center numb text-white font_sz60">{props.direction.name_ka}{/*props.index*/}  </h6>
    <h5 className="text-white text-center" style={{fontSize:"17px"}}>{t("age category")}</h5>
    <p className={`my-0 `} style={{fontSize: '14px'}}>
  
    </p>
    {/*  <a href="#0" className="custom-font more main-color">
      Read More
    </a> */}
  
  </div>
}


export default DirectionCard