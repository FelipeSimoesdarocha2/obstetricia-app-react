import React from "react";
import { Skeleton } from "@mui/material";
import NoContent from "../../../../../../components/no-content/NoContent";
import Tag from "../../../../../../components/tag/Tag";
import styles from "./PatientProblems.module.scss";

import { IPatientProblems } from '../../../../../../@core/models/patient'

interface IPatientProblemsListProps {
  problems: IPatientProblems[];
}

interface IPatientProblemsProps {
  isLoading: boolean;
  problems: IPatientProblems[];
}

function PatientProblemsList(props: IPatientProblemsListProps) {
  const { problems } = props;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!problems || !problems.length ? (
        <NoContent />
      ) : (
        <>
          {problems.map(({id, name}) => (
            <Tag name={name} key={id} type="secondary" />
          ))}
        </>
      )}
    </>
  );
}

function PatientProblems(props: IPatientProblemsProps) {
  const { isLoading, problems } = props;

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Skeleton height={50} width={80} />
          <Skeleton height={50} width={90} />
          <Skeleton height={50} width={85} />
          <Skeleton height={50} width={82} />
          <Skeleton height={50} width={50} />
          <Skeleton height={50} width={55} />
          <Skeleton height={50} width={88} />
        </div>
      ) : (
        <PatientProblemsList problems={problems} />
      )}
    </div>
  );
}

export default PatientProblems;
