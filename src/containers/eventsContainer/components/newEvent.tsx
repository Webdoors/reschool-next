
import { url } from 'inspector'
import { event_images } from '../../../api/endPoints'
import image from '../../../img/event.png'
import { PropsFn } from '../../../models/propsFn'
//  style={{ backgroundImage: `url(${image})`}}
const NewEvent: React.FC<{title: string, imageName: string, date: string, time: string, regClicked: PropsFn}>=(props)=>{
    return       <div className="col-lg-6" style={{marginTop: '60px', color: '#fff'}} >
    <div className="item md-mb50 wow fadeInUp" data-wow-delay=".5s">
      <div className="img" >
        <img  style={{height: '334.12px'}} src={`${event_images}${props.imageName}`} alt="" />
      </div>
      <div className="cont">
        <div>
          <div className="info">
            <a  type='button' className="date event-date">
              <span style={{color: '#12c2e9'}} >
              {props.date}
              </span>
            </a>
            <span>/</span>
            <a  type='button' className="tag event-date">
              <span>{props.time}</span>
            </a>
          </div>
          <h5>
            <a type='button'>
            {props.title}
            </a>
          </h5>
          <div className="btn-more">
            <a type='button'  onClick={props.regClicked}  className="simple-btn">
            რეგისტრაცია
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default NewEvent