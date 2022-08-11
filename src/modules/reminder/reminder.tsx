import React, { useCallback, useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import classNames from "classnames";

import RemindersController from "../../controllers/reminders-controller/reminders-controller";
import ReminderItem from "../reminder-item/reminder-item";
import { Urgency } from "../reminder-item/reminder.types";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormStateContext } from "../../context/form-state/form-state";

import "swiper/scss";
import "swiper/scss/pagination";
import "../../styles/components/pagination-custom.scss";

import styles from "./reminder.module.scss";

// =====================================================

interface ReminderProps {
  remindersController: RemindersController;
}

type TReminderColors = {
  [key in Urgency]: string;
};

export default function Reminder({ remindersController }: ReminderProps) {
  const { showForm } = useContext(FormDisplayContext);
  const { updateServiceForm, updateRepeatForm, updateDetailsForm } = useContext(FormStateContext);
  
  remindersController.setShowFormAction(showForm);
  remindersController.setFormsDataActions(updateServiceForm, updateRepeatForm, updateDetailsForm);

  const [reminders, setReminders] = useState(remindersController.reminders);
  const remindersChanged = useCallback(() => setReminders(remindersController.reminders), []);
  
  // при монтировании Tiles добавляем коллбэк в контроллер,
  // при размонтировании - удаляем
  useEffect(() => {
    remindersController.setOnUpdateCallback(remindersChanged);
    return () => remindersController.setOnUpdateCallback(null);
  }, []);
  
  const reminderColors: TReminderColors = {
    [Urgency.NORMAL]: styles.urgencyNormal,
    [Urgency.NEARDUE]: styles.urgencyNearDue,
    [Urgency.OVERDUED]: styles.urgencyOverdued,
  };

  const [urgencyStyle, setUrgencyStyle] = useState<string>(styles.urgencyNormal);

  useEffect(() => {
    if (reminders.length) setUrgencyStyle(reminderColors[reminders[0].urgency]);
  }, [reminders]);

  return reminders.length === 0 ? (
    <></>
  ) : (
    <section className={classNames(styles.reminder, urgencyStyle)}>
      <Swiper
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ el: ".swiper-pagination", type: "bullets" }}>
        {reminders.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              {({ isActive }) => {
                useEffect(() => {
                  isActive && setUrgencyStyle(reminderColors[item.urgency]);
                }, [isActive]);

                return (
                  <ReminderItem
                    title={item.title}
                    trigger={item.trigger}
                    urgency={item.urgency}
                    clickHandler={() => remindersController.editServiceWithReminder(item)}
                  />
                );
              }}
            </SwiperSlide>
          );
        })}

        <div className="swiper-pagination"></div>
      </Swiper>
    </section>
  );
}
