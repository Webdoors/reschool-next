import Link from "next/link";
import { useDispatch } from "react-redux";
import { startAuthentication } from "../../../store/auth/auth-effects";
import { AppDispatch } from "../../../store/reducer";

const SignInContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const formSubmited = (form: React.FormEvent) => {
    form.preventDefault();
    // dispatch(startAuthentication(598829282, "kakha123"))
  };
  return (
    <div className="main-content">
      {/* ==================== Start about ==================== */}
      <section className="about-us section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 valign md-mb50">
              <div className="mb-50">
                {"{"}# <h6 className="fw-100  ls10 mb-10">About Us</h6> #{"}"}
                <h3 className="fw-600  ls1 mb-30 color-font">ავტორიზაცია</h3>
                <p>
                  ისწავლე ყველაზე მოთხოვნადი პროფესიები, მნიშვნელოვნად გაზარდე
                  საკუთარი შემოსავლები და შეიტანე შენი წვლილი გლობარულ-ციფრულ
                  რევოლუაციაში.
                </p>
                <div className="form-group">
                  <Link href={"signup"} className="sub-title">
                    რეგისტრაცია
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-7 img">
              <form onSubmit={formSubmited} id="signin_form">
                <input
                  type="hidden"
                  name="_csrf_token"
                  defaultValue="{{ csrf_token('authenticate') }}"
                />
                {/* {'{'}% if error %{'}'}
                            <div className="alert alert-danger">{'{'}{'{'} error.messageKey|trans(error.messageData, 'security') {'}'}{'}'}</div>
                            {'{'}% endif %{'}'} */}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder={"591415795"}
                  />
                </div>
                <div className="form-group mt-10">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="********"
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    name="signin"
                    className="butn bord curve mt-30 w-50"
                  >
                    ავტორიზაცია
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* ==================== End about ==================== */}
    </div>
  );
};

export default SignInContainer;
