import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Table, {
  ITableBody,
  ITableHead,
  ITableRow,
} from "../../../../components/table/Table";
import patientHttp, {
  IPatientSearch,
  IPatientsResponse,
} from "../../../../@core/@http/patient/patient";
import styles from "./PatientsList.module.scss";
import defaultUser from "../../../../@core/images/ProfilePicture.png";
import { IPatient, IPatientList } from "../../../../@core/models/patient";
import Search from "../../../../components/search/Search";
import Pagination from "../../../../components/pagination/Pagination";
import { useQuery } from "../../../../@core/hooks/query";
import Switch from "../../../../components/switch/Switch";
import Welcome from "../@components/welcome/Welcome";

import { useToast } from "../../../../providers/ToastProvider/ToastProvider";

const tableHead: ITableHead[] = [
  {
    name: "Paciente",
  },
  {
    name: "",
  },
  {
    name: "Próxima Consulta",
  },
  {
    name: "Data Provável",
  },
  {
    name: "Risco",
  },
  {
    name: "Internada",
  },
  {
    name: "Local",
  },
];

interface IPatientsListProps {
  onClickPatient(patient: IPatient): void;
}

const defaultPatientsSearch = {
  nome: "",
  page: 1,
  finished: false,
};

function PatientsList(props: IPatientsListProps) {
  const [body, setBody] = useState<ITableBody>({ rows: [] });
  const [patientsStore, setPatientsStore] = useState<IPatientList>({
    results: [],
    totalPages: 0,
  });
  const [patientsSearch, setPatientsSearch] = useState<IPatientSearch>(
    defaultPatientsSearch
  );

  const [loadingPatients, setLoadingPatients] = useState(false);
  const [hasPatients, setHasPatients] = useState(-1);

  const loading = hasPatients === -1;
  const noHasPatients = hasPatients === 0;

  const query = useQuery();
  const { onClickPatient } = props;

  const { toast } = useToast();

  useEffect(() => {
    const selectedPatient = query.get("selectedPatient");

    if (selectedPatient) {
      const patient = patientsStore.results.find(
        (p) => p.id === selectedPatient
      );

      if (patient) {
        onClickPatient(patient);
      }
    }
  }, [patientsStore]);

  const onClickRow = (row: ITableRow) => {
    const patient = patientsStore.results.find(
      (patient) => row.id === patient.id
    );
    if (!patient) {
      return;
    }

    onClickPatient(patient);
  };

  const changePatientsList = (response: IPatientsResponse) => {
    setPatientsStore({
      totalPages: response.totalPages,
      results: [...response.results],
    });

    setBody({
      rows: response.results.map((patient) => ({
        id: patient.id,
        columns: [
          {
            id: `paciente-${patient.id}`,
            value: (
              <>
                <img
                  src={patient.imageUrl ?? defaultUser}
                  className={styles.patientImage}
                  alt="Paciente"
                />{" "}
              </>
            ),
          },
          {
            id: `nome-${patient.id}`,
            value: <span className={styles.patientName}>{patient.nome}</span>,
          },
          {
            id: `proxima-consulta-${patient.id}`,
            value:
              patient.proximaConsulta == null
                ? "Não informado"
                : patient.proximaConsulta?.toLocaleDateString("pt-BR"),
          },
          {
            id: `data-provavel-${patient.id}`,
            value: patient.dataProvavel.toLocaleDateString("pt-BR"),
          },
          {
            id: `risco-${patient.id}`,
            value: patient.risco ? "Sim" : "Não",
          },
          {
            id: `internada-${patient.id}`,
            value: patient.internada ? "Sim" : "Não",
          },
          {
            id: `procedencia-${patient.procedencia}`,
            value: patient.procedencia,
          },
        ],
      })),
    });
  };

  const verifyIfHasPatients = async () => {
    try {
      if (hasPatients === -1) {
        let response = await patientHttp.getPatients({
          page: 1,
          nome: "",
          finished: false,
        });

        if (response.results.length === 0) {
          response = await patientHttp.getPatients({
            page: 1,
            nome: "",
            finished: true,
          });
        }

        setHasPatients(response.results.length);
      }
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
    }
  };

  const getPatients = async (search: IPatientSearch) => {
    try {
      setLoadingPatients(true);
      const response = await patientHttp.getPatients(search);

      changePatientsList(response);
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
    } finally {
      setLoadingPatients(false);
    }
  };

  useEffect(() => {
    getPatients(patientsSearch);
  }, [patientsSearch]);

  useEffect(() => {
    verifyIfHasPatients();
  }, []);

  const onChangeName = (nome: string) => {
    setPatientsSearch({ ...patientsSearch, page: 1, nome });
  };

  const onChangePage = (page: number) => {
    setPatientsSearch({ ...patientsSearch, page });
  };

  const toggleFinalizadas = () => {
    setPatientsSearch({
      ...patientsSearch,
      finished: !patientsSearch.finished,
    });
  };

  if (loading) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={styles.container}
      >
        <CircularProgress sx={{ color: "#3E6C75" }} />
      </Stack>
    );
  }

  if (noHasPatients) {
    return <Welcome />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search}>
          <Search search={patientsSearch.nome} onChange={onChangeName} />
        </div>

        <div className={styles.showFinalizadas}>
          <p className={styles.text}>Mostrar Finalizadas</p>
          <Switch onChange={toggleFinalizadas} />
        </div>
      </div>

      <div className={styles.table}>
        <Table
          body={body}
          head={tableHead}
          isLoading={loadingPatients}
          onClickRow={onClickRow}
        />
      </div>

      <div className={styles.pagination}>
        <Pagination
          currentPage={patientsSearch.page}
          totalPages={patientsStore.totalPages}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  );
}

export default PatientsList;
