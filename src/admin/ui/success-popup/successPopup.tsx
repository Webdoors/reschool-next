import { MdOutlineDoneAll } from "react-icons/md"
import { PropsFn } from "../../../models/propsFn"


export const SuccessPopup: React.FC<{showPopup?: boolean, closeModal?: PropsFn }> = (props)=> {
    return  <div className={`modal fade ${props.showPopup?'show-succes show': 'hide'}`} id="success-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-body text-center font-18">
          <h3 className="mb-20">UPDATED</h3>
          <div className="mb-30 text-center"><MdOutlineDoneAll  size={'50px'} color='green' /></div>
    მონაცემები წარმატებით განახლდა
        </div>
        <div className="modal-footer justify-content-center">
          <button onClick={props.closeModal} type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>


}


export default SuccessPopup