import React, { useEffect, useState } from "react";
import classNames from "classnames";

import BurgerMenu from "../../components/burger-menu/burger-menu";
import ButtonIcon from "../../components/button-icon/button-icon";

import textStyles from "../../styles/typography.module.scss";

import headerStyles from "./header.module.scss";
import burgerStyles from "./burger.module.scss";
import titleStyles from "./header-title.module.scss";

// ==================================================

const WITH_BUTTON: boolean = true;
const WITHOUT_BUTTON: boolean = false;

interface Header {
  title: string;
  burgerHandler: clickHandler;
}

interface HeaderWithReturn extends Header {
  withReturnButton?: typeof WITH_BUTTON;
  handler: clickHandler;
}

interface HeaderWithoutRerurn extends Header {
  withReturnButton?: typeof WITHOUT_BUTTON;
}

type HeaderProps = HeaderWithReturn | HeaderWithoutRerurn;

// ==================================================

export default function Header({ title, withReturnButton = false, burgerHandler }: HeaderProps) {
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

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <div className={headerStyles.content}>
          <div className={titleStyles.container}>
            {withReturnButton && (
              <ButtonIcon
                label="Return to main screen"
                auxClassNames={`${headerStyles.buttonReturn}`}
                handler={() => {}}
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

      <BurgerMenu isClosed={burgerMenuClosed} />
    </header>
  );
}
