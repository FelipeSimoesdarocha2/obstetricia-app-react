import jwtDecode from "jwt-decode";
import Cookie from "universal-cookie";
import axios from "axios";
import { IAuthResponse } from "../../models/authResponse";
import { ICredentials } from "../../models/credentials";
import { IUserLogin, IUserRegister } from "../../models/userLogin";
import { LocalStorage } from "../../helpers/localStorage";

const setCookieToken = (token: string, googleLogin?: boolean) => {
  const cookie = new Cookie();

  cookie.set("token_api", token, { sameSite: true, secure: true });
  cookie.set("google_login", String(!!googleLogin), {
    sameSite: true,
    secure: true,
  });

  const doctor = jwtDecode<{ doctorId: string; nameDoctor: string }>(token);

  localStorage.setItem(LocalStorage.DoctorId, doctor?.doctorId);
  localStorage.setItem(LocalStorage.DoctorName, doctor?.nameDoctor);
};

const setCookieTokenAdmin = (token: string) => {
  const cookie = new Cookie();
  cookie.set("token_api_admin", token, { sameSite: true, secure: true });
};

const login = async (user: IUserLogin): Promise<IAuthResponse> => {
  const response = (
    await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/weblogin`,
      user
    )
  ).data;

  if (response.success) {
    setCookieToken(response.token);
  }

  return response;
};

const loginAdmin = async (user: IUserLogin): Promise<IAuthResponse> => {
  const response = (
    await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/admin/login`,
      user
    )
  ).data;

  if (response.success) {
    setCookieTokenAdmin(response.token);
  }

  return response;
};

const googleLogin = async (credentialsData: string): Promise<IAuthResponse> => {
  const CredentialsDto: ICredentials = {
    Credentials: credentialsData,
  };

  const response = (
    await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/googleLogin`,
      CredentialsDto
    )
  ).data;

  if (response.success) {
    setCookieToken(response.token, true);
  }

  return response;
};

const register = async (user: IUserRegister): Promise<IAuthResponse> => {
  return (
    await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/cadastroFree`,
      user
    )
  ).data;
};

const forgotPassword = async (email: string): Promise<IAuthResponse> => {
  return (
    await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/ForgotPassword/${email}/1`
    )
  ).data;
};

const newPassword = async (data: {
  resetToken: string;
  newPassword: string;
}): Promise<IAuthResponse> => {
  return (
    await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/Auth/ResetPassword`,
      data
    )
  ).data;
};

const confirmEmail = (token: string) =>
  axios.post(`${process.env.REACT_APP_API_URL}/auth/confirm-email${token}`);

export default {
  login,
  loginAdmin,
  googleLogin,
  register,
  forgotPassword,
  confirmEmail,
  newPassword,
};
