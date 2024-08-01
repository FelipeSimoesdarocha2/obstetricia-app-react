import React, { ReactElement, useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Cookie from "universal-cookie";
import EmailConfirmation from "pages/emailConfirmation/EmailConfirmation";
import jwtDecode from "jwt-decode";
import Login from "./pages/login/Login";

import Patient from "./pages/patient/Patient";
import styles from "./App.module.scss";
import Sidebar from "./components/sidebar/Sidebar";
import PatientAdd from "./pages/patient/@subpages/Add/PatientAdd";
import PatientEdit from "./pages/patient/@subpages/Edit/PatientEdit";

import PerfilObstetra from "./pages/perfil/obstetra";
import LoginCreate from "./pages/loginCreate/LoginCreate";
import Upgrade from "./pages/plan/Upgrade";
import PrintService from "pages/printService/PrintService";
import RecoveryPassword from "./pages/recoveryPassword/RecoveryPassword";

// Admin-Screens
import HomePage from "pages/admin/pages/home";
import ObstetrasPage from "pages/admin/pages/obstetras";
import GestantesPage from "pages/admin/pages/gestantes";
import LoginPage from "pages/admin/pages/login";

interface IPageProps {
  element: ReactElement;
  noSideBar?: boolean;
}

interface IPageAdminProps {
  element: ReactElement;
}

function Page(props: IPageProps) {
  const { element, noSideBar } = props;
  const navigate = useNavigate();

  const [checkPlan, setCheckPlan] = useState(false);

  const cookie = new Cookie();
  const tokenApi = cookie.get("token_api");

  const verifyToken = () => {
    if (!tokenApi) {
      navigate("/login");
    }
  };

  const verifyPlan = () => {
    if (tokenApi) {
      const tokenDecoded = jwtDecode<any>(tokenApi);

      const invalidPlan = tokenDecoded.validPlan !== "True";

      if (invalidPlan) {
        navigate("/upgrade");
      }

      setCheckPlan(true);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [tokenApi]);

  // useEffect(() => {
  //  verifyPlan()
  // }, [tokenApi]);

  if (!tokenApi) {
    return null;
  }

  if (noSideBar) {
    return element;
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.container}>{element}</div>
    </div>
  );
}

function PageAdmin(props: IPageAdminProps) {
  const { element } = props;

  const navigate = useNavigate();

  const cookie = new Cookie();
  const tokenApi = cookie.get("token_api_admin");

  const verifyToken = () => {
    if (!tokenApi) {
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    verifyToken();
  }, [tokenApi]);

  if (!tokenApi) {
    return null;
  }

  return element;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/patients" replace />} />
      <Route path="/carteirinha/:id" element={<PrintService />} />
      <Route path="/patients" element={<Page element={<Patient />} />} />
      <Route
        path="/patients/:id/:gestationId"
        element={<Page element={<PatientEdit />} />}
      />
      <Route path="/patients/add" element={<Page element={<PatientAdd />} />} />

      <Route
        path="/perfil/obstetra"
        element={<Page element={<PerfilObstetra />} />}
      />

      <Route path="/login" element={<Login />} />

      <Route path="/reset-password" element={<RecoveryPassword />} />

      <Route path="/login/create" element={<LoginCreate />} />

      <Route path="/confirm-email" element={<EmailConfirmation />} />

      {/* <Route path="/upgrade" element={<Upgrade />} /> */}

      {/* Admin */}
      <Route path="/admin/login" element={<LoginPage />} />

      <Route
        path="/admin/home"
        element={<PageAdmin element={<HomePage />} />}
      />

      <Route
        path="/admin/obstetras"
        element={<PageAdmin element={<ObstetrasPage />} />}
      />
      <Route
        path="/admin/gestantes"
        element={<PageAdmin element={<GestantesPage />} />}
      />
    </Routes>
  );
}

export default App;
