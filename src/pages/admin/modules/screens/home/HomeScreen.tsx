// React
import { useEffect, useState } from "react";

// Styles
import * as S from "./Home.styles";

// Api
import { getHome } from "../../../services/api";

// Models
import { DataItemCardsApi } from "../../../models";

// Components
import { Cards } from "../../components/cards";
import { Charts } from "../../components/charts";

const HomeScreen = () => {
  const [cardsData, setCardsData] = useState({} as DataItemCardsApi);

  const fetchData = async () => {
    try {
      const { data }: any = await getHome();
      setCardsData(data);
    } catch (e) {
      console.log("error login", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderCards = (data: DataItemCardsApi) => {
    if (data?.gestantes) {
      return Object.entries(data).map(([key, value], index) => {
        const capitalizedKey = capitalizeFirstLetter(key);
        return (
          <Cards
            key={index}
            name={capitalizedKey}
            data={"7"}
            value={value.quantity}
            porcentage={value.porcentage}
          />
        );
      });
    }
  };

  return (
    <S.Container>
      <S.Content>{renderCards(cardsData)}</S.Content>
      <S.ContentCharts>
        <Charts.NewChart />
        <Charts.ActivesChart />
        <Charts.RatiosChart />
        <Charts.RetentionChart />
      </S.ContentCharts>
    </S.Container>
  );
};

export default HomeScreen;
