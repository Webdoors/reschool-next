import React, { useEffect, useState } from "react";
import Loading from "../../ui/loading";
import Overlay from "../../ui/overlay/overlay";

import "./payment-modal.css";
import ShowIf from "../../utils/showIf";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/reducer";
import { useDispatch } from "react-redux";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { addStudentToGroup } from "../../store/courses/courses-effects";
import { coursesAction } from "../../store/courses/courses.slice";
export const PaymentModal: React.FC<{
  loading?: boolean;
  closePaymentModal: () => void;
  courseName?: string;
  error: string;
}> = (props) => {
  // const user = useSelector((state: RootState)=> state.auth.user)

  // function useQuery() {
  //     const { search } = useLocation();

  //     return React.useMemo(() => new URLSearchParams(search), [search]);
  //   }

  const query = useSearchParams();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [requestSended, setRequestSended] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [trId, setTrId] = useState("");
  useEffect(() => {
    let groupId = params?.id;
    const user = localStorage.getItem("user");
    const trsId = localStorage.getItem("trs");

    // {"transactionUrl":"https://payze.io/api/redirect/transaction/172E81E359E8449799766949645BAB96","transactionId":"172E81E359E8449799766949645BAB96"}

    if (user && user !== "undefined" && trsId && trsId !== "undefined") {
      let parsesTrs = JSON.parse(trsId);

      if (!requestSended) {
        console.log("request sended");
        dispatch(coursesAction.transactionSuccess({} as any));
        dispatch(addStudentToGroup(groupId, parsesTrs.transactionId));
      }

      setRequestSended(true);
    }

    if (trsId && trsId !== "undefined") {
      setTrId(trsId);
    } else {
      setTrId("");
    }
  }, [requestSended]);

  const closeHandler = () => {
    props.closePaymentModal();
    localStorage.removeItem("groupId");
    router.push("/profilesc");
  };

  return (
    <React.Fragment>
      {trId ? <Overlay overlayClicked={closeHandler} show={true} /> : ""}
      {trId ? (
        <div className="pmodal">
          <ShowIf if={props.loading && !props.error}>
            <Loading />
          </ShowIf>

          <ShowIf if={props.error ? true : false}>
            <div onClick={closeHandler} className="pmessage">
              {props.error || "კურსზე დამატება ვერ მოხერხდა"}
              <div className="picon btn-danger">
                OK
                {/* <MdOutlineDoneOutline color='12c2e9' size={40} /> */}
              </div>
            </div>
          </ShowIf>

          <ShowIf if={!props.loading && !props.error}>
            <div onClick={closeHandler} className="pmessage">
              გილოცავთ, თქვენ წარმატებით დარეგისტრირდით კურსზე
              <h3 className="pcourse_name">{props.courseName}</h3>
              <div className="picon btn-success">
                OK
                {/* <MdOutlineDoneOutline color='12c2e9' size={40} /> */}
              </div>
            </div>
          </ShowIf>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default PaymentModal;
