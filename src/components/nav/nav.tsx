import logo from "../../img/logo.webp";
import { NavLink } from "./NavLink";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./nav.module.css";
import React from "react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShowIf from "../../utils/showIf";
import { authActions } from "../../store/auth/auth-slice";
import { logout } from "../../store/auth/auth-effects";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "../../ui/image/image";
export const NavComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  // console.log('Current Language:', i18n.language);
  const isLoggedIn = useSelector((state: RootState) => state.auth.LoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [showMovNav, setShowMobNav] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    let body: any = document.querySelector("body");

    const bodyClickedFn = (e: any) => {
      if (
        showDropDown &&
        !e?.srcElement?.classList?.contains("dropdown-toggle")
      ) {
        setShowDropDown(false);
      }
    };

    body.addEventListener("click", bodyClickedFn);
    return () => body.removeEventListener("click", bodyClickedFn);
  }, [showDropDown]);

  const logoutHandler = () => {
    dispatch(logout());

    router.push("/");
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
  };

  const overLayClicked = () => {
    setShowMobNav((prev) => !prev);
    const checkbox = document.getElementById("check") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };
  const closeDropDown = () => {
    setShowMobNav(false);
    setShowDropDown(false);
    const checkbox = document.getElementById("check") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };
  return (
    <nav
      className={"navbar navbar-expand-lg d-flex justify-content-between"}
      style={{
        zIndex: "9999",
        position: "fixed",
        borderBottom: "1px solid",
        borderImage: "linear-gradient(0.25turn, #12C2E9, #C471ED, #F64F59)",
        borderImageSlice: "1",
        fontFamily: "Helvetica Neue LT GEO",
      }}
    >
      <div
        onClick={() => "ss"}
        className={"container  d-flex justify-content-between"}
      >
        {/* Logo */}

        <NavLink activeClassName={"active"} to={"/"} className="logo">
          <ResponsiveImage link={logo} name="logo" />
        </NavLink>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar">
            <i className="fas fa-bars" />
            <i className="fas fa-bars"/>
       
            <GiHamburgerMenu/>
          </span>
        




        </button> */}
        <div className="header__hamburger header__hamburger--show">
          <label className="check_box" htmlFor="check">
            <input
              onChange={() => setShowMobNav((prev) => !prev)}
              type="checkbox"
              name="check"
              id="check"
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div
          className={`nav__overlay ${showMovNav ? "nav__overlay-show" : ""}`}
          onClick={overLayClicked}
        ></div>
        {/* navbar links */}
        <div
          className={`collapse navbar-collapse justify-content-end mob-menu ${showMovNav ? "show-mob-menu" : ""} ${showMovNav && user?.role === "admin" ? "show-mob-menu--admin" : ""}  ${!isLoggedIn && showMovNav ? "show-mob-menu-auth" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            {user?.role === "admin" ? (
              <li className="nav-item hide-desktop">
                <NavLink
                  exact
                  activeClassName="active"
                  to={"/qaws"}
                  className="nav-link admin "
                >
                  ადმინ
                </NavLink>
              </li>
            ) : (
              ""
            )}

            <li className="nav-item">
              <NavLink
                exact
                activeClassName={"active-auth active"}
                to={`/${lang}`}
                className="nav-link"
                onClick={closeDropDown}
              >
                {t("home")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName={"active-auth active"}
                to={`/${lang}/about`}
                className="nav-link"
                onClick={closeDropDown}
              >
                {t("about us")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName={"active-auth active"}
                to={`/${lang}/courses`}
                className="nav-link"
                onClick={closeDropDown}
              >
                {t("what we teach")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName={"active-auth active"}
                to={`/${lang}/contact`}
                className="nav-link"
                onClick={closeDropDown}
              >
                {t("contact")}
              </NavLink>
            </li>

            {user?.role === "admin" ? (
              <li className="nav-item">
                <NavLink
                  activeClassName={"active"}
                  to={"/events"}
                  className="nav-link"
                >
                  ივენთები
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <ShowIf if={isLoggedIn}>
              <li className="nav-item hide-desktop">
                <NavLink
                  activeClassName={"active"}
                  to={"/profile"}
                  className="dropdown-item"
                >
                  პროფილი
                </NavLink>
              </li>
            </ShowIf>
            <ShowIf if={isLoggedIn}>
              <li className="nav-item hide-desktop">
                <NavLink
                  activeClassName={"active"}
                  to={"/profilesc"}
                  className="dropdown-item"
                >
                  კურსები
                </NavLink>
              </li>
            </ShowIf>

            <ShowIf if={isLoggedIn}>
              <li className="nav-item hide-desktop">
                <a
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={logoutHandler}
                >
                  გამოსვლა
                </a>
              </li>
            </ShowIf>

            {isLoggedIn ? (
              <React.Fragment>
                <li className="nav-item  dropdown dropdown-mob ">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={toggleDropDown}
                    className={`nav-link ${styles.ang} dropdown-toggle `}
                    data-toggle="dropdown"
                    data-scroll-nav="0"
                  >
                    ჩემი ანგარიში
                  </a>
                  <div
                    className={`dropdown-menu  dropdown-mob ${showDropDown ? "show" : ""}`}
                  >
                    {user?.role === "admin" ? (
                      <NavLink
                        exact
                        activeClassName="active"
                        to={"/qaws"}
                        className="dropdown-item admin"
                        style={{ color: "red" }}
                      >
                        ადმინ
                      </NavLink>
                    ) : (
                      ""
                    )}
                    <NavLink
                      activeClassName={"active"}
                      to={"/profile"}
                      className="dropdown-item"
                      href="index.html"
                    >
                      პროფილი
                    </NavLink>
                    <NavLink
                      activeClassName={"active"}
                      to={"/profilesc"}
                      className="dropdown-item"
                      href="index2.html"
                    >
                      კურსები
                    </NavLink>
                    <a
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={logoutHandler}
                    >
                      გამოსვლა
                    </a>
                  </div>
                </li>
              </React.Fragment>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link px-4"
                  style={{
                    borderRadius: "32px",
                    background: "#40A6F2",
                    padding: "10px 20px!important",
                    marginTop: "14px",
                  }}
                  target="_black"
                  href="https://reschool.edupage.org"
                >
                  {t("student portal")}
                </a>
                {/*  <NavLink activeClassName={'active-auth active'} className="nav-link " to={'/signin'}>*/}
                {/*  ავტორიზაცია*/}
                {/*</NavLink>*/}
              </li>
            )}
            <li className="nav-item">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
