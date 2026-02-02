import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RegisterModal from "../../components/register-modal/registerModal";
import { EventModel } from "../../models/event";
import { getEvents } from "../../store/admin/admin-effects";
import { AppDispatch, RootState } from "../../store/reducer";
import { useRouter } from "next/navigation";
import NewEvent from "./components/newEvent";

import { useState } from "react";
import Overlay from "../../ui/overlay/overlay";
import { adminActions } from "../../store/admin/admin-slice";
// import { UsbFill } from "react-bootstrap-icons"
const EventsContainer: React.FC<{}> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [chosenEvent, setChosenEvent] = useState<EventModel>();
  const [regMode, setRegMode] = useState<boolean>(false);
  const participantAdded = useSelector(
    (state: RootState) => state.admin.participantAdded,
  );
  const router = useRouter();
  const closeModalHandler = () => {
    setRegMode(false);
    setChosenEvent(undefined);
    dispatch(adminActions.toggleParticipantAdded(false));
  };
  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/");
    }
  });

  const dispatch = useDispatch<AppDispatch>();
  const registerForEventHandler = (event: EventModel) => {
    setChosenEvent(event);
    setRegMode(true);
  };
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const events = useSelector((state: RootState) => state.admin.events);

  const allEvents = events?.map((eventItem: EventModel, i) => {
    return (
      <NewEvent
        regClicked={() => registerForEventHandler(eventItem)}
        key={i + eventItem._id}
        title={eventItem.title}
        date={eventItem.date}
        time={eventItem.time}
        imageName={eventItem.imageName}
      />
    );
  });

  return (
    <div className="main-content">
      {regMode ? (
        <RegisterModal
          success={participantAdded}
          closeModal={closeModalHandler}
          chosenEvent={chosenEvent}
        />
      ) : (
        ""
      )}
      <Overlay show={regMode} overlayClicked={closeModalHandler} />
      {/* ==================== End clients Brands ==================== */}
      {/* ==================== Start Blog ==================== */}
      <section className="blog section-padding sub-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="sec-head  text-center">
                <h6 className="wow fadeIn" data-wow-delay=".5s">
                  {/* RECENT ARTICLES */}
                </h6>
                <h3 className="wow color-font">საჯარო შეხვედრები</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {allEvents.length ? (
              allEvents
            ) : (
              <div style={{ height: "50vh" }}>
                <h2 style={{ color: "#fff", textAlign: "center" }}>
                  შეხვედრები მალე დაემატება...
                </h2>
              </div>
            )}
            {/* <NewEvent/>
            <NewEvent/>
            <NewEvent/>
            <NewEvent/> */}
          </div>
        </div>
      </section>
      {/* ==================== End Blog ==================== */}
      {/* ==================== Start call-to-action ==================== */}
    </div>
  );
};

export default EventsContainer;
