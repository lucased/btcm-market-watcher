import React from "react";
import * as V from "victory";
import { VictoryLine, VictoryChart } from "victory";

const data = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 6 },
  { x: 6, y: 4 },
  { x: 7, y: 2 },
  { x: 8, y: 2 },
  { x: 9, y: 1 },
  { x: 10, y: 4 },
  { x: 11, y: 3 },
  { x: 12, y: 3 },
  { x: 13, y: 6 },
  { x: 14, y: 6 },
  { x: 15, y: 4 },
  { x: 16, y: 1 }

];

const Graph = () => (
  //   <div>
  //     <VictoryLine
  //       style={{
  //         data: { stroke: "#B8E986", strokeWidth: 6, strokeLinecap: "round" }
  //       }}
  //       width={200}
  //       height={200}
  //       interpolation="natural"
  //       data={data}
  //     />
  //   </div>

  <svg style={{padding: '0', marginLeft: '20px', marginBottom: '20px'}} width={200} height={30}>
    <VictoryLine
      style={{
        data: { stroke: "#B8E986", strokeWidth: 2, strokeLinecap: "round" }
      }}
      standalone={false}
      width={200}
      height={50}
      padding={0}
      data={data}
      interpolation="natural"
    />
  </svg>
);

export default Graph;
