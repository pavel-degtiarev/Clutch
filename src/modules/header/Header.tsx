import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import TitleController from "../../controllers/title-controller/title-controller";
import BurgerMenu from "../../components/burger-menu/burger-menu";
import ButtonIcon from "../../components/button-icon/button-icon";

import textStyles from "../../styles/typography.module.scss";

import headerStyles from "./header.module.scss";
import burgerStyles from "./burger.module.scss";
import titleStyles from "./header-title.module.scss";

// ==================================================

interface HeaderProps {
  controller: TitleController;
  burgerHandler?: clickHandler;
  withReturnButton?: boolean;
  onReturnHandler?: clickHandler;
}

export default function Header({
  controller,
  burgerHandler = () => {},
  withReturnButton = false,
  onReturnHandler = () => {},
}: HeaderProps) {
  const [burgerMenuClosed, setBurgerMenuClosed] = useState(true);

  const [burgerButtonStyles, setburgerButtonStyles] = useState(
    classNames(burgerStyles.burgerButton, burgerStyles.iconBurger)
  );

  useEffect(() => {
    setburgerButtonStyles(
      classNames(
        burgerStyles.burgerButton,
        burgerMenuClosed ? burgerStyles.iconBurger : burgerStyles.iconClose
      )
    );
  }, [burgerMenuClosed]);

  const [title, setTitle] = useState(controller.title);
  const titleUpdated = useCallback(() => setTitle(controller.title), []);

  useEffect(() => {
    controller.setOnUpdateCallback(titleUpdated);
    return () => controller.setOnUpdateCallback(null);
  }, []);

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <div className={headerStyles.content}>
          <div className={titleStyles.container}>
            {withReturnButton && (
              <ButtonIcon
                label="Return to main screen"
                auxClassNames={`${headerStyles.buttonReturn}`}
                handler={(e) => onReturnHandler(e)}
              />
            )}

            <h2 className={classNames(titleStyles.title, textStyles.titleBig, textStyles.noWrap)}>
              {title}
            </h2>
          </div>

          <ButtonIcon
            label="Burger button"
            auxClassNames={burgerButtonStyles}
            handler={(e) => {
              burgerHandler(e);
              setBurgerMenuClosed((prevState) => !prevState);
            }}
          />
        </div>
      </div>

      <BurgerMenu
        isClosed={burgerMenuClosed}
        currentTitle={burgerMenuClosed ? "" : title}
        titleUpdatedHandler={(newTitle) => controller.updateTitle(newTitle)}
      />
    </header>
  );
}
