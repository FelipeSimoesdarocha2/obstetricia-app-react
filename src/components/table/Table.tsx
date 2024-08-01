import { Skeleton } from "@mui/material";
import React, { ReactElement } from "react";
import styles from "./Table.module.scss";

export interface ITableHead {
  name: string;
}

export interface ITableColumn {
  id: string;
  value: string | number | ReactElement;
}

export interface ITableRow {
  id: string;
  columns: ITableColumn[];
}

export interface ITableBody {
  rows: ITableRow[];
}

interface ITableProps {
  head: ITableHead[];
  body: ITableBody;
  isLoading: boolean;
  onClickRow?: (row: ITableRow) => void;
}

function Table(props: ITableProps) {
  const { head, body, isLoading, onClickRow } = props;

  const onClick = (row: ITableRow) => {
    if (!onClickRow) {
      return;
    }

    onClickRow(row);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h.name}>{h.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!body.rows?.length ? (
              <tr className={styles.noRegistries}>
                <td colSpan={head.length}>Nenhum registro encontrado.</td>
              </tr>
            ) : (
              body.rows.map((row) => (
                <tr
                  className={onClickRow ? styles.trBody : ""}
                  onClick={(_) => onClick(row)}
                  key={row.id}
                >
                  {row.columns.map((column) => (
                    <td key={column.id}>{column.value}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

Table.defaultProps = {
  onClickRow: undefined,
};

export default Table;
