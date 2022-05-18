import * as React from "react";
import classNames from "classnames";

import textStyles from "../../styles/typography.scss";
import buttonStyles from "../../styles/components/button.scss";

import headerStyles from "./styles/header.scss";
import burgerStyles from "./styles/burger.scss";
import titleStyles from "./styles/header-title.scss";

import burger from "../../../markup/images/burger.svg";

interface HeaderProps {
	title: string;
	withReturnButton: boolean;
}

export default function Header({ title, withReturnButton = false }: HeaderProps) {
	return (
		<header>
			<div className={headerStyles.container}>
				<div className={headerStyles.content}>
					<div className={titleStyles.container}>
						{withReturnButton && (
							<button
								className={classNames(`${buttonStyles.icon}`, `${headerStyles.buttonReturn}`)}
								type="button"
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
