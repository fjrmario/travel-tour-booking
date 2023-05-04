import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./Header.css";
import { AuthContext } from "../../../context/AuthContext";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const nav__link = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (accessToken) {
      const payload = accessToken.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      setUserRole(decoded);
    }
  }, [accessToken]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Cookies.remove("accessToken");
    setUserRole(null);
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 1 ||
        document.documentElement.scrollTop > 1
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => {
    return menuRef.current.classList.toggle("show__menu");
  };

  return (
    <header
      className="header w-full h-80px leading-80px"
      ref={headerRef}
    >
      <Container>
        <Row>
          <div className="nav__wrapper flex items-center justify-between">
            {/* ==========Company Name========== */}
            <div className="logo">
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/014/971/579/non_2x/mountain-logo-design-modern-png.png"
                }
                alt=""
              />
            </div>
            {/* ==========Company Name========== */}

            {/* ==========Navigation Link========== */}
            <div
              className="navigation"
              ref={menuRef}
              onClick={toggleMenu}
            >
              <ul className="menu flex items-center gap-5 mb-0">
                {nav__link.map((item, index) => (
                  <li
                    key={index}
                    className="nav__item"
                  >
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                {user && (
                  <li className="nav__item">
                    <NavLink to="/manage">Manage Bookings</NavLink>
                  </li>
                )}
                {user &&
                  userRole &&
                  userRole.role &&
                  userRole.role === "admin" && (
                    <li className="nav__item">
                      <NavLink to="/manager">Manage Tours</NavLink>
                    </li>
                  )}
              </ul>
            </div>
            {/* ==========Navigation Link========== */}

            {/* ==========Auth Link========== */}
            <div className="nav__right flex items-center gap-4">
              <div className="nav__btns flex items-center gap-4">
                {user ? (
                  <>
                    <NavLink to="/account">
                      <h5 className="mb-0">{user.username}</h5>
                    </NavLink>
                    <Button
                      className="btn btn-dark"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    {/* <Button className="btn secondary__btn">
                      <Link to="/sign">Login</Link>
                    </Button> */}
                    <Button className="btn primary__btn">
                      <Link to="/sign">Login</Link>
                    </Button>
                  </>
                )}
              </div>
              <span
                className="mobile__menu"
                onClick={toggleMenu}
              >
                <i className="ri-menu-line"></i>
              </span>
            </div>
            {/* ==========Auth Link========== */}
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
