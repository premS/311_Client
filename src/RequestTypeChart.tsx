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
 * @param props requesttypeData => Chart data with various request types and their counts
 * @returns a Request types total chart for 311 cases aggregated by type
 */
export function RequestTypeChart (props: any) {
    return (
        <ResponsiveContainer width="50%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={props.requesttypeData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <text x={600 / 2} y={10} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="14">Request Types of 311 Cases(Filtered by above dropdown)</tspan>
          </text>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="RequestType" scale="band" />
          <YAxis domain={[-50000, 60000]}/>
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="TotalCount" fill="#8884d8" stroke="#8884d8" />
          {/* <Bar dataKey="total" barSize={20} fill="#413ea0" /> */}
          {/* <Line type="monotone" dataKey="TotalCount" stroke="#ff7300" /> */}
          {/* <Scatter dataKey="TotalCases" fill="#8884d8" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    );
}