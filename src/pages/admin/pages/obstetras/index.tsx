// Modules
import { ObstetrasScreen } from "../../modules/screens/obstetras";

// Components
import { Layout } from "../../modules/components/layout";

// Styles
import "../global";

const ObstetrasPage = () => {
  return (
    <Layout selectedKey="2">
      <ObstetrasScreen />
    </Layout>
  );
};

export default ObstetrasPage;
