import * as React from "react";
import classNames from "classnames";

import ButtonIcon from "../../components/button-icon/button-icon";

import textStyles from "../../styles/typography.scss";

import headerStyles from "./styles/header.scss";
import burgerStyles from "./styles/burger.scss";
import titleStyles from "./styles/header-title.scss";

import burger from "../../../markup/images/burger.svg";

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

					<div className={burgerStyles.container}>
						<img className={burgerStyles.icon} src={burger} alt="burger" />
					</div>
				</div>
			</div>
		</header>
	);
}
