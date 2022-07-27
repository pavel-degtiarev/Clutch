import * as React from "react";
import classNames from "classnames";

import tileStyles from "./tile.module.scss";
import styles from "./tile-chart.module.scss";

// ==================================

const MAX_HEIGHT = 100;
const MIN_HEIGHT = 30;
const HEIGHT_DIFF = MAX_HEIGHT - MIN_HEIGHT;

interface ChartBarProps {
  value: number;
}

function ChartBar({ value }: ChartBarProps) {
  return <div className={classNames(styles.bar)} style={{ height: `${value}%` }}></div>;
}

// ==================================

interface TileChartProps {
  chartData: number[];
}

export default function TileChart({ chartData }: TileChartProps) {

  const normalizedData = calcNormalized(chartData);

  return (
    <div className={classNames(tileStyles.data, styles.chart)}>
      <div className={classNames(styles.chartContainer)}>
        <div className={classNames(styles.barsContainer)}>
          {normalizedData.map((item, index) => (
            <ChartBar key={index} value={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function calcNormalized(values: number[]): number[] {
  const nonZeroData = values.filter((item) => item !== 0);
  const minValue = Math.min(...nonZeroData);
  const maxValue = Math.max(...nonZeroData);
  const interval = maxValue - minValue;

  return values.map(item => {
    if (item === 0) return 2;
    const increment = ((item - minValue) * HEIGHT_DIFF) / interval;
    return MIN_HEIGHT + Math.round(increment);
  })
}
