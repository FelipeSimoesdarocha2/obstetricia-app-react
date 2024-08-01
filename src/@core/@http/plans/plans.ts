import { getAxios } from "@core/@http/axiosConfig/axiosConfig";

import { LocalStorage } from "../../helpers/localStorage";

enum PlanEnum {
  BASIC = 0,
  PREMIUM = 1,
}

interface iPlanValue {
  BASIC: string;
  PREMIUM: string;
  [key: string]: any;
}

const PlanValue: iPlanValue = {
  BASIC: "149,90",
  PREMIUM: "229,90",
};

interface iPlan {
  doctorsId?: string;
  plan: PlanEnum;
  nome: string;
  crm: string;
  email: string;
}

async function subscribePlan(data: iPlan) {
  const doctorsId = localStorage.getItem(LocalStorage.DoctorId);

  return getAxios().post(`${process.env.REACT_APP_API_URL}/Plans`, {
    ...data,
    doctorsId,
  });
}

export { subscribePlan, PlanEnum, PlanValue };
export type { iPlan };
