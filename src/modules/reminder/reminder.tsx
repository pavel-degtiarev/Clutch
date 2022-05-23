import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import ReminderItem from "../reminder-item/reminder-item";
import { IReminder } from "../reminder-item/reminder.types";

import "swiper/scss";
import "swiper/scss/pagination";
import "../../styles/components/pagination-custom.scss";

import reminderStyles from "./reminder.module.scss";

// =====================================================

interface ReminderProps {
	reminders: Array<IReminder>;
}

export default function Reminder({reminders}: ReminderProps) {
	return (
		<section className={reminderStyles.reminder}>
			<Swiper
				slidesPerView={1}
				modules={[Pagination]}
				pagination={{ el: ".swiper-pagination", type: "bullets" }}>
				{reminders.map((item) => {
					return (
						<SwiperSlide key={item.title}>
							<ReminderItem title={item.title} urgency={item.urgency} trigger={item.trigger} />
						</SwiperSlide>
					);
				})}

				<div className="swiper-pagination"></div>
			</Swiper>
		</section>
	);
}
