import { useState } from "react";
//to jest wyswietlanie zdjecia glownego i miniatur!!! bardzo wazny plik
export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <>
      <div className="h-[300px] flex justify-center items-center bg-white rounded-md p-3">
        {images.length > 0 ? (
          <img className="rounded-md h-full object-cover" src={activeImage} />
        ) : (
          <img
            src="https://vilo.krakow.pl/wp-content/uploads/2020/07/emptyimagee.jpg"
            className="rounded-md h-full w-full"
          />
        )}
      </div>
      {/* Tutaj zrobilem galerie miniatur, ktora po kliknieciu zmienia zdjecie glowne */}
      <div className="flex flex-wrap gap-3 mt-3">
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
            <img src={image} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
