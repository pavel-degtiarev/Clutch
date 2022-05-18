import * as React from "react";
import styles from "./styles/global.scss";
import Header from "./modules/header/Header.tsx";

export default function App() {
  return (
    <>
      <h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

      <Header title="Honda Fit" />

      <main>
        <div className="main">
          <div className="main__container" />
        </div>
      </main>
    </>
  );
}
