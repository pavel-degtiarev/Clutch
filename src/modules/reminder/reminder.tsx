import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { TimelUnit } from "../../../global.var";
import ReminderItem from "../reminder-item/reminder-item";

import "swiper/scss";
import "swiper/scss/pagination";
import "../../styles/components/pagination-custom.scss";

import reminderStyles from "./reminder.module.scss";

export default function Reminder() {
	return (
		<section className={reminderStyles.reminder}>
			<Swiper
				slidesPerView={1}
				modules={[Pagination]}
				pagination={{ el: ".swiper-pagination", type: "bullets" }}>
				<SwiperSlide>
					<ReminderItem
						title="Свечи зажигания"
						run={7800}
						time={{ interval: 5, unit: TimelUnit.YEARS }}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<ReminderItem
						title="Катушки зажигания"
						run={7800}
						time={{ interval: 8, unit: TimelUnit.MONTHS }}
					/>
				</SwiperSlide>

				<SwiperSlide>
					<ReminderItem title="Провода зажигания" run={15000} />
				</SwiperSlide>

				<div className="swiper-pagination"></div>
			</Swiper>
		</section>
	);
}
