import * as React from "react";
import classNames from "classnames";

import tileStyles from "./tile.module.scss";
import styles from "./tile-chart.module.scss";

type TileChartProps = {
  chartData: number[];
};

export default function TileChart({ chartData }: TileChartProps) {
  console.log(chartData);
  
  return (
    <div className={classNames(tileStyles.data, styles.chart)}>
      <div className={classNames(styles.chartContainer)}>
        <div className={classNames(styles.barsContainer)}>
          <div className={classNames(styles.bar)} style={{ height: "65%" }}></div>
          <div className={classNames(styles.bar)} style={{ height: "40%" }}></div>
          <div className={classNames(styles.bar)} style={{ height: "0%" }}></div>
          <div className={classNames(styles.bar)} style={{ height: "20%" }}></div>
          <div className={classNames(styles.bar)} style={{ height: "80%" }}></div>
          <div className={classNames(styles.bar)} style={{ height: "100%" }}></div>
          <div className={classNames(styles.bar)} style={{ height: "85%" }}></div>
        </div>
      </div>
    </div>
  );
}
