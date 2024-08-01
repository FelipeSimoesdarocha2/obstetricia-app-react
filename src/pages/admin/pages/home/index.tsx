// Modules
import { HomeScreen } from "../../modules/screens/home";

// Components
import { Layout } from "../../modules/components/layout";

// Styles
import "../global";

const HomePage = () => {
  return (
    <Layout selectedKey="1">
      <HomeScreen />
    </Layout>
  );
};

export default HomePage;
