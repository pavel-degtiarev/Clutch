import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import classNames from "classnames";

import "swiper/scss";
import "swiper/scss/pagination";

import "../../styles/components/pagination-custom.scss";

import textStyles from "../../styles/typography.module.scss";
import reminderStyles from "./styles/reminder.module.scss";

export default function Reminder() {
	return (
		<section className={reminderStyles.reminder}>
			<Swiper
				slidesPerView={1}
				modules={[Pagination]}
				pagination={{ el: ".swiper-pagination", type: "bullets" }}>
				<SwiperSlide>
					<div className={reminderStyles.slide}>
						<p className={classNames(textStyles.titleNormal, textStyles.noWrap)}>Свечи зажигания</p>
						<p className={reminderStyles.description}>7800 км.</p>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={reminderStyles.slide}>
						<p className={classNames(textStyles.titleNormal, textStyles.noWrap)}>
							Катушки зажигания
						</p>
						<p className={reminderStyles.description}>7800 км.</p>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={reminderStyles.slide}>
						<p className={classNames(textStyles.titleNormal, textStyles.noWrap)}>
							Провода зажигания
						</p>
						<p className={reminderStyles.description}>7800 км.</p>
					</div>
				</SwiperSlide>
				
				<div className="swiper-pagination"></div>
			</Swiper>
		</section>
	);
}
