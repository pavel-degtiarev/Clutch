import classNames from "classnames";
import React, { ReactNode } from "react";
import Button from "../button/button";
import FieldText from "../field/field-text";

import styles from "./burger-menu.module.scss";
import typeStyles from "../../styles/typography.module.scss";

interface ContainerProps {
  isClosed: boolean;
  children: ReactNode;
}

function BurgerMenuContainer({ isClosed, children }: ContainerProps) {
  return (
    <section className={styles.burgerMenu}>
      <div className={classNames(styles.container, { [styles.burgerMenuClosed]: isClosed })}>
        {children}
      </div>
    </section>
  );
}

interface BurgerMenuProps {
  isClosed: boolean;
}

export default function BurgerMenu({ isClosed }: BurgerMenuProps) {
  return (
    <BurgerMenuContainer isClosed={isClosed}>

      <div className={styles.inputContainer}>
        <h2 className={classNames(typeStyles.titleNormal, styles.header)}>Марка машины</h2>
        <FieldText value="" name="car-name" label="" auxStyles={styles.burgerMenuInput} />
      </div>

      <Button title="Удалить данные" auxStyles={styles.destroyDataButton}
        clickHandler={() => { }} />

    </BurgerMenuContainer>
  );
}
