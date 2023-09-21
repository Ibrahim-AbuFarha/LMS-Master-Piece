import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';
const TeacherAdditionChart = ({ teacherData }) => {
  const monthLabels = teacherData.map((item) => item.month);
  const teacherCounts = teacherData.map((item) => item.teacherCount);

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Number of Teachers Added',
        data: teacherCounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)', // You can customize the line color
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Teachers Added',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TeacherAdditionChart;
