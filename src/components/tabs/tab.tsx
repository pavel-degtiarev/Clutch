import * as React from "react";
import classNames from "classnames";
import styles from "./tab.module.scss";
import globalStyles from "../../styles/global.module.scss";
import { TabsGroupValue } from "./tabs-group";

type TabProps = {
  name: string;
  id: string;
  title: string;
  checked: boolean;
  themeOnLight: boolean;
};

export default function Tab({ name, id, title, checked, themeOnLight }: TabProps) {
  const compoundID = `${name}-${id}`;
  const labelStyle = classNames(styles.tab, themeOnLight ? styles.tabOnLight : styles.tabOnDark);

  return (
    <TabsGroupValue.Consumer>
      {(context) => (
        <div className={styles.tabContainer}>
          <input
            className={globalStyles.visuallyHidden}
            type="radio"
            name={name}
            id={compoundID}
            value={id}
            defaultChecked={checked}
            onClick={() => {
              context.setTabGroupValue(id);
            }}
          />
          <label className={labelStyle} htmlFor={compoundID}>
            {title}
          </label>
        </div>
      )}
    </TabsGroupValue.Consumer>
  );
}
