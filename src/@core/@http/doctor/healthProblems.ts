import { getAxios } from '@core/@http/axiosConfig/axiosConfig';
import {
  IHealthProblem,
  IHealthProblemAfterPost,
} from "../../models/healthProblems";
import { IHealthProblemResponse } from "../models/responses/healthProblems";

export interface ISearchHealthProblemsByDoctorIdProps {
  doctorId: string;
  description: string;
}

async function searchHealthProblemsByDoctorId(
  props: ISearchHealthProblemsByDoctorIdProps
): Promise<IHealthProblem[]> {
  const { description, doctorId } = props;

  const queryParams = new URLSearchParams();

  queryParams.set("description", description);

  const response = (
    await getAxios().get<IHealthProblemResponse[]>(
      `${process.env.REACT_APP_API_URL
      }/healthproblems/doctor/${doctorId}?${queryParams.toString()}`
    )
  ).data;

  return response?.map(
    (r: { healthProblemsId: string; description: string }) => ({
      healthProblemsId: r.healthProblemsId,
      description: r.description,
    })
  );
}

export interface ICreateProblemByDoctorIdProps {
  doctorId: string;
  description: string;
}

async function createProblem(
  props: ICreateProblemByDoctorIdProps
): Promise<IHealthProblemAfterPost> {
  const { description, doctorId } = props;

  const queryParams = new URLSearchParams();

  queryParams.set("description", description);

  const response = (
    await getAxios().post<IHealthProblemAfterPost>(
      `${process.env.REACT_APP_API_URL}/healthproblems/doctor/${doctorId}`,
      { description }
    )
  ).data;

  return response;
}

export default { searchHealthProblemsByDoctorId, createProblem };
