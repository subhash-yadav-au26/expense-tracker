import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "./title";

const Chart = ({data}) => {
  return (
    <div className='w-full md:w-2/3'>
      <Title title='Transaction Activity' />
      <ResponsiveContainer width={"100%"} height={500} className='mt-5'>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <YAxis />
          <XAxis />
          <Legend />
          <Line type='monotone' dataKey={"income"} stroke='#8884d8' />
          <Line type='monotone' dataKey={"expense"} stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
