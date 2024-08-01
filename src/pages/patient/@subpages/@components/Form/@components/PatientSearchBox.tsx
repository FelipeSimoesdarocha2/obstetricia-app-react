import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import SearchBox, {
  ISearchBoxItem,
} from "../../../../../../components/search-box/SearchBox";
import healthProblemsHttp from "../../../../../../@core/@http/doctor/healthProblems";
import { LocalStorage } from "../../../../../../@core/helpers/localStorage";
import Tag from "../../../../../../components/tag/Tag";
import styles from "./PatientSearchBox.module.scss";
import Button from "../../../../../../components/button/Button";

interface IPatientSearchBox {
  values?: ISearchBoxItem[];
  title?: string;
  onSelectItem(searchBoxItem: ISearchBoxItem): void;
  onRemoveItem(searchBoxItem: ISearchBoxItem): void;
}

function PatientSearchBox(props: IPatientSearchBox) {
  const { onSelectItem, onRemoveItem, values, title } = props;
  const doctorId = localStorage.getItem(LocalStorage.DoctorId) ?? "";

  const [search, setSearch] = useState("");
  const [items, setItems] = useState<ISearchBoxItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ISearchBoxItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [problemToCreate, setProblemToCreate] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCreateButton, setShowCreateButton] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<ISearchBoxItem>();

  const onClickOpenModal = () => {
    setModalOpen(true);
  };

  const onChangeSearch = async (description: any) => {
    setSearch(description);
    setShowCreateButton(false);

    if (!description) {
      setItems([]);
      return;
    }

    const items = await healthProblemsHttp.searchHealthProblemsByDoctorId({
      doctorId,
      description,
    });

    setShowCreateButton(items.length === 0);

    if (items.length > 0) {
      setItems([
        ...items.slice(0, 3).map((item) => ({
          id: item.healthProblemsId,
          name: item.description,
          isRegistered: true,
        })),
      ]);
    }
  };

  const onSelect = (item: ISearchBoxItem) => {
    const newItems = [...selectedItems];

    if (newItems.map((i) => i.id).includes(item.id)) {
      return;
    }

    newItems.push(item);

    setSelectedItems([...newItems]);

    onSelectItem(item);
  };

  const removeProblem = (item: ISearchBoxItem) => {
    const newItems = [...selectedItems];

    if (!newItems.map((i) => i.id).includes(item.id)) {
      return;
    }

    const index = newItems.findIndex((i) => i.id === item.id);
    newItems.splice(index, 1);

    setSelectedItems([...newItems]);
    setConfirmDelete(undefined);

    onRemoveItem(item);
  };

  const handleRemoveProblem = (item: ISearchBoxItem) => {
    if (values?.length) {
      const itemToRemove = values.find((i) => i.id === item.id);

      if (itemToRemove) {
        setConfirmDelete(item);
        return;
      }
    }

    removeProblem(item);
  };

  const onClickCloseModal = () => {
    setSearch("");
    setShowCreateButton(false);
    setModalOpen(false);
  };

  const createProblem = async () => {
    setLoading(true);

    try {
      const problem = await healthProblemsHttp.createProblem({
        doctorId,
        description: problemToCreate,
      });

      onSelect({
        id: problem.healthProblemsId,
        name: problemToCreate,
      });

      onClickCloseModal();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProblem = async () => {
    const items = await healthProblemsHttp.searchHealthProblemsByDoctorId({
      doctorId,
      description: search,
    });

    if (!items.length) {
      onClickOpenModal();

      setProblemToCreate(search);
    }
  };

  const handleLoadingItems = (isLoading: boolean) => {
    if (isLoading) {
      setShowCreateButton(false);
      setItems([]);
    }
  };

  useEffect(() => {
    if (values) {
      setSelectedItems(values);
    }
  }, [values]);

  return (
    <div className={styles.container}>
      <SearchBox
        label={title ?? "Apresenta quais problemas?"}
        search={search}
        onSelectItem={onSelect}
        items={items}
        onChange={onChangeSearch}
        onEnterPress={onChangeSearch}
        onLoading={handleLoadingItems}
      >
        {showCreateButton && (
          <li
            className="animate__animated animate__headShake"
            onClick={handleCreateProblem}
          >
            <Tag
              name="Criar Problema"
              className={styles.tag}
              type="secondary"
            />
          </li>
        )}
      </SearchBox>

      <div className={styles.tags}>
        {selectedItems.map((selectedItem) => (
          <Tag
            canClose
            key={selectedItem.id}
            name={selectedItem.name}
            type="secondary"
            onClose={() => handleRemoveProblem(selectedItem)}
          />
        ))}
      </div>

      <Dialog
        open={modalOpen}
        onClose={onClickCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja realmente criar esse problema?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar essa ação o problema <strong>{problemToCreate}</strong>{" "}
            será criado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            loading={loading}
            className={styles.btn}
            onClick={createProblem}
            title="Aceitar"
            name="Aceitar"
          />
          <Button
            className={styles.btn}
            type="secondary"
            onClick={onClickCloseModal}
            title="Cancelar"
            name="Cancelar"
          />
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(undefined)}
      >
        <DialogTitle>Tem certeza que deseja excluir esse problema?</DialogTitle>
        <DialogActions>
          <Button
            loading={loading}
            className={styles.btn}
            onClick={() => removeProblem(confirmDelete as ISearchBoxItem)}
            title="Sim"
            name="Sim"
          />
          <Button
            className={styles.btn}
            type="secondary"
            onClick={() => setConfirmDelete(undefined)}
            title="Não"
            name="Não"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

PatientSearchBox.defaultProps = {
  values: [],
};

export default PatientSearchBox;
