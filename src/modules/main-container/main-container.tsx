import React, { useContext } from "react";
import { CurrentPageContext, Pages } from "../../context/current-page/current-page-context";
import PageTiles from "../page-tiles/page-tiles";
import PageStats from "../page-stat/page-stat";

import styles from "./main-container.module.scss";

export default function MainContainer() {
  const { currentPage } = useContext(CurrentPageContext);

  const containerClasses =
    currentPage === Pages.TILES ? styles.tilesContainer : styles.statsContainer;
  
  return (
    <main>
      <div className={containerClasses}>
        {currentPage === Pages.TILES ? <PageTiles /> : <PageStats />}
      </div>
    </main>
  );
}
