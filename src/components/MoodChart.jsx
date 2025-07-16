import React, { useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const COLORS = {
  positive: '#8ACCD5',
  neutral: '#FFC1DA',
  negative: '#FF90BB'
};

const LABEL_MAP = {
  positive: 'Happy',
  neutral: 'Neutral',
  negative: 'Unhappy'
};

function MoodChart({ data }) {
  const chartRef = useRef(null);

  const sorted = [...data].sort((a, b) => a.id - b.id);

  const chartData = sorted.map((entry, i) => ({
    name: `Day ${i + 1}`,
    moodLabel: LABEL_MAP[entry.mood],
    moodScore:
      entry.mood === 'positive' ? 2 :
      entry.mood === 'neutral' ? 1 : 0
  }));

  const pieData = ['positive', 'neutral', 'negative'].map((mood) => ({
    name: LABEL_MAP[mood],
    value: sorted.filter(e => e.mood === mood).length
  }));

  const chartWidth = Math.max(600, chartData.length * 100);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.scrollLeft = chartRef.current.scrollWidth;
    }
  }, [data]);

  return (
    <Box mt={6}>
      {/* Mood Line Chart Block */}
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Mood Over Time
        </Typography>
        <Box ref={chartRef} sx={{ width: '100%', overflowX: 'auto' }}>
          <LineChart
            width={chartWidth}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis dataKey="name" stroke="#555" />
            <YAxis
              ticks={[0, 1, 2]}
              stroke="#555"
              tickFormatter={(tick) =>
                tick === 0 ? 'Unhappy' : tick === 1 ? 'Neutral' : 'Happy'
              }
            />
            <Tooltip
              wrapperStyle={{ fontSize: '0.9rem' }}
              contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
              formatter={(value, name) =>
                name === 'moodScore'
                  ? value === 2 ? 'Happy' : value === 1 ? 'Neutral' : 'Unhappy'
                  : value
              }
            />
            <Line
              type="monotone"
              dataKey="moodScore"
              stroke="#8ACCD5"
              strokeWidth={2.5}
              dot={{ r: 5, stroke: '#FF90BB', strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </Box>
      </Paper>

      {/* Mood Breakdown Pie Chart Block */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Mood Breakdown
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart width={420} height={280}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[
                    Object.keys(LABEL_MAP).find(key => LABEL_MAP[key] === entry.name)
                  ]}
                />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ fontSize: '0.85rem' }}
              contentStyle={{ backgroundColor: '#fefefe', borderRadius: '8px' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </Box>
      </Paper>
    </Box>
  );
}

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default React.memo(MoodChart, areEqual);
