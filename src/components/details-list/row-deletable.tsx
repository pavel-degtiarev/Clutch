import React, { ReactNode, TouchEvent, useCallback, useRef, useState } from "react";
import ButtonIcon from "../button-icon/button-icon";
import styles from "./details-list.module.scss";

interface RowProps {
  children: ReactNode;
  deleteHandler: () => void;
}

const MAX_DISTANCE = 40;

export function RowDeletable({ children, deleteHandler }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [startPoint, setStartPoint] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setStartPoint(e.changedTouches[0].pageX);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!ref.current) return;

    const distance = e.changedTouches[0].pageX - startPoint;

    if (Math.abs(distance) <= MAX_DISTANCE) {
      ref.current.style.left = `${distance}px`;
      return;
    }

    if (distance < 0) {
      setButtonVisible(true);
    }

    if (distance > 0 && buttonVisible) {
      setButtonVisible(false);
    }
  }, [ref, startPoint]);

  const onTouchEnd = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.left = "";
  }, [ref]);

  return (
    <div
      className={styles.row}
      draggable="true"
      ref={ref}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}>
      {children}

      {buttonVisible && (
        <ButtonIcon auxClassNames={styles.deleteRowButton} handler={() => deleteHandler()} />
      )}
    </div>
  );
}
