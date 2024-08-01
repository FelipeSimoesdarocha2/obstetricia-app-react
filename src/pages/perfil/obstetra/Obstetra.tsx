/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Skeleton } from "@mui/material";

import Cookie from "universal-cookie";
import { usePlan } from "hooks/usePlan";
import Tab, { ITabHead } from "../../../components/tab/Tab";
import Card from "../../../components/card/Card";
import Input from "../../../components/input/Input";
import InputPhone from "../../../components/input-phone/InputPhone";
import Button from "../../../components/button/Button";
import Select from "../../../components/select/Select";
import FileUpload from "../../../components/fileUpload/FileUpload";

import logoShort from "../../../@core/images/Logo_Short.png";

import {
  getDoctorProfile,
  saveDoctorProfile,
  IDoctor,
} from "../../../@core/@http/doctor/doctor";

import UpgradeModal from "../../plan/@components/upgradeModal/UpgradeModal";

const tabHeaderDefault: ITabHead = {
  main: "",
  items: [],
};

function Obstetra() {
  const navigate = useNavigate();

  const [tabHeader] = useState<ITabHead>(tabHeaderDefault);

  const [data, setData] = useState<Partial<IDoctor>>({});

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState<any>();

  const [openUpgrade, setOpenUpgrade] = useState(true);

  const { plan } = usePlan();

  const freePlan = plan?.free;

  const valuePlan = plan ? (freePlan ? "Sem custo" : "229,90") : "";

  const profileImg = data?.profilePictureUrl
    ? data.profilePictureUrl
    : logoShort;

  const getDisabledEmail = () => {
    const cookie = new Cookie();

    const googleLogin = cookie.get("google_login");

    return googleLogin === "true";
  };

  const goToHome = () => navigate("/");

  const onChange = (prop: string, value: any) => {
    setData({
      ...data,
      [prop]: value,
    });
  };

  const onChangeFile = (files: any) => {
    const file = files[0];

    setData({
      ...data,
      profilePicture: file,
      profilePictureUrl: URL.createObjectURL(file),
    });
  };

  const onSave = async () => {
    try {
      setSaving(true);

      const dataToSave = { ...data };
      delete dataToSave.profilePictureUrl;

      const formData = new FormData();
      /* eslint-disable */
      for (const prop in dataToSave) {
        formData.append(prop, dataToSave[prop]);
      }

      await saveDoctorProfile(formData);

      setToast({
        type: "success",
        title: "Sucesso",
        message: "Perfil salvo com sucesso.",
      });
    } catch (error: any) {
      setToast({ type: "error", title: "Falha", message: error.message });
    } finally {
      setSaving(false);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await getDoctorProfile();

      setData(response.data);
    } catch (error: any) {
      setToast({ type: "error", title: "Falha", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Tab
        header={tabHeader}
        body={
          <>
            <Card
              header={{ title: "Perfil", rightContent: null }}
              body={
                <>
                  <Grid container xs={12}>
                    <Grid item xs={5}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "300px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {loading ? (
                          <Skeleton width="100%" height="100%" />
                        ) : (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                height: "200px",
                                img: {
                                  padding: "20px",
                                  width: "150px",
                                  objectFit: "contain",
                                },
                              }}
                            >
                              <img src={profileImg} alt="Imagem de perfil" />
                            </Box>
                            <FileUpload
                              accept=".png,.jpg,.jpeg"
                              onChange={onChangeFile}
                            >
                              ALTERAR FOTO
                            </FileUpload>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      {/* {!loading && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "300px",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "solid 1px #cacaca",
                            borderRadius: "20px",
                            margin: "20px",
                            padding: "3px",
                          }}
                        >
                          <Card
                            header={{
                              title: "Informações do plano",
                              rightContent: null,
                            }}
                            body={
                              <>
                                <Grid
                                  container
                                  xs={12}
                                  sx={{
                                    paddingTop: "20px",
                                    "& p": { fontSize: "14px" },
                                  }}
                                >
                                  <Grid item xs={6}>
                                    <Typography>Plano Atual</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography>
                                      <b>{plan?.description}</b>
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography>Valor</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography>
                                      <b>{valuePlan}</b>
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography>Dias Restantes</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography>
                                      <b>{plan?.daysRemanning}</b>
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {freePlan && (
                                  <Grid
                                    container
                                    xs={12}
                                    spacing={2}
                                    sx={{
                                      paddingTop: "40px",
                                      textAlign: "center",
                                      "& p": {
                                        fontSize: "14px",
                                      },
                                    }}
                                  >
                                    <Grid item xs={12}>
                                      <Typography>
                                        Assine um de nossos planos e continue o
                                        monitoramento das gestantes após o free
                                        trial.
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <MuiButton
                                        variant="outlined"
                                        color="warning"
                                        sx={{ borderRadius: "30px" }}
                                        onClick={() => setOpenUpgrade(true)}
                                      >
                                        Assinar um plano
                                      </MuiButton>
                                    </Grid>
                                  </Grid>
                                )}
                              </>
                            }
                          />
                        </Box>
                      )} */}
                    </Grid>
                  </Grid>
                  <Grid container xs={12} sm={10} md={6}>
                    <Grid item xs={6}>
                      {loading ? (
                        <Skeleton width="90%" height="50px" />
                      ) : (
                        <Input
                          type="text"
                          value={data?.fullName}
                          id="fullName"
                          label="Nome completo"
                          required
                          onChange={(value) => onChange("fullName", value)}
                        />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {loading ? (
                        <Skeleton width="90%" height="50px" />
                      ) : (
                        <InputPhone
                          value={data?.phones?.[0]}
                          id="phones"
                          label="Telefone"
                          required
                          onChange={(value) => onChange("phones", [value])}
                        />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {loading ? (
                        <Skeleton width="90%" height="50px" />
                      ) : (
                        <Select
                          id="gender"
                          value={data?.gender}
                          label="Genero"
                          placeholder="Selecione"
                          required
                          options={[
                            { value: 0, description: "Masculino" },
                            { value: 1, description: "Feminino" },
                          ]}
                          onChange={(value) => onChange("gender", value)}
                        />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {loading ? (
                        <Skeleton width="90%" height="50px" />
                      ) : (
                        <Input
                          type="email"
                          value={data?.email}
                          id="email"
                          label="Email"
                          required
                          disabled={getDisabledEmail()}
                          onChange={(value) => onChange("email", value)}
                          placeholder="email@mail.com"
                        />
                      )}
                    </Grid>
                  </Grid>
                </>
              }
            />

            <Card
              header={{ title: "Profissional", rightContent: null }}
              body={
                <Grid container>
                  <Grid item xs={6} sm={5} md={3}>
                    {loading ? (
                      <Skeleton width="90%" height="50px" />
                    ) : (
                      <Input
                        type="text"
                        value={data?.crm}
                        id="crm"
                        required
                        label="CRM (Número Conselho)"
                        onChange={(value) => onChange("crm", value)}
                      />
                    )}
                  </Grid>
                </Grid>
              }
            />

            <Grid
              container
              spacing={2}
              xs={12}
              sm={10}
              md={6}
              sx={{ padding: "16px 24px" }}
            >
              <Grid item xs={6}>
                {loading ? (
                  <Skeleton width="90%" height="50px" />
                ) : (
                  <Button
                    loading={saving}
                    onClick={onSave}
                    title="Atualizar"
                    name="Atualizar"
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                {loading ? (
                  <Skeleton width="90%" height="50px" />
                ) : (
                  <Button
                    loading={false}
                    type="secondary"
                    onClick={goToHome}
                    title="Cancelar"
                    name="Cancelar"
                  />
                )}
              </Grid>
            </Grid>
          </>
        }
      />

      {/* <UpgradeModal open={openUpgrade} onClose={() => setOpenUpgrade(false)} /> */}

      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(undefined)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ maxWidth: 400 }}
      >
        <Alert severity={toast?.type} sx={{ width: 400 }}>
          <AlertTitle>{toast?.title}</AlertTitle>
          {toast?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Obstetra;
