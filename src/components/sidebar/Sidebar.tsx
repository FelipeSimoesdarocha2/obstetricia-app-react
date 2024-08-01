import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Cookie from "universal-cookie";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import { usePlan } from "hooks/usePlan";
import { Skeleton } from "@mui/material";
import { IUser } from "../../@core/models/user";
import styles from "./Sidebar.module.scss";
import Button from "../button/Button";
import dateHelper, { TimeOfTheDay } from "../../@core/helpers/date";
import { LocalStorage } from "../../@core/helpers/localStorage";

import UpgradeModal from "../../pages/plan/@components/upgradeModal/UpgradeModal";
import CardIndication from "./CardIndication";
import CardFeedback from "./CardFeedback";

function Sidebar() {
  const noImageLink =
    "https://i.pinimg.com/originals/d3/f9/13/d3f913b8dd27fac04b26c2c9a903610d.png";
  const [user, setUser] = useState<IUser>();
  const [toggle, setToggle] = useState<boolean>(false);

  const [openUpgrade, setOpenUpgrade] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const navigate = useNavigate();

  const location = useLocation();

  const { plan, loading: loadingPlan } = usePlan();

  const handleWelcomeMessage = (actualHour: number) => {
    const timeOfTheDay = dateHelper.getCurrentTimeOfTheDay(actualHour);

    switch (timeOfTheDay) {
      case TimeOfTheDay.Afternoon:
        setWelcomeMessage("Boa tarde");
        break;
      case TimeOfTheDay.Night:
        setWelcomeMessage("Boa noite");
        break;
      default:
        setWelcomeMessage("Bom dia");
    }
  };

  useEffect(() => {
    const doctorId = localStorage.getItem(LocalStorage.DoctorId) ?? "";
    const doctorName = localStorage.getItem(LocalStorage.DoctorName) ?? "";
    setUser({ id: doctorId, name: doctorName });

    const actualHour = new Date().getHours();

    handleWelcomeMessage(actualHour);

    const interval = setInterval(() => {
      handleWelcomeMessage(actualHour);
    }, dateHelper.getIntervalTimeToNextTimeOfTheDayInMs(actualHour));

    return () => {
      clearInterval(interval);
    };
  }, []);

  const toogleMenu = () => {
    setToggle(!toggle);
  };

  const logout = () => {
    const cookie = new Cookie();
    cookie.remove("token_api");
    googleLogout();
    navigate("/login");
  };

  const isActive = (pathname: string) =>
    location.pathname === pathname ? styles.active : "";

  const isActivePatients = () => {
    if (
      location.pathname === "/patients" ||
      (location.pathname.indexOf("/patients") > -1 &&
        location.pathname !== "/patients/add")
    ) {
      return styles.active;
    }

    return "";
  };

  const renderPlanInfo = () => {
    const free = plan?.free;

    if (loadingPlan) {
      return <Skeleton height={30} width="100%" />;
    }

    return (
      <>
        {free && (
          <Button
            type="secondary"
            name="Upgrade"
            onClick={() => setOpenUpgrade(true)}
          />
        )}
        <span className={styles.welcome}>
          <strong>
            {plan?.description} - {plan?.daysRemanning}
          </strong>{" "}
          dias restantes
        </span>
      </>
    );
  };

  function openInNewTab() {
    const w = window.open(
      "https://intercom.help/obstcare/pt-BR/collections/3657746-sou-obstetra",
      "_blank"
    );
    if (w) {
      w.focus();
    }
  }

  return (
    <>
      <Button
        name=""
        iconLeft={<MenuOpenIcon />}
        className={`${styles.btnToggleSidebar}`}
        onClick={toogleMenu}
      />

      <div className={`${toggle ? styles.show : styles.hide}`}>
        <div
          className={`${styles.sidebarContainer} animate__animated animate__fadeInLeft`}
        >
          <Button
            name=""
            iconLeft={<KeyboardDoubleArrowLeftIcon />}
            className={`${styles.btnToggleSidebar} ${styles.btnCloseSidebar}`}
            onClick={toogleMenu}
          />

          <div className={`${styles.userData} ${styles.item}`}>
            <div className={styles.imageProfileUrl}>
              <img
                src={user?.imageProfileUrl ?? noImageLink}
                alt="imageProfile"
              />

              <div className={styles.welcomeContainer}>
                <span className={styles.welcome}>{welcomeMessage},</span>
                <span className={styles.username}>{user?.name}</span>
              </div>
            </div>
            {/* <div className={styles.contentUpgrade}>
              {renderPlanInfo()}
            </div> */}
          </div>

          <UpgradeModal
            open={openUpgrade}
            onClose={() => setOpenUpgrade(false)}
          />

          <div className={`${styles.fastItems} ${styles.item}`}>
            <NavLink to="/patients/add" className={isActive("/patients/add")}>
              <PersonAddIcon />
              <span style={{ whiteSpace: "nowrap" }}>Adicionar Paciente</span>
            </NavLink>
          </div>

          <div className={`${styles.items} ${styles.item}`}>
            <NavLink to="/patients" className={isActivePatients()}>
              <GroupIcon />
              <span>Pacientes</span>
            </NavLink>
          </div>

          <div className={`${styles.configurationItems} ${styles.item}`}>
            <NavLink
              to="/perfil/obstetra"
              className={isActive("/perfil/obstetra")}
            >
              <PersonIcon />
              <span>Perfil</span>
            </NavLink>

            <NavLink
              onClick={() => openInNewTab()}
              to=""
              className={() => isActive("/help")}
            >
              <HelpCenterIcon />
              <span>Ajuda</span>
            </NavLink>

            <button
              className={styles.navigateItem}
              onClick={(_) => logout()}
              type="button"
            >
              <LogoutIcon />
              <span>Sair</span>
            </button>
          </div>
          <CardIndication />
          <CardFeedback />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
