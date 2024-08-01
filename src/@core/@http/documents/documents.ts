import { getAxios } from "@core/@http/axiosConfig/axiosConfig";

async function getDocumentsGestation(idGestation: string) {
  return getAxios().get(
    `${process.env.REACT_APP_API_URL}/Documents/Gestation/${idGestation}`
  );
}

async function saveDocumentsGestation(idGestation: string, files: FormData) {
  return getAxios().post(
    `${process.env.REACT_APP_API_URL}/Documents/Gestation/${idGestation}`,
    files
  );
}

async function deleteDocument(idDocument: string) {
  return getAxios().delete(
    `${process.env.REACT_APP_API_URL}/Documents/${idDocument}`
  );
}

async function downloadDocument(idDocument: string) {
  return getAxios().get(
    `${process.env.REACT_APP_API_URL}/Documents/${idDocument}`,
    { responseType: "blob" }
  );
}

export {
  getDocumentsGestation,
  saveDocumentsGestation,
  deleteDocument,
  downloadDocument,
};
