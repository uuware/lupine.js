import { PieChartProps, PieChart } from './pie-chart';

// Donut Chart is just a Pie Chart with an inner radius wrapper
export const DonutChart = (props: Omit<PieChartProps, 'innerRadiusRatio'> & { innerRadiusRatio?: number }) => {
  return <PieChart {...props} innerRadiusRatio={props.innerRadiusRatio ?? 0.6} />;
};
