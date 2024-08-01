import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { Card, Divider, IconButton, Toolbar } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";

import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";

import styles from "./Upgrade.module.scss";

import { subscribePlan, iPlan, PlanEnum, PlanValue } from '../../../../@core/@http/plans/plans'

import {
  getDoctorProfile,
} from "../../../../@core/@http/doctor/doctor";

import { useToast } from '../../../../providers/ToastProvider/ToastProvider'

const defaultPlan = {
  plan: PlanEnum.PREMIUM
}

const defaultPlanEnabled = {
  planoPremium: true,
  planoBasico: false,
}

interface iProps {
  open: boolean;
  onClose: () => void;
}

function UpgradeModal({ open, onClose }: iProps) {
  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [values, setValues] = useState<Partial<iPlan>>(defaultPlan)

  const { toast } = useToast()

  const { plan, nome, crm, email } = values

  const getPlanValue = () => PlanValue[PlanEnum[plan as PlanEnum]];

  const onChange = (value: any) => {
    setValues({...values, ...value})
  }

  const onSave = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      setSaving(true)

      await subscribePlan(values as iPlan)

      toast.success({
        title: 'Obstcare',
        message: 'Plano assinado com sucesso. Um email será enviado em breve pela equipe do Obstcare.'
      })

      onClose()
    } catch (error: any) {
      toast.error({
        title: 'Erro!',
        message: error.message
      })
    } finally {
      setSaving(false)
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await getDoctorProfile();

      if (response?.data) {
        const { data } = response;

        setValues({...values, email: data.email, crm: data.crm, nome: data.fullName});
      }
    } catch (error: any) {
      toast.error({
        title: 'Erro!',
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchProfile();
    }
  }, [open]);

  
  const renderContent = () => {
    if (loading) {
      return (
        <Stack direction="column" justifyContent="center" alignItems="center" className={styles.loader}>
          <CircularProgress sx={{color: '#3E6C75'}}/>
        </Stack>
      )
    }

    return (
      <form
        role="presentation"
        onSubmit={onSave}
      >
        <Grid container direction="column" gap={2}>
          <Grid >
            <p className={styles.label}>1. Planos</p>
            <Grid container direction="row" gap={2}>
              <Card sx={{
                minHeight: 240, backgroundColor: ' #48757d',
                color: '#fff', borderRadius: '8px', textAlign: 'center'
              }}>
                <h2 className={styles.title}>Basic</h2>
                <div className={styles.setValue}>
                  <h3>{`R$ ${PlanValue.BASIC}`}</h3>
                  <p>/mês</p>
                </div>
                <CardContent>

                  {!defaultPlanEnabled.planoBasico ? (
                    <div className={styles.statusFalse}>
                      INDISPONÍVEL
                    </div>
                  ) : (
                    <Button
                      loading={loading}
                      className={styles.statusTrue}
                      onClick={() => onChange({ plan: PlanEnum.BASIC })}
                      name="ESCOLHER PLANO" />
                  )
                  }
                  <Grid container direction="column" gap={2} sx={{ minWidth: 200 }}>
                    <Grid container direction="row">
                      <Typography mx={1}>Vantagens:</Typography>
                    </Grid>

                    <Grid container direction="row" gap={1}>
                      <CheckCircleIcon />
                      <p className={styles.fontCard}> Até 10 pacientes</p>
                    </Grid>

                    <Grid container direction="row" gap={1}>
                      <CheckCircleIcon />
                      <p className={styles.fontCard}>Anexos de até 5 Mb</p>
                    </Grid>

                    <Grid container direction="row" gap={1}>
                      <CheckCircleIcon />
                      <p className={styles.fontCard}>Suporte via chat</p>
                    </Grid>
                  </Grid>

                </CardContent>
              </Card>

              <Card sx={{
                minHeight: 240, backgroundColor: ' #48757d',
                color: '#fff', borderRadius: '8px', textAlign: 'center'
              }}>
                <h2 className={styles.title}>Premium</h2>
                <div className={styles.setValue}>
                  <h3>{`R$ ${PlanValue.PREMIUM}`}</h3>
                  <p>/mês</p>
                </div>
                <CardContent>
                  {!defaultPlanEnabled.planoPremium ? (
                    <div className={styles.statusFalse}>
                      INDISPONÍVEL
                    </div>
                  ) : (
                    <Button
                      loading={loading}
                      className={styles.statusTrue}
                      onClick={() => onChange({ plan: PlanEnum.PREMIUM })}
                      name="ESCOLHER PLANO" />
                  )
                  }
                  <Grid container direction="column" gap={2} sx={{ minWidth: 200 }}>
                    <Grid container direction="row">
                      <Typography mx={1}>Vantagens:</Typography>
                    </Grid>

                    <Grid container direction="row" gap={1}>
                      <CheckCircleIcon />
                      <p className={styles.fontCard}> Pacientes ilimitadas</p>
                    </Grid>

                    <Grid container direction="row" gap={1}>
                      <CheckCircleIcon />
                      <p className={styles.fontCard}>Anexos ilimitados</p>
                    </Grid>

                    <Grid container direction="row" gap={1}>
                      <CheckCircleIcon />
                      <p className={styles.fontCard}>Suporte via WhatsApp</p>
                    </Grid>
                  </Grid>

                </CardContent>
              </Card>

            </Grid>
          </Grid>

          <Divider className={styles.hr} />


          <Grid container direction="column" xs={6} md={6}>
            <p style={{ marginLeft: '1rem' }} className={styles.label}>2. INFORMAÇÕES</p>

            <Input
              key="input-name"
              type="text"
              value={nome}
              label="Nome"
              id="name"
              onChange={(value) => onChange({nome: value})}
              required
            />
            <Input
              key="input-crm"
              type="text"
              value={crm}
              label="CRM"
              id="crm"
              onChange={(value) => onChange({crm: value})}
              required
            />
            <Input
              key="input-email"
              type="text"
              value={email}
              label="E-mail"
              id="user"
              onChange={(value) => onChange({email: value})}
              required
            />

            <Grid item mx={2}>
              <p className={styles.labelValue}>Valor para pagamento</p>
              <Grid container direction="row" sx={{ alignItems: "center" }} gap={0.5}>
                <Typography sx={{ fontSize: "13px" }}>R$</Typography>
                <Typography sx={{ color: '#1a535c', fontWeight: '700', fontFamily: 'Sarabun' }}>
                  {getPlanValue()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider />
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid xs={6} md={6} >
              <Button
                isSubmit
                loading={saving}
                onClick={() => ({})}
                name="SOLICITAR BOLETO" />
            </Grid>
          </Grid>
        </Grid>
      </form>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} sx={{ display: 'grid' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}  >
        <span />
        <DialogTitle style={{ fontFamily: 'Sarabun', fontWeight: '700', marginLeft: '2rem' }}>
          Assinar um Plano
        </DialogTitle>
        <IconButton edge="end" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <DialogContent dividers sx={{ overflow: 'auto', height: '70vh' }}>
        {renderContent()}
      </DialogContent>
    </Dialog >
  );
}

export default UpgradeModal;
