"use client";
import React, { useEffect, Suspense } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import NavComponent from "../components/nav/nav";
import FooterComponent from "../components/footer/footer";
import Overlay from "../ui/overlay/overlay";
import SignUpContainerNew from "../containers/user/signup/signup_new";
import { useSelector } from "react-redux";
import { RootState, useStateDispatch } from "../store/reducer";
import { authActions } from "../store/auth/auth-slice";
import {
  startFetchingCourses,
  startFetchingDirections,
  startFetchingGroups,
  startFetchingMentors,
} from "../store/courses/courses-effects";
import ShowIf from "../utils/showIf";
import PaymentModal from "../components/payment/payment-modal";
import { coursesAction } from "../store/courses/courses.slice";
import { getEvents } from "../store/admin/admin-effects";
import "../i18n";
import { useTranslation } from "react-i18next";
import cookie from "react-cookies";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter(); // For history replacement if needed
  const dispatch = useStateDispatch();

  const showRegistrationModal = useSelector(
    (state: RootState) => state.auth.showRegistrationModal,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const paymentModalLoading = useSelector(
    (state: RootState) => state.coursesState.paymentModalLoading,
  );
  const showPaymentModal = useSelector(
    (state: RootState) => state.coursesState.showPaymentModal,
  );
  const showUpdateModal = useSelector(
    (state: RootState) => state.auth.showUpdateModal,
  );
  const purchasedCouseName = useSelector(
    (state: RootState) => state.coursesState.purchasedCourseName,
  );
  const addingStudentToGroupError = useSelector(
    (state: RootState) => state.coursesState.addingStudentToGroupError,
  );

  const { t, i18n } = useTranslation();

  // Language sync
  useEffect(() => {
    // In Next.js with [lang] route, params.lang should be available
    // But if we are in root / (redirect fallback), might not be.
    // Assuming structure is app/[lang]/...
    const languageCode = params?.lang as string;

    if (languageCode && languageCode !== i18n.language) {
      i18n.changeLanguage(languageCode);
    }
  }, [params?.lang, i18n]);

  // Initial Fetching
  useEffect(() => {
    dispatch(startFetchingGroups());
    mouseCursor();
    dispatch(startFetchingCourses(router)); // Passed router instead of history
    dispatch(startFetchingMentors(router));
    dispatch(startFetchingDirections(router));
    dispatch(getEvents());
  }, [dispatch, router]);

  // CSRF Token
  useEffect(() => {
    const csrf: string = cookie.load("csrf-token") || "";
    // dispatch(authActions.cTokenAdded(csrf))
  }, [dispatch]);

  // Auth check
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr && userStr !== "undefined") {
      let parsed = JSON.parse(userStr);
      dispatch(authActions.authenticationSuccess({ user: parsed }));
    }
  }, [dispatch]);

  // Transaction info
  useEffect(() => {
    const trs = localStorage.getItem("trs");
    if (trs && trs !== "undefined") {
      dispatch(coursesAction.transactionInfoAdded(JSON.parse(trs)));
    }
  }, [dispatch]);

  const mouseCursor = () => {
    let pointerHs: any = document.querySelectorAll("a, .add-hover");
    const innerCursor: any = document.querySelector(".cursor-inner");
    const outerCursor: any = document.querySelector(".cursor-outer");
    let n,
      i = 0;

    window.addEventListener("mousemove", mouseMove);

    function mouseMove(s: any) {
      if (!outerCursor || !innerCursor) return;

      outerCursor.style.transform =
        "translate(" + s.clientX + "px, " + s.clientY + "px)";
      innerCursor.style.transform =
        "translate(" + s.clientX + "px, " + s.clientY + "px)";
      n = s.clientY;
      i = s.clientX;
      if (outerCursor.style.visibility !== "visible") {
        outerCursor.style.visibility = "visible";
        innerCursor.style.visibility = "visible";
      }

      let pnNew = document.querySelectorAll("a, .add-hover");

      if (pointerHs.length !== pnNew?.length) {
        pointerHs = pnNew;
      }
    }

    // Note: logic to add listeners to new elements needs MutationObserver or periodic check in React routing.
    // For now keeping simpler version from App.tsx which might only attach once.
    if (pointerHs) {
      pointerHs.forEach((el: any) => {
        el.addEventListener("mouseenter", (_event: any) => {
          if (
            outerCursor &&
            innerCursor &&
            (!outerCursor.classList.contains("cursor-hover") ||
              !innerCursor.classList.contains("cursor-hover"))
          ) {
            innerCursor.classList.add("cursor-hover");
            outerCursor.classList.add("cursor-hover");
          }
        });
        el.addEventListener("mouseleave", (_event: any) => {
          _event.stopPropagation();
          if (
            outerCursor &&
            innerCursor &&
            (outerCursor.classList.contains("cursor-hover") ||
              innerCursor.classList.contains("cursor-hover"))
          ) {
            innerCursor.classList.remove("cursor-hover");
            outerCursor.classList.remove("cursor-hover");
          }
        });
      });
    }
  };

  return (
    <div
      className={"App"}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="mouse-cursor cursor-outer cursor-remove"></div>
      <div className="mouse-cursor cursor-inner cursor-remove"></div>

      <NavComponent />

      <ShowIf if={showRegistrationModal || showUpdateModal}>
        <React.Fragment>
          <SignUpContainerNew
            updateMode={showUpdateModal}
            user={showUpdateModal ? user : null}
            showModal={showRegistrationModal || showUpdateModal}
            modalMode={true}
          />
          <Overlay
            show={showRegistrationModal || showUpdateModal}
            overlayClicked={() =>
              dispatch(authActions.toggleRegistrationModal(false))
            }
          />
        </React.Fragment>
      </ShowIf>

      <main style={{ flex: 1 }}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>

      {showPaymentModal && (
        <Suspense fallback={null}>
          <PaymentModal
            error={addingStudentToGroupError}
            courseName={purchasedCouseName}
            loading={paymentModalLoading}
            closePaymentModal={() =>
              dispatch(coursesAction.closePaymentModal())
            }
          />
        </Suspense>
      )}

      <FooterComponent />
    </div>
  );
}
