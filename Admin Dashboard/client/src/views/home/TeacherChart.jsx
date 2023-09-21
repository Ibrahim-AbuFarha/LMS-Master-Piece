import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as Chartjs } from "chart.js/auto";
function TeacherChart() {
  const [classRooms, SetClassRooms] = useState([]);
  
  const getAllClassRooms = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/v1/classRooms/`
    );
    console.log(data);
    SetClassRooms(data.classRooms);
  };
  console.log(classRooms);
  useEffect(() => {
    if (classRooms.length === 0) {
      getAllClassRooms();
    }
  }, [classRooms, getAllClassRooms]);

  const labels = classRooms.map((item) => item.subject);
  const classData = classRooms.map((item) => item.students.length);
  console.log(labels);
  console.log(classData);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "ClassRoom Chart",
        data: classData,
        backgroundColor: [
          "#645fc5",
          "#45B39D",
          "#F39C12",
          "#FF5733",
          "#138D75",
          "#C70039",
          "#900C3F",
          "#581845",
          "#D68910",
          "#B9770E",
        ],
      },
    ],
  };

  const options = {
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Students",
          padding: 25,
          color: "#645fc5", // You can adjust the color as needed
          font: {
            size: 18, // You can adjust the font size as needed
          },
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Subjects",
          color: "#645fc5", // You can adjust the color as needed
          font: {
            size: 18, // You can adjust the font size as needed
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#645fc5", // Change legend text color
        },
      },
    },
    layout: {
      padding: "50",
    },
  };

  return (
    <div className="p-5 w-[1000px] max-w-[1000px]">
      <Bar className="bg-[#2c2c38]" data={data} options={options} />
    </div>
  );
}

export default TeacherChart;
