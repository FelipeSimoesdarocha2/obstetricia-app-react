// React
import { SetStateAction, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js";

// Assets
import DotsVertical from "assets/icons/dots-vertical.svg";

// Styles
import * as S from "./Charts.styles";

// Models
import { TypeTabGrafico } from "../../../models";

// Services
import { getGraficoAtivos } from "../../../services/api";

// Moment
import moment from "moment";

// Components
import { Broadcast } from "../broadcast";

// Chart.js
import {
  Title,
  Chart,
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
} from "chart.js";

Chart.register(
  Title,
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale
);

const ActivesChart = () => {
  const [array, setArray] = useState<any>([]);
  const [dataFinal, setDataFinal] = useState(moment());
  const [selectedPeriod, setSelectedPeriod] = useState("2");
  const [dataInicio, setDataInicio] = useState(moment().subtract(7, "days"));

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  const handleDateChangeInicio = (e: {
    target: { value: moment.MomentInput };
  }) => {
    const date = moment(e.target.value);
    setDataInicio(date);
  };

  const handleDateChangeFinal = (e: {
    target: { value: moment.MomentInput };
  }) => {
    const date = moment(e.target.value);
    setDataFinal(date);
  };

  const [menu, setMenu] = useState([
    {
      name: "Obstetras",
      selected: true,
      data: {},
      id: TypeTabGrafico.OBSTETRAS,
    },
    {
      name: "Gestantes",
      selected: false,
      data: {},
      id: TypeTabGrafico.GESTANTES,
    },
  ]);

  const updateSelectedMenu = (index: number) => {
    const updatedMenu = menu.map((item, i) => {
      if (i === index) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });

    return updatedMenu;
  };

  const handleMenuClick = (index: number) => {
    const updatedMenu = updateSelectedMenu(index);
    setMenu(updatedMenu);
  };

  const handlePeriodChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedPeriod(e.target.value);
  };

  const fetchDataGraficoAtivos = async (tab: TypeTabGrafico) => {
    const inicio = dataInicio.toISOString();
    const final = dataFinal.toISOString();
    const type = parseInt(selectedPeriod);

    const response = await getGraficoAtivos(inicio, final, type, tab);
    updateMenuWithData(response, tab);
  };

  const updateMenuWithData = (response: any, id: any) => {
    if (id === TypeTabGrafico.OBSTETRAS) {
      const newData = {
        labels: response.data.obstetras.map(
          (item: { quantidade: number; date: string }) =>
            moment(item.date).format(
              selectedPeriod === "3" ? "MM/YYYY" : "DD/MM"
            )
        ),
        values: response.data.obstetras.map(
          (item: { quantidade: number; date: string }) => item.quantidade
        ),
        id: TypeTabGrafico.OBSTETRAS,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
      // setMenu();
    }
    if (id === TypeTabGrafico.GESTANTES) {
      const newData = {
        labels: response.data.gestantes.map(
          (item: { quantidade: number; date: string }) =>
            moment(item.date).format(
              selectedPeriod === "3" ? "MM/YYYY" : "DD/MM"
            )
        ),
        values: response.data.gestantes.map(
          (item: { quantidade: number; date: string }) => item.quantidade
        ),
        id: TypeTabGrafico.GESTANTES,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
    if (id === TypeTabGrafico.MONITORAMENTOS) {
      const newData = {
        labels: response.data.monitoramentos.map(
          (item: { quantidade: number; date: string }) =>
            moment(item.date).format(
              selectedPeriod === "3" ? "MM/YYYY" : "DD/MM"
            )
        ),
        values: response.data.monitoramentos.map(
          (item: { quantidade: number; date: string }) => item.quantidade
        ),
        id: TypeTabGrafico.MONITORAMENTOS,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
    if (id === TypeTabGrafico.LEMBRETES) {
      const newData = {
        labels: response.data.lembretes.map(
          (item: { quantidade: number; date: string }) =>
            moment(item.date).format(
              selectedPeriod === "3" ? "MM/YYYY" : "DD/MM"
            )
        ),
        values: response.data.lembretes.map(
          (item: { quantidade: number; date: string }) => item.quantidade
        ),
        id: TypeTabGrafico.LEMBRETES,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
  };

  useEffect(() => {
    setArray([]);
    fetchDataGraficoAtivos(TypeTabGrafico.OBSTETRAS);
    fetchDataGraficoAtivos(TypeTabGrafico.GESTANTES);
  }, [dataInicio, dataFinal, selectedPeriod]);

  return (
    <S.Component>
      <div className="header_chart">
        <Broadcast name={"Ativos"} />
        <img src={DotsVertical} alt="icon" />
      </div>

      <div className="filterDate">
        <input
          type="date"
          value={dataInicio.format("YYYY-MM-DD")}
          onChange={handleDateChangeInicio}
        />
        -
        <input
          type="date"
          value={dataFinal.format("YYYY-MM-DD")}
          onChange={handleDateChangeFinal}
        />
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="1">Diário</option>
          <option value="2">Mensal</option>
          <option value="3">Anual</option>
        </select>
      </div>

      <S.ChartStyle>
        <ul>
          {menu.length > 0 &&
            menu.map((menuItem, index) => (
              <li
                key={index}
                onClick={() => handleMenuClick(index)}
                style={{
                  borderBottom: menuItem.selected
                    ? "3px solid #2613f5 "
                    : " 3px solid #e9e7fd",
                  cursor: "pointer",
                }}
              >
                <p>{menuItem.name}</p>
              </li>
            ))}
        </ul>
        {menu.length > 0 &&
          menu.map((menuItem, index) => {
            return menuItem.selected ? (
              <Line
                key={index}
                data={{
                  labels: array?.filter(
                    (e: { id: TypeTabGrafico }) => e.id === menuItem.id
                  )[0]?.labels,
                  datasets: [
                    {
                      label: "Obstetras",
                      data: array?.filter(
                        (e: { id: TypeTabGrafico }) => e.id === menuItem.id
                      )[0]?.values,
                      fill: false,
                      borderColor: "#0F60FF",
                      borderWidth: 4,
                    },
                  ],
                }}
                options={options}
              />
            ) : null;
          })}
      </S.ChartStyle>
    </S.Component>
  );
};

export default ActivesChart;
