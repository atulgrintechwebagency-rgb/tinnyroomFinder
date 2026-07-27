import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "/images/logo.png";
import { logoutUser } from "../Api/logoutApi";

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {

    try {

      const token = localStorage.getItem("token");

      if (token) {
        await logoutUser(token);
      }

    } catch (error) {

      console.log("Logout API Error:", error);

    } finally {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }

  };

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar ${
        scrolled ? "scrolled" : ""
    }`}>
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Tiny Room Finder" className="logo" />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarMenu">

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <NavLink
                to="/all-listing"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Find a Room
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/list-a-space"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                List a Tiny Space
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                How It Works
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Pricing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Resources
              </NavLink>
            </li>

          </ul>

          {/* Right Buttons */}
          <div className="d-flex align-items-center gap-3 nav_right_btns">

            {user ? (
              <>
                <span className="user-name">
                  Hi, {user.name}
                </span>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="login-btn" to="/login">
                  Log In
                </Link>

                <Link className="signup-btn" to="/signup">
                  Sign Up
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;