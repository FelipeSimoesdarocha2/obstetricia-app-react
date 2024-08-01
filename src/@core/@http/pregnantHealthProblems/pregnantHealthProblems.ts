import { getAxios } from '@core/@http/axiosConfig/axiosConfig';

async function linkProblem(
  idGestation: string,
  healthProblem: string
) {
  return getAxios().post(
    `${process.env.REACT_APP_API_URL}/PregnantHealthProblems/LinkProblem/${idGestation}?healthProblem=${healthProblem}`
  );
}

async function unlinkProblem(
  pregnantHealthProblemId: string,
) {
  return getAxios().delete(
    `${process.env.REACT_APP_API_URL}/PregnantHealthProblems/UnlinkProblem/${pregnantHealthProblemId}`
  );
}

export default { linkProblem, unlinkProblem };
