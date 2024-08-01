export enum historicoEnum {
  hipertensaoArterialHistoricoPessoal = "Hipertensão Arterial",
  diabetesHistoricoPessoal = "Diabetes",
  cardiopatiaHistoricoPessoal = "Cardiopatia",
  cirugiaHistoricoPessoal = "Cirurgia",
  cirugiaPelvUlterinaHistoricoPessoal = "Cirurgia Pélvica Uterina",
  alergiasHistoricoPessoal = "Alergias",
  gemelarHistoricoPessoal = "Gemelar",
  infeccaoUrinariaHistoricoPessoal = "Infecção Urinária",
  transfSanguineaHistoricoPessoal = "Transfusão Sanguínea",
  tromboembolismoHistoricoPessoal = "Tromboembolismo",
  lupusHistoricoPessoal = "Lúpus",
  doencasPsiquiatricasHistoricoPessoal = "Doenças Psiquiátricas",
  hipertensaoArterialHistoricoFamiliar = "Hipertensão Arterial",
  diabetesHistoricoFamiliar = "Diabetes",
  cardiopatiaHistoricoFamiliar = "Cardiopatia",
  alergiasHistoricoFamiliar = "Alergias",
  hipoHipertireoidismoHistoricoFamiliar = "Hipo/Hipertireoidismo",
  doencasAutoimunesHistoricoFamiliar = "Doenças autoimunes",
  doencasPsiquiatricasHistoricoFamiliar = "Doenças psiquiátricas",
  cancerHistoricoFamiliar = "Câncer",
  preEclampsiaEclampsiaHistoricoObstetrico = "Pré-eclâmpsia/eclâmpsia",
  incIstmocervicaHistoricoObstetrico = "Inc. istmocervical",
  prematuridadHistoricoObstetrico = "Prematuridade",
  isoimunizacaoRHHistoricoObstetrico = "Isoimunização do Rh",
  oligoPolidramioHistoricoObstetrico = "Oligo/Polidrâmio",
  ciurHistoricoObstetrico = "CIUR",
  posDatismoHistoricoObstetrico = "Pós-datismo",
  anemiaHistoricoObstetrico = "Anemia",
  toxoplasmoseHistoricoObstetrico = "Toxoplasmose",
  ituPielonefriteHistoricoObstetrico = "ITU/Pielonefrite",
  historicoObstetricoHistoricoObstetrico = "Hemorragia pós-parto",
  hemorragiaPrimeiroTrimestreHistoricoObstetrico = "Hemorragia 1º Trimestre",
  hemorragiaSegundoTrimestreHistoricoObstetrico = "Hemorragia 2º Trimestre",
  maFormacaoSindromeHistoricoObstetrico = "Má-formação/Síndrome",
}

export const historicoData = [
  { name: historicoEnum.hipertensaoArterialHistoricoPessoal, checked: false },
  { name: historicoEnum.diabetesHistoricoPessoal, checked: false },
  { name: historicoEnum.cardiopatiaHistoricoPessoal, checked: false },
  { name: historicoEnum.cirugiaHistoricoPessoal, checked: false },
  { name: historicoEnum.cirugiaPelvUlterinaHistoricoPessoal, checked: false },
  { name: historicoEnum.alergiasHistoricoPessoal, checked: false },
];
export const historicoData2 = [
  { name: historicoEnum.gemelarHistoricoPessoal, checked: false },
  { name: historicoEnum.infeccaoUrinariaHistoricoPessoal, checked: false },
  { name: historicoEnum.transfSanguineaHistoricoPessoal, checked: false },
  { name: historicoEnum.tromboembolismoHistoricoPessoal, checked: false },
  { name: historicoEnum.lupusHistoricoPessoal, checked: false },
  { name: historicoEnum.doencasPsiquiatricasHistoricoPessoal, checked: false },
];

export const historicoFamiliarData = [
  {
    name: historicoEnum.hipertensaoArterialHistoricoFamiliar,
    checked: false,
  },
  { name: historicoEnum.diabetesHistoricoFamiliar, checked: false },
  { name: historicoEnum.cardiopatiaHistoricoFamiliar, checked: false },
  { name: historicoEnum.alergiasHistoricoFamiliar, checked: false },
];
export const historicoFamiliarData2 = [
  {
    name: historicoEnum.hipoHipertireoidismoHistoricoFamiliar,
    checked: false,
  },
  {
    name: historicoEnum.doencasAutoimunesHistoricoFamiliar,
    checked: false,
  },
  {
    name: historicoEnum.doencasPsiquiatricasHistoricoFamiliar,
    checked: false,
  },
  { name: historicoEnum.cancerHistoricoFamiliar, checked: false },
];

export const historicoObstetricoData = [
  {
    name: historicoEnum.preEclampsiaEclampsiaHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.incIstmocervicaHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.prematuridadHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.isoimunizacaoRHHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.oligoPolidramioHistoricoObstetrico,
    checked: false,
  },
  { name: historicoEnum.ciurHistoricoObstetrico, checked: false },
  {
    name: historicoEnum.posDatismoHistoricoObstetrico,
    checked: false,
  },
];

export const historicoObstetricoData2 = [
  { name: historicoEnum.anemiaHistoricoObstetrico, checked: false },
  {
    name: historicoEnum.toxoplasmoseHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.ituPielonefriteHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.historicoObstetricoHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.hemorragiaPrimeiroTrimestreHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.hemorragiaSegundoTrimestreHistoricoObstetrico,
    checked: false,
  },
  {
    name: historicoEnum.maFormacaoSindromeHistoricoObstetrico,
    checked: false,
  },
];
