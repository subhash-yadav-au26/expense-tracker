import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./title";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

const DoughnutChart = ({dt}) => {
  return (
    <div className='w-full md:w-1/3 flex flex-col items-center bg-gray-50 dark:bg-transparent'>
      <Title title='Summary' />

      <ResponsiveContainer width={"100%"} height={500}>
        <PieChart width={500} height={400}>
          <Tooltip />
          <Legend />
          <Pie
            data={dt}
            innerRadius={110}
            outerRadius={180}
            fill='#8884d8'
            paddingAngle={5}
            dataKey={"value"}
          >
            {dt.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
