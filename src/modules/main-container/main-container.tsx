import React, { useContext } from "react";
import { CurrentPageContext, Pages } from "../../context/current-page/current-page-context";
import PageTiles from "../page-tiles/page-tiles";
import PageStats from "../page-stat/page-stat";

import styles from "./main-container.module.scss";

export default function MainContainer() {
  const { currentPage } = useContext(CurrentPageContext);

  return (
    <main>
      <div className={styles.container}>
        {currentPage === Pages.TILES ? <PageTiles /> : <PageStats />}
      </div>
    </main>
  );
}
