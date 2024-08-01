// Modules
import { GestantesScreen } from "../../modules/screens/gestantes";

// Components
import { Layout } from "../../modules/components/layout";

// Styles
import "../global";

const GestantesPage = () => {
  return (
    <Layout selectedKey="3">
      <GestantesScreen />
    </Layout>
  );
};

export default GestantesPage;
