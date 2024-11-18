import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

//to jest wyswietlanie zdjecia glownego i miniatur!!! bardzo wazny plik
export default function ProductImages({ images, setFullImage }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <>
      <div className="h-[300px] flex justify-center items-center bg-white rounded-md p-3 mb-3">
        {images.length > 0 ? (
          <img
            onClick={() => setFullImage(activeImage)}
            className="rounded-md h-full object-cover"
            src={activeImage}
          />
        ) : (
          <img
            src="https://vilo.krakow.pl/wp-content/uploads/2020/07/emptyimagee.jpg"
            className="rounded-md h-full w-full"
          />
        )}
      </div>
      {/* Tutaj zrobilem galerie miniatur, ktora po kliknieciu zmienia zdjecie glowne */}
      {images.length > 3 ? (
        <Swiper
          slidesPerView={3}
          navigation
          loop={true}
          modules={[Navigation]}
          className="w-full h-[90px]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                onClick={() => setActiveImage(image)}
                src={image}
                className="h-full rounded-md object-cover cursor-pointer"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex gap-3 mt-3">
          {images.map((image) => (
            <div
              key={image}
              onClick={() => setActiveImage(image)}
              className={`h-[90px] border-2 bg-white rounded-md p-2 cursor-pointer ${
                activeImage === image
                  ? "border-gray-400"
                  : "border-white opacity-50"
              }`}
            >
              <img className="h-full w-full object-cover" src={image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
