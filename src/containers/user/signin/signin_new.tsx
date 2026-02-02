import background from "../../../img/about/signin-back.jpeg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { startAuthentication } from "../../../store/auth/auth-effects";
import { AppDispatch, RootState } from "../../../store/reducer";
import { useEffect, useRef } from "react";
import { authActions } from "../../../store/auth/auth-slice";
import styles from "./sign_new.module.css";
import { IoCloseSharp } from "react-icons/io5";
import ShowIf from "../../../utils/showIf";
export const SignInNew: React.FC<{
  modalMode?: boolean;
  closeModal?: () => void;
}> = (props) => {
  const router = useRouter();
  const password = useRef<HTMLInputElement | null>(null);
  const phone = useRef<HTMLInputElement | null>(null);
  const cToken = useSelector((state: RootState) => state.auth.c_token);
  const error = useSelector((state: RootState) => state.auth.error);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch: AppDispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.LoggedIn);
  const formSubmited = (form: React.FormEvent) => {
    form.preventDefault();
    if (password && phone) {
      dispatch(
        startAuthentication(
          phone.current?.value as string,
          String(password.current?.value),
          cToken,
        ),
      );
    }
  };

  const changeHandler = () => {
    if (error) {
      dispatch(authActions.clearAuthError({}));
    }
  };

  useEffect(() => {
    if (isLoggedIn && !props.modalMode) {
      router.push("/");
    } else if (props.modalMode && isLoggedIn) {
      dispatch(authActions.toggleRegistrationModal(false));
    }
  }, [isLoggedIn]);

  return (
    <div
      className="mb-200 "
      style={{
        marginBottom: "200px",
        position: props.modalMode ? "fixed" : "relative",
        width: props.modalMode ? "100%" : "",
        zIndex: props.modalMode ? 6001 : 10,
      }}
    >
      <section className="block-sec " style={{ position: "relative" }}>
        <div
          className="background bg-img pt-100 pb-0 parallaxie hide_modal"
          data-background="../../../img/bg-vid.jpg"
          style={{
            backgroundImage: !props.modalMode ? `url(${background})` : "",
          }}
          data-overlay-dark={5}
        >
          <div className="container">
            <div className="row">
              {!props.modalMode ? <div className="col-lg-6"></div> : ""}
              <div className="col-lg-5 offset-lg-1">
                <div
                  className="testim-box signing-m"
                  style={{
                    position: props.modalMode ? "absolute" : "static",
                    left: props.modalMode ? "50%" : "0",
                    transform: props.modalMode
                      ? "translateX(-50%)"
                      : "translateX(0)",
                  }}
                >
                  <ShowIf if={props.modalMode ? true : false}>
                    <div
                      onClick={() =>
                        dispatch(authActions.toggleRegistrationModal(false))
                      }
                      className={`modal_cancel`}
                    >
                      <IoCloseSharp size={"40px"} color="#fff" />
                    </div>
                  </ShowIf>

                  <div
                    onClick={() =>
                      props.closeModal ? props.closeModal() : console.log("s")
                    }
                    className="head-box"
                  >
                    <Link href={"/signup"}>
                      <h6 className="wow fadeIn fw-bold" data-wow-delay=".5s">
                        რეგისტრაცია
                      </h6>
                    </Link>
                    <h4
                      className="wow fadeInLeft fw-normal"
                      data-wow-delay=".5s"
                    >
                      გთხოვთ გაიარეთ ავტორიზაცია
                    </h4>
                  </div>

                  <div className="contact">
                    <form
                      id="contact-form"
                      className="form contact-form"
                      onSubmit={formSubmited}
                      noValidate={true}
                    >
                      <div className="messages" />
                      <div className="controls">
                        <div className="form-group has-error has-danger">
                          <input
                            onChange={changeHandler}
                            ref={phone}
                            id="form_name"
                            type="text"
                            name="phoneNumber"
                            placeholder="ტელეფონი ან იმეილი"
                            required={true}
                          />
                        </div>
                        <div className={"form-group has-error has-danger"}>
                          <input
                            onChange={changeHandler}
                            ref={password}
                            id="form_email"
                            type="password"
                            name="password"
                            placeholder="პაროლი"
                            required={true}
                          />
                        </div>
                      </div>

                      <div
                        className={`text-danger  ${
                          error ? "opacity-75" : "opacity-0"
                        }`}
                      >
                        ტელეფონი ან პაროლი არასწორია
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          name="signin"
                          className={`butn bord curve mt-30 w-50 font-nino`}
                        >
                          {!loading ? "ავტორიზაცია" : "loading..."}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInNew;
