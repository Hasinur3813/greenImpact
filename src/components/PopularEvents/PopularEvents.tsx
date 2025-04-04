import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useEvents from "../../hooks/useEvents";
import EventCard from "../EventCard/EventCard";
import { Event } from "../../Types/Event";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PopularEvents() {
  const {
    events,
    isLoading,
    error,
  }: { events: Event[]; isLoading: boolean; error: unknown } = useEvents();

  return (
    <section className="bg-offWhite py-16">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-primaryColor mb-6">
          Upcoming Events
        </h2>
        <p className="text-lg text-muted mb-6">
          Join us for upcoming events focused on sustainability, conservation,
          and climate action.
        </p>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-swiper-next",
              prevEl: ".custom-swiper-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mb-8"
          >
            {events?.map((event: Event) => (
              <SwiperSlide key={event.id} className="!h-auto">
                <div className="h-full flex">
                  <EventCard event={event} userRole="donor" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Arrows */}
          <button className="custom-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-2 rounded-full shadow-md hover:bg-secondaryColor transition z-50">
            <FaChevronLeft />
          </button>
          <button className="custom-swiper-next absolute right-0 top-1/2 -translate-y-1/2 bg-primaryColor text-white p-2 rounded-full shadow-md hover:bg-secondaryColor transition z-50">
            <FaChevronRight />
          </button>
        </div>

        <div className="flex justify-center">
          <button className="bg-primaryColor text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-secondaryColor transition-all group">
            <span className="text-base font-semibold">More Events</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1.5 duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
