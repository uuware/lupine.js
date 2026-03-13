import { PieChartProps, PieChart } from './pie-chart';

// Donut Chart is just a Pie Chart with an inner radius wrapper
export const DonutChart = (props: Omit<PieChartProps, 'innerRadiusRatio'> & { innerRadiusRatio?: number }) => {
  const viewBoxSize = 100; // Assuming a default viewBox size for the wrapper

  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '0',
      }}
    >
      <svg
        className='chart-svg' // Changed 'class' to 'className' for React
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        preserveAspectRatio='xMidYMid meet'
      >
        <PieChart {...props} innerRadiusRatio={props.innerRadiusRatio ?? 0.6} />
      </svg>
    </div>
  );
};
