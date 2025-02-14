import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";
import { Fade } from 'react-awesome-reveal'; // Import Fade

const TestimonialsSection = () => {
  const feedbacks = [
    {
      name: "Sakib Al Hasan",
      feedback:
        "I thought I lost my backpack forever, but thanks to this platform, someone returned it within a day! Truly a lifesaver!",
      image:
        "https://images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2023/10/03/shakib.jpg",
    },
    {
      name: "Jhanker",
      feedback:
        "I found a lost phone and posted it here. Within hours, the owner contacted me! Such an amazing initiative.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-_MILXn5-tMGuL53zC9yiswl3WtRwE-koQ&s",
    },
    {
      name: "Sophia Malik",
      feedback:
        "I lost my cat, but with the help of this website, a kind person found her and contacted me. I’m so grateful!",
      image:
        "https://pbs.twimg.com/profile_images/1271544502340198400/8Fq7zjbq_400x400.jpg",
    },
    {
      name: "Mark Thompson",
      feedback:
        "Never thought I’d see my wallet again! Someone found it and reached out through this site. Highly recommend using this service.",
      image:
        "https://static-wbd-cdn.wbd.com/s3_assets/images/person/2024-08/mark-thompson-800x800.jpg",
    },
    {
      name: "Emily Davis",
      feedback:
        "My brother lost his bike, and we were devastated. Within two days, someone listed it here, and we got it back! Thank you!",
      image:
        "https://m.media-amazon.com/images/M/MV5BODY4MmI1NjEtODc5Yy00ZmYyLThkMGItNzYyNzM4MjEzNjNiXkEyXkFqcGc@._V1_.jpg",
    },
    {
      name: "Jake Thompson",
      feedback:
        "I found a set of keys at the park, posted it here, and the owner reached out in no time! This platform really helps.",
      image:
        "https://yt3.googleusercontent.com/dKOP4FBt2GGNgHGRxpRn8AQM9Hl7w5UKZ29frBNKz6H5bhDIlIz02448XEDxod8hamuzMt5JmEY=s900-c-k-c0x00ffffff-no-rj",
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <Fade duration={1000} delay={200} triggerOnce>
          <motion.h2
            className="text-4xl font-bold mb-8 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Our Users Say
          </motion.h2>
        </Fade>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={index}>
              <Fade duration={1000} delay={index * 200} triggerOnce>
                <motion.div
                  className="p-6 rounded-lg h-64 shadow-lg bg-white transition-transform transform hover:scale-105"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-300"
                  />
                  <h3 className="text-lg font-semibold mt-4 text-gray-700">
                    {feedback.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{feedback.feedback}</p>
                </motion.div>
              </Fade>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsSection;
