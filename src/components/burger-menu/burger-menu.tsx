import classNames from "classnames";
import React, { ReactNode } from "react";
import Button from "../button/button";
import FieldText from "../field/field-text";

import styles from "./burger-menu.module.scss";

interface ContainerProps {
  isClosed: boolean;
  children: ReactNode;
}

function BurgerMenuContainer({ isClosed, children }: ContainerProps) {
  return (
    <section className={styles.burgerMenu}>
      <div className={classNames(styles.container, { [styles.closed]: isClosed })}>{children}</div>
    </section>
  );
}

interface BurgerMenuProps {
  isClosed: boolean;
}

export default function BurgerMenu({ isClosed }: BurgerMenuProps) {
  return (
    <BurgerMenuContainer isClosed={isClosed}>
      <FieldText value="Honda FIT" name="car-name" label="Марка машины" />
      <Button title="Удалить данные" clickHandler={() => {}} />
    </BurgerMenuContainer>
  );
}
