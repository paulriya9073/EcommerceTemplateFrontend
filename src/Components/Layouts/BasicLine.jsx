import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BasicLine = ({ line }) => {
  if (!line) return <p>Loading chart...</p>;

  return (
    <div className="w-full h-96">
      <Line
        data={line}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue (INR)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Month',
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
        }}
      />
    </div>
  );
};

export default BasicLine;
