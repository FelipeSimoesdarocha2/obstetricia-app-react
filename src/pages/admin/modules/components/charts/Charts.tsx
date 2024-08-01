// Components
import ActivesChart from './Actives';
import NewChart from './NewChart';
import RatiosChart from './Ratios';
import RetentionChart from './Retention';

type CompoundedComponent = & {
  NewChart: typeof NewChart;
  ActivesChart: typeof ActivesChart;
  RatiosChart: typeof RatiosChart;
  RetentionChart: typeof RetentionChart;
};

const CompoundedCharts: CompoundedComponent = Object.assign({ NewChart, ActivesChart, RatiosChart, RetentionChart });
export default CompoundedCharts;
