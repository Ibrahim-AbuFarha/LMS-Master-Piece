import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const ClassStudentChart = ({ classData }) => {
  //classLabels
  const classLabels = classData.map((item) => item.subject);
  //number of student in the class Label
  const studentCounts = classData.map((item) => item.students.length);

  console.log(classData);
  const data = {
    labels: classLabels,
    datasets: [
      {
        label: "Number of Students in each ClassRoom",
        data: studentCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // You can customize the colors
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Students",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ClassStudentChart;
