'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';

interface ChartProps {
  data: { name: string; total_kunjungan: number }[]; // Sesuaikan nama properti dengan backend
}

export default function KunjunganChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B22222" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#e53935" stopOpacity={0.9} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="total_kunjungan" // Ganti dengan nama properti yang benar
          fill="url(#barGradient)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
