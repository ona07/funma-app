"use client";

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PredictionChart: React.FC = () => {
  const [data, setData] = useState<{ time: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`)
      .then(res => res.json())
      .then(json => {
        setData(json.predictions);
        setLoading(false);
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">これから8時間の予測客数</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={(time) => time.slice(-5)} /> {/* HH:MM 表示 */}
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PredictionChart;
