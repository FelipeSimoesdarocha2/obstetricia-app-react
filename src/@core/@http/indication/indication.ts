import { getAxios } from "@core/@http/axiosConfig/axiosConfig";
import { LocalStorage } from "../../helpers/localStorage";

async function sendIndication(email: string) {
  const userId = localStorage.getItem(LocalStorage.DoctorId);

  return getAxios().post(`${process.env.REACT_APP_API_URL}/Indications`, {
    email,
    userId,
  });
}

export { sendIndication };
