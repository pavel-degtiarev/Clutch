import * as React from "react";
import styles from "./styles/global.scss";
import Header from "./modules/header/Header";

export default function App() {
  return (
		<>
			<h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

			<Header title="Honda Fit" />
			{/* <Header title="Honda Fit" withReturnButton handler={() => { }}/> */}

			<main>
				<div className="main">
					<div className="main__container" />
				</div>
			</main>
		</>
	);
}
