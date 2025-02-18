import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((currentState) => !currentState);
  };

  return (
    <nav className={style.navContainer}>
      <NavLink to={"/homepage"}>
        <img src="/logo.png" alt="Logo img" className={style.logoImage} />
      </NavLink>
      <ul className={style.navBarLink}>
        <li>
          <button
            type="button"
            className={style.dropdownButton}
            onClick={toggleDropdown}
          >
            Les décisions
          </button>
          {isDropdownOpen && (
            <ul className={style.dropdownMenu}>
              <li>
                <NavLink
                  to={"/participatingdecisions"}
                  className={style.navLink}
                >
                  Les décisions où je participe
                </NavLink>
              </li>
              <li>
                <NavLink to={"/mydecisions"} className={style.navLink}>
                  Mes décisions
                </NavLink>
              </li>
              <li>
                <NavLink to={"/runningdecisions"} className={style.navLink}>
                  Les décisions en cours
                </NavLink>
              </li>
              <li>
                <NavLink to={"/archiveddecisions"} className={style.navLink}>
                  Les décisions archivées
                </NavLink>
              </li>
              <li>
                <NavLink to={"/alldecisions"} className={style.navLink}>
                  Toutes les décisions
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button type="button" className={style.notificationButton}>
            Notification
          </button>
        </li>
        <li>
          <NavLink to={"/profile"}>
            <img
              src="/utilisateur.png"
              alt="Profil img"
              className={style.profileImage}
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
