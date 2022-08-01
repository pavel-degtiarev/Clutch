import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import classNames from "classnames";

import { RemindersController } from "../../controllers/reminders-controller/reminders-controller";
import ReminderItem from "../reminder-item/reminder-item";
import { Urgency } from "../reminder-item/reminder.types";

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
  const reminders = remindersController.reminders;
  
  const reminderColors: TReminderColors = {
    [Urgency.NORMAL]: styles.urgencyNormal,
    [Urgency.NEARDUE]: styles.urgencyNearDue,
    [Urgency.OVERDUED]: styles.urgencyOverdued,
  };

  const [urgencyStyle, setUrgencyStyle] = useState<string>(reminderColors[reminders[0].urgency]);

  return (
    <section className={classNames(styles.reminder, urgencyStyle)}>
      <Swiper
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ el: ".swiper-pagination", type: "bullets" }}>
        {reminders.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => {
                useEffect(() => {
                  isActive && setUrgencyStyle(reminderColors[item.urgency]);
                }, [isActive]);

                return (
                  <ReminderItem title={item.title} trigger={item.trigger} urgency={item.urgency} />
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
