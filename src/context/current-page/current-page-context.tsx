import React, { createContext, ReactNode, useCallback, useState } from "react";

export enum Pages {
  TILES,
  STATS,
}

const CurrentPageContextInitState = {
  currentPage: Pages.TILES,
  switchToStat: () => {},
  switchToTiles: () => {},
};

type CurrentPageContext = typeof CurrentPageContextInitState;

interface CureentPageProps {
  children: ReactNode;
}

export const CurrentPageContext = createContext<CurrentPageContext>(CurrentPageContextInitState);

export default function CurrentPage({ children }: CureentPageProps) {
  const [currentPage, setCurrentPage] = useState(CurrentPageContextInitState.currentPage);

  const switchToStat = useCallback(() => setCurrentPage(Pages.STATS), []);
  const switchToTiles = useCallback(() => setCurrentPage(Pages.TILES), []);

  return (
    <CurrentPageContext.Provider value={{ currentPage, switchToStat, switchToTiles }}>
      {children}
    </CurrentPageContext.Provider>
  );
}
