import * as React from "react";
import classNames from "classnames";

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
}

interface HeaderWithReturn extends Header {
  withReturnButton?: typeof WITH_BUTTON;
  handler: (args: any[]) => any;
}

interface HeaderWithoutRerurn extends Header {
  withReturnButton?: typeof WITHOUT_BUTTON;
}

type HeaderProps = HeaderWithReturn | HeaderWithoutRerurn;

// ==================================================

export default function Header({ title, withReturnButton = false }: HeaderProps) {
  return (
    <header>
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

            <h2
              className={classNames(
                `${titleStyles.title}`,
                `${textStyles.titleBig}`,
                `${textStyles.noWrap}`
              )}>
              {title}
            </h2>
          </div>

          <ButtonIcon
            label="Burger button"
            auxClassNames={classNames(`${burgerStyles.container}`, `${burgerStyles.buttonBurger}`)}
            handler={() => {}}
          />
        </div>
      </div>
    </header>
  );
}
