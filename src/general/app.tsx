import React from "react";
import styles from "../styles/global.module.scss";

import Header from "../modules/header/Header";
import MainContainer from "../modules/main-container/main-container";
import CurrentPage from "../context/current-page/current-page-context";

import { remindersController, tilesController, titleController } from "../index";
import { deleteClutchDb } from "../API/init-db";

// ===========================================

function deleteData(): void {
  const deleteMsg = `Удалить все данные?
  Эта операция необратима!`;

  if (window.confirm(deleteMsg)) {
    titleController.clearTitle();
    tilesController.clearTiles();
    remindersController.clearReminders();
    deleteClutchDb();
  }
}

export default function App() {
  return (
    <>
      <h1 className={styles.visuallyHidden}>Clutch. Car expenses logbook.</h1>

      <CurrentPage>
        <Header controller={titleController} onDeleteData={deleteData}/>
        <MainContainer />
      </CurrentPage>
    </>
  );
}
