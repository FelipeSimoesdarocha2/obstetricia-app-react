// React
import { useState, useEffect, ChangeEvent } from "react";

// Styles
import * as S from "./Obstetras.styles";

// Models
import { DataItemObstetras } from "../../../models";

// Api
import { deleteObstetras, getObstetras } from "../../../services/api";

// Components
import { Button } from "../../components/button";
import { Filter } from "../../components/filter";
import { Modal } from "../../components/modal";
import { ObstetrasForm } from "../../components/obstetrasForm";
import { ObstetrasTable } from "../../components/obstetrasTable";
import { Search } from "../../components/search";

const ObstetrasScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenDeleteItem, setIsOpenDeleteItem] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(null);

  const columns = [
    { title: "User", dataIndex: "user", key: "user" },
    {
      title: "Nº Gestantes",
      dataIndex: "pregnant_women",
      key: "pregnant_women",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Telefone", dataIndex: "phone", key: "phone" },
    { title: "Estado", dataIndex: "state", key: "state" },
    { title: "Data de criação", dataIndex: "created_at", key: "created_at" },
    { title: "Atividade", dataIndex: "activity", key: "activity" },
  ];

  const [data, setData] = useState<DataItemObstetras[]>([]);

  const handleSearchChange = (value: string) => {
    if (!isOpen) {
      setSearchValue(value);
    }
  };

  let filteredData: DataItemObstetras[] = [];

  if (data && data.length > 0) {
    filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedItems([...selectedItems, index]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    }
  };

  const handleDeleteItemConfirmation = (index: number) => {
    setIsOpenDeleteItem(true);
    setDeleteButtonIndex(index);
  };

  const handleDeleteConfirmation = async () => {
    try {
      setIsOpenDeleteItem(false);

      if (deleteButtonIndex !== null) {
        const item = filteredData[deleteButtonIndex];
        await deleteObstetras(item.id);

        setData((prevData) => {
          const newData = [...prevData];
          newData.splice(deleteButtonIndex, 1);
          return newData;
        });

        setSelectedItems(selectedItems.filter((item) => item !== deleteButtonIndex));
      }
    } catch (error) {
      console.error("Erro ao excluir o item: ", error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const index of selectedItems) {
        const item = filteredData[index];
        await deleteObstetras(item.id);
      }

      setData((prevData) => {
        const newData = prevData.filter((item, index) => !selectedItems.includes(index));
        return newData;
      });

      setSelectedItems([]);
      setIsOpenDelete(false);
    } catch (error) {
      console.error("Erro ao excluir os itens selecionados: ", error);
    }
  };

  const fetchData = async () => {
    const response = await getObstetras();

    const gestantesFormat = response.data;

    setData(gestantesFormat);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <div className="filters">
          <Search
            id="name"
            title="Pesquisar"
            key="input-name"
            data-testid="name"
            value={searchValue}
            onChange={handleSearchChange}
            autocomplete="name"
          />
          <Filter />
        </div>
        <div className="actions">
          <Button
            label={"Adicionar"}
            onClick={() => setIsOpen(true)}
            type="secondary"
          />
          <Button
            label={"Deletar"}
            onClick={() => setIsOpenDelete(true)}
            type="secondary"
            disabled={selectedItems.length === 0}
          />
        </div>
      </S.Header>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ObstetrasForm
          data={data}
          setData={setData}
          onClose={() => setIsOpen(false)}
        />
      </Modal>

      <Modal open={isOpenDeleteItem} onClose={() => setIsOpenDeleteItem(false)}>
        <h2>Tem certeza que quer deletar?</h2>
        <p>Deletar pode ser perigoso!</p>
        <div className="actions_modal">
          <Button
            label={"Cancelar"}
            type="primary"
            onClick={() => setIsOpenDeleteItem(false)}
          />
          <Button
            label={"Deletar"}
            type="secondary"
            onClick={handleDeleteConfirmation}
          />
        </div>
      </Modal>

      <Modal open={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
        <h2>Tem certeza que quer deletar?</h2>
        <p>Deletar pode ser perigoso!</p>
        <div className="actions_modal">
          <Button
            label={"Cancelar"}
            type="primary"
            onClick={() => setIsOpenDelete(false)}
          />
          <Button
            label={"Deletar"}
            type="secondary"
            onClick={handleDeleteSelected}
          />
        </div>
      </Modal>
      <ObstetrasTable
        columns={columns}
        data={filteredData}
        handleCheckboxChange={handleCheckboxChange}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleDeleteItemConfirmation={handleDeleteItemConfirmation}
      />
    </S.Container>
  );
};

export default ObstetrasScreen;
