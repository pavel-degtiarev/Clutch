import React from "react";

import styles from "./burger-menu.module.scss";

export default function BurgerMenu() {
  return (
    <section className={styles.burgerMenu}>
      <div className={styles.container}>
        <input className="field no-wrap" name="car-name" value="Honda FIT" />

        <button type="button" className="button button-main">
          <span>Удалить данные</span>
        </button>
      </div>
    </section>
  );
}
