import {
    Area,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";

/**
 * 
 * @param props data => Chart data with total cases grouped by mm-yyyy
 * @returns a Trend chart for 311 cases aggregated by mm-yyyy
 */
export function TrendChart (props: any) {
    return (
        <ResponsiveContainer width="50%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={props.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <text x={600 / 2} y={10} fill="black" textAnchor="middle" dominantBaseline="central">
              <tspan fontSize="14">Trendline of 311 Cases(Filtered by above dropdown)</tspan>
            </text>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="Period" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="TotalCases" fill="#8884d8" stroke="#8884d8" />
            {/* <Bar dataKey="total" barSize={20} fill="#413ea0" /> */}
            <Line type="monotone" dataKey="TotalCases" stroke="#ff7300" />
            {/* <Scatter dataKey="TotalCases" fill="#8884d8" /> */}
          </ComposedChart>
        </ResponsiveContainer>
    )
}