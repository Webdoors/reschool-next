
import { url } from 'inspector'
import image from '../../../img/event.png'

const Event: React.FC<{}>=()=>{
    return    <div className="col-lg-4 wow fadeInUp" data-wow-delay=".9s" style={{marginTop: '60px'}} >
    <div className="item bg-img"     style={{ backgroundImage: `url(${image})`}} data-background='../../../img/event.png'>
      <div className="cont">
        <a href='#' className="date">
          <span><i>06</i> Aug 2019</span>
        </a>
        {/* <div className="info">
          <a href="#0" className="author">
            <span>by / Admin</span>
          </a>
          <a href="#0" className="tag">
            <span>WordPress</span>
          </a>
        </div> */}
        <h6>
          <a href="#">პროგრამირების სასწავლებლად საჭირო ნაბიჯები</a>
        </h6>
        <div className="btn-more">
          <a href="#0" className="simple-btn">რეგისტრაცია</a>
        </div>
      </div>
    </div>
  </div>
}

export default Event