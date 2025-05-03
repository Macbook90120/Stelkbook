'use client';

import React from 'react';
import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

/* NOTE (Ragil): 
  Untuk reassign jenis chartnya, seorang hanya akan melakukan hal seperti:

  <KunjunganChart data={data} chartType="x" />

  Dimana x itu bisa line, bar dan area.
  Kalau mau dinamis, bisa dijadikan ChartType menjadi state, kayak
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');

  Baru mengaplikasikan setChartType(x).
*/

type ChartType = 'bar' | 'line' | 'area';

interface ChartProps {
  data: { name: string; pengunjung: number }[];
  chartType?: ChartType;
}

export default function KunjunganChart({
  data,
  chartType = 'bar',
}: ChartProps) {
  const common = (
    <>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </>
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      {chartType === 'bar' && (
        <BarChart data={data}>
          {common}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B22222" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#e53935" stopOpacity={0.9} />
            </linearGradient>
          </defs>
          <Bar
            dataKey="pengunjung"
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      )}

      {chartType === 'line' && (
        <LineChart data={data}>
          {common}
          <Line
            type="monotone"
            dataKey="pengunjung"
            stroke="#B22222"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      )}

      {chartType === 'area' && (
        <AreaChart data={data}>
          {common}
          <Area
            type="monotone"
            dataKey="pengunjung"
            stroke="#B22222"
            fill="rgba(178, 34, 34, 0.5)"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}
