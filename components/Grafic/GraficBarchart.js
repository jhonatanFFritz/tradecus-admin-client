import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function GraficBarchart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/toursales');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombreTour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalVentas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraficBarchart;
