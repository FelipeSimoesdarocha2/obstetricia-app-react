// React
import { SetStateAction, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js";

// Assets
import DotsVertical from "assets/icons/dots-vertical.svg";

// Styles
import * as S from "./Charts.styles";

// Models
import { TypeTabGraficoRetention } from "../../../models";

// Services
import { getGraficoRetencao } from "../../../services/api";

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

const RetentionChart = () => {
  const [array, setArray] = useState<any>([]);
  const [dataFinal, setDataFinal] = useState(moment());
  const [selectedPeriod, setSelectedPeriod] = useState("1");
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
    // {
    //   name: "App",
    //   selected: true,
    //   data: {},
    //   id: TypeTabGraficoRetention.APP,
    // },
    {
      name: "Site",
      selected: true,
      data: {},
      id: TypeTabGraficoRetention.SITE,
    }
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


  const fetchDataGrafico = async (tab: TypeTabGraficoRetention) => {
    const inicio = dataInicio.toISOString();
    const final = dataFinal.toISOString();
    const type = parseInt(selectedPeriod);
    const aplicacao = tab;

    try {
      const response = await getGraficoRetencao(inicio, final, aplicacao, type);
      updateMenuWithData(response, tab);
    } catch (e) {
      console.log("error", e);
    }
  };

  const updateMenuWithData = (response: any, id: any) => {
    // if (id === TypeTabGraficoRetention.APP) {
    //   const newData = {
    //     labels: response.data.app.map(
    //       (item: { quantidade: number; date: string }) =>
    //         moment(item.date).format(
    //           selectedPeriod === "3" ? "MM/YYYY" : "DD/MM"
    //         )
    //     ),
    //     values: response.data.app.map(
    //       (item: { quantidade: number; date: string }) => item.quantidade
    //     ),
    //     id: TypeTabGraficoRetention.APP,
    //   };
    //   setArray((prevArray: any) => [...prevArray, newData]);
    // }

    if (id === TypeTabGraficoRetention.SITE) {
      const newData = {
        labels: response.data.site.map(
          (item: { quantidade: number; date: string }) =>
            moment(item.date).format(
              selectedPeriod === "3" ? "MM/YYYY" : "DD/MM"
            )
        ),
        values: response.data.site.map(
          (item: { quantidade: number; date: string }) => item.quantidade
        ),
        id: TypeTabGraficoRetention.SITE,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
  };

  useEffect(() => {
    setArray([]);
    // fetchDataGrafico(TypeTabGraficoRetention.APP);
    fetchDataGrafico(TypeTabGraficoRetention.SITE);
  }, [dataInicio, dataFinal, selectedPeriod]);

  return (
    <S.Component>
      <div className="header_chart">
        <Broadcast name={"Retenção"} />
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
                    (e: { id: TypeTabGraficoRetention }) => e.id === menuItem.id
                  )[0]?.labels,
                  datasets: [
                    {
                      label: "Obstetras",
                      data: array?.filter(
                        (e: { id: TypeTabGraficoRetention }) => e.id === menuItem.id
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

export default RetentionChart;
