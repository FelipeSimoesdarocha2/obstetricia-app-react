// React
import { useState, useEffect, ChangeEvent } from "react";

// Styles
import * as S from "./Gestantes.styles";

// Models
import { DataItemGestantes, GestationReminder } from "../../../models";

// Api
import {
  getGestantes,
  deleteGestantes,
  createMonitoringReminder,
  getMonitoringReminder,
} from "../../../services/api";

// Components
import { Button } from "../../components/button";
import { Filter } from "../../components/filter";
import { GestantesForm } from "../../components/gestantesForm";
import { GestantesTable } from "../../components/gestantesTable";
import { Modal } from "../../components/modal";
import { Search } from "../../components/search";

// Formik
import { useFormik, FormikProvider } from "formik";

// Hooks
import useValidationSchema from "pages/admin/hooks/useValidationSchema";

// Moment
import dayjs from "dayjs";

// Antd
import { TimePicker } from "antd";
import moment from "moment";

const GestantesScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [data, setData] = useState<DataItemGestantes[]>([]);
  const [reminderState, setReminderState] = useState<{
    isOpen: boolean;
    index: number | null;
    itemId: string;
  }>({
    isOpen: false,
    index: null,
    itemId: "",
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isOpenDeleteItem, setIsOpenDeleteItem] = useState(false);
  const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(
    null
  );
  const [time, setTime] = useState({
    hours: parseInt(moment().format("HH")),
    minutes: parseInt(moment().format("mm")),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      className: "hover-effect",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "DPP", dataIndex: "ddp", key: "ddp" },
    { title: "Telefone", dataIndex: "phone", key: "phone" },
    { title: "Obstetra", dataIndex: "obstetra", key: "obstetra" },
    { title: "Monitoramentos", dataIndex: "monitoring", key: "monitoring" },
    { title: "Atividade", dataIndex: "activity", key: "activity" },
  ];

  const handleReminderItens = (itemId: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          formik.setFieldValue(item.label.toLowerCase(), !item.checked);
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  let filteredData: DataItemGestantes[] = [];

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
        await deleteGestantes(item.id);

        setData((prevData) => {
          const newData = [...prevData];
          newData.splice(deleteButtonIndex, 1);
          return newData;
        });

        setSelectedItems(
          selectedItems.filter((item) => item !== deleteButtonIndex)
        );
      }
    } catch (error) {
      console.error("Erro ao excluir o item: ", error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const index of selectedItems) {
        const item = filteredData[index];
        await deleteGestantes(item.id);
      }

      setData((prevData) => {
        const newData = prevData.filter(
          (item, index) => !selectedItems.includes(index)
        );
        return newData;
      });

      setSelectedItems([]);
      setIsOpenDelete(false);
    } catch (error) {
      console.error("Erro ao excluir os itens selecionados: ", error);
    }
  };

  const fetchData = async () => {
    const response = await getGestantes();

    const gestantesFormat = response.data;

    setData(gestantesFormat);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDataMonitoring = async () => {
    if (reminderState.itemId) {
      await getMonitoringReminder(reminderState.itemId);
    }
  };

  useEffect(() => {
    fetchDataMonitoring();
  }, []);

  const initialValues: GestationReminder = {
    gestationId: "",
    active: true,
    hours: 0,
    minutes: 0,
    humor: false,
    symptoms: false,
    weigth: false,
    bloodPressure: false,
    fetalMoviments: false,
    glucoseFasting: false,
    glucosePostPrandial: false,
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const dataRequest: GestationReminder = {
        gestationId: reminderState.itemId,
        active: formik.values.active,
        hours: time.hours,
        minutes: time.minutes,
        humor: items.find((item) => item.id === 3)?.checked || false,
        symptoms: items.find((item) => item.id === 4)?.checked || false,
        weigth: items.find((item) => item.id === 6)?.checked || false,
        bloodPressure: items.find((item) => item.id === 1)?.checked || false,
        fetalMoviments: items.find((item) => item.id === 5)?.checked || false,
        glucoseFasting: items.find((item) => item.id === 2)?.checked || false,
        glucosePostPrandial: formik.values.glucosePostPrandial,
      };

      const response = await createMonitoringReminder(dataRequest);
      console.log("response", response);

      formik.resetForm({
        values: {
          ...initialValues,
          humor: false,
          symptoms: false,
          weigth: false,
          bloodPressure: false,
          fetalMoviments: false,
          glucoseFasting: false,
          glucosePostPrandial: formik.values.glucosePostPrandial,
        },
      });

      setItems([
        { id: 1, label: "Pressão", checked: false },
        { id: 2, label: "Glicemia", checked: false },
        { id: 3, label: "Humor", checked: false },
        { id: 4, label: "Sintomas", checked: false },
        { id: 5, label: "Mov. Fetais", checked: false },
        { id: 6, label: "Peso", checked: false },
      ]);

      setReminderState({ isOpen: false, index: null, itemId: "" });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    enableReinitialize: true,
    validationSchema: useValidationSchema(),
    onSubmit,
  });

  const [items, setItems] = useState([
    { id: 1, label: "Pressão", checked: formik.values.bloodPressure },
    { id: 2, label: "Glicemia", checked: formik.values.glucoseFasting },
    { id: 3, label: "Humor", checked: formik.values.humor },
    { id: 4, label: "Sintomas", checked: formik.values.symptoms },
    { id: 5, label: "Mov. Fetais", checked: formik.values.fetalMoviments },
    { id: 6, label: "Peso", checked: formik.values.weigth },
  ]);

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
        <GestantesForm
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

      <Modal
        open={reminderState.isOpen}
        onClose={() =>
          setReminderState({ isOpen: false, index: null, itemId: "" })
        }
      >
        <h2>Adicionar lembrete</h2>
        <div className="contentReminder">
          <div className="time">
            <p>Horário</p>
            <TimePicker
              format="HH:mm"
              placeholder="00:00"
              defaultValue={dayjs()}
              onChange={(value) => {
                const selectedTime = value
                  ? value.format("HH:mm").split(":")
                  : ["", ""];
                setTime({
                  hours: parseInt(selectedTime[0], 10),
                  minutes: parseInt(selectedTime[1], 10),
                });
              }}
            />
          </div>
          <FormikProvider value={formik}>
            {items.map((item) => (
              <div key={item.id} className="itenCheck">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleReminderItens(item.id)}
                  />
                  <label>{item.label}</label>
                </div>
              </div>
            ))}
          </FormikProvider>
        </div>
        <div className="actions_modal">
          <Button
            label={"Cancelar"}
            type="primary"
            onClick={() =>
              setReminderState({ isOpen: false, index: null, itemId: "" })
            }
          />
          <Button
            label={"Salvar"}
            type="secondary"
            onClick={onSubmit}
            loading={isLoading}
          />
        </div>
      </Modal>

      <GestantesTable
        columns={columns}
        data={filteredData}
        handleCheckboxChange={handleCheckboxChange}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        OpenModal={({ index, itemId }) => {
          setReminderState({ isOpen: true, index, itemId });
        }}
        handleDeleteItemConfirmation={handleDeleteItemConfirmation}
      />
    </S.Container>
  );
};

export default GestantesScreen;
