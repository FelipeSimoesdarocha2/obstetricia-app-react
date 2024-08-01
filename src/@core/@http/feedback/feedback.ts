import { getAxios } from "@core/@http/axiosConfig/axiosConfig";

async function sendFeedback(description: string) {
  return getAxios().post(`${process.env.REACT_APP_API_URL}/Feedbacks`, {
    description,
  });
}

export { sendFeedback };
