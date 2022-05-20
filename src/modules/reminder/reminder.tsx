import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import ReminderItem from "../reminder-item/reminder-item";
import { TReminder } from "../reminder-item/reminder.types";

import "swiper/scss";
import "swiper/scss/pagination";
import "../../styles/components/pagination-custom.scss";

import reminderStyles from "./reminder.module.scss";

// =====================================================

interface ReminderProps {
	reminders: Array<TReminder>;
}

export default function Reminder({ reminders }: ReminderProps) {
	return (
		<section className={reminderStyles.reminder}>
			<Swiper
				slidesPerView={1}
				modules={[Pagination]}
				pagination={{ el: ".swiper-pagination", type: "bullets" }}>
				{reminders.map((reminder) => {
					return (
						<SwiperSlide key={reminder.title}>
							<ReminderItem
								title={reminder.title}
								trigger={reminder.trigger}
								overdued={reminder.overdued}
							/>
						</SwiperSlide>
					);
				})}

				<div className="swiper-pagination"></div>
			</Swiper>
		</section>
	);
}
