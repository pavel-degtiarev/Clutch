import React, { useCallback, useContext, useEffect, useState } from "react";
import classNames from "classnames";

import TitleController from "../../controllers/title-controller/title-controller";
import BurgerMenu from "../../components/burger-menu/burger-menu";
import ButtonIcon from "../../components/button-icon/button-icon";
import { CurrentPageContext, Pages } from "../../context/current-page/current-page-context";

import textStyles from "../../styles/typography.module.scss";

import headerStyles from "./header.module.scss";
import burgerStyles from "./burger.module.scss";
import titleStyles from "./header-title.module.scss";

// ==================================================

interface HeaderProps {
  controller: TitleController;
  burgerHandler?: clickHandler;
  onReturnHandler?: clickHandler;
  onDeleteData: () => void;
}

export default function Header({
  controller,
  burgerHandler = () => {},
  onReturnHandler = () => {},
  onDeleteData,
}: HeaderProps) {
  const [burgerMenuClosed, setBurgerMenuClosed] = useState(true);
  const { currentPage, switchToTiles } = useContext(CurrentPageContext);
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
            {currentPage === Pages.STATS && (
              <ButtonIcon
                label="Return to main screen"
                auxClassNames={`${headerStyles.buttonReturn}`}
                handler={(e) => {
                  onReturnHandler(e);
                  switchToTiles();
                }}
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
        destroyDataHandler={() => {
          onDeleteData();
          setBurgerMenuClosed(true);
        }}
      />
    </header>
  );
}
