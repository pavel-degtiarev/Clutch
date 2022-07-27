import * as React from "react";
import { BarChart, Bar, ResponsiveContainer, ReferenceLine, Label } from "recharts";
import classNames from "classnames";

import tileStyles from "./tile.module.scss";
import styles from "./tile-chart.module.scss";
import { TileChartRecord } from "../../controllers/tiles-controller/tiles-controller";

function RoundedBar({ fill, x, y, width, height }: any) {
  return (
    <rect
      x={x} y={y} width={width} height={height}
      rx={width / 2} ry={width / 2}
      stroke="none" fill={fill}
    />
  );
}

type TileChartProps = {
  data: TileChartRecord[];
};

export default function TileChart({ data }: TileChartProps) {
  // const allValues = data.map(item => item.value);
  // const avg = Math.round(allValues.reduce((accum, item) => accum + item, 0) / allValues.length);

  return (
    <div className={classNames(tileStyles.data, styles.chart)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Bar dataKey="value" fill="#3b9cbc" shape={<RoundedBar />} isAnimationActive={false} />
          {/* <ReferenceLine y={avg}
            stroke="#88e5d4" strokeDasharray="1 2" isFront
            label={
              <Label value={`средн. ${avg}`} position="insideTopRight" fontSize={10} fill="white" />
            }
          /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
