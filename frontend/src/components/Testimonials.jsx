import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const testimonials = [
    {
        name: "Nikhil",
        quote: "CodeBet feels just like a real contest — only this time, I get to duel my friends!",
        img: "https://i.pinimg.com/736x/e0/13/90/e01390989877c662bdc1e5e968fd3991.jpg",
    },
    {
        name: "Utsav",
        quote: "The thrill of competing live forced me to think quicker and sharpen my approach.",
        img: "https://i.pinimg.com/736x/cc/42/2c/cc422c8aaafc6b9bb9c61237f177d208.jpg",
    },
    {
        name: "Nihal",
        quote: "Loved the synced timer and auto-verdict. It really feels like a coding battleground!",
        img: "https://i.pinimg.com/736x/39/f0/40/39f0400292dafbecf30851e474179350.jpg",
    },
    {
        name: "Ans",
        quote: "This isn’t just practice — it’s high-pressure problem-solving. Every match is exciting.",
        img: "https://i.pinimg.com/736x/b8/e4/33/b8e433eea92faca21e7bc49ea1314912.jpg",
    },
];

export default function TestimonialCarousel() {
    return (
        <section className="bg-backgroundDark text-white py-16 px-6 mt-6 mb-28">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-4 text-primary">Loved by Coders Like You❤️</h2>
                <p className="text-gray-400 text-xl">Real feedback from real warriors.</p>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    grabCursor={true}
                    loop={true}
                    spaceBetween={30}
                    slidesPerGroup={1}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="min-h-[400px]"
                >
                    {testimonials.map((t, index) => (
                        <SwiperSlide key={index}>
                            <div className="h-[400px] flex items-center justify-center">
                                <div className="bg-card w-full max-w-[90%] mx-auto rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition hover:shadow-gray-600">
                                    <p className="text-gray-300 italic mb-4 text-lg">“{t.quote}”</p>
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className="w-24 h-24 rounded-full object-cover border-2 border-yellow-400 mb-4"
                                    />
                                    <h4 className="text-yellow-400 font-bold text-lg">— {t.name}</h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
