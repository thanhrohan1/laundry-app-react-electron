import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const ChartTransaction = ({
  chartData,
  displayLegend,
  displayTitle,
  legendPosition,
}) => {
  // const [data] = useState(chartData);

  return (
    <div className=''>
      <Line
        width={50}
        height={18}
        data={chartData}
        options={{
          title: {
            display: displayTitle,
            display: 'Transaksi',
            fontSize: 25,
          },
          legend: {
            display: displayLegend,
            position: legendPosition,
          },
        }}
      />
    </div>
  );
};

export default ChartTransaction;
