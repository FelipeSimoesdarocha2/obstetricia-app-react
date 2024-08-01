import { getAxios } from '@core/@http/axiosConfig/axiosConfig';
import { LocalStorage } from "../../helpers/localStorage";

import { IDoctor } from "../models/responses/doctor";


async function getDoctorProfile() {
  const doctorId = localStorage.getItem(LocalStorage.DoctorId);
  return getAxios().get<Partial<IDoctor>>(
    `${process.env.REACT_APP_API_URL}/Doctors/${doctorId}/Profile`
  );
}

async function saveDoctorProfile(profile: FormData) {
  const doctorId = localStorage.getItem(LocalStorage.DoctorId);
  return getAxios().put(
    `${process.env.REACT_APP_API_URL}/Doctors/${doctorId}/Profile`,
    profile
  );
}

async function getPlan() {
  const doctorId = localStorage.getItem(LocalStorage.DoctorId);
  return getAxios().get(
    `${process.env.REACT_APP_API_URL}/Plans/DoctorPlan/${doctorId}`
  );
}

export type { IDoctor };

export { getDoctorProfile, saveDoctorProfile, getPlan };
