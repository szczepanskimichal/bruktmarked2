import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import CartIcon from "../icons/CartIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export default function ProductCard({
  _id,
  setConfirm, // funkcja do usuwania produktu z All products
  title,
  images,
  price,
  user,
  index,
}) {
  const session = useSession();

  // console.log(session.data.user.id);
  return (
    // oplatam calosc motion i fadeinem, robie animacje :)
    <motion.div
      variants={fadeIn("down", "spring", 0.1 * index, 1)}
      initial="hidden"
      whileInView="show"
      className="box"
      id={index}
    >
      <div className="bg-white  mb-2 rounded-t-lg flex justify-center items-center">
        <Link href={"/products/" + _id}>
          {images?.length > 0 ? (
            <img src={images[0]} className="max-h-[180px] rounded-lg p-1" /> // wyswietlanie zdjecia
          ) : (
            // jesli nie ma zdjecia to wyswietla pusty obrazek
            <img
              src="https://vilo.krakow.pl/wp-content/uploads/2020/07/emptyimagee.jpg"
              className="rounded-lg p-2 h-[200px]" // dolozylem ograniczenie wysokosci bo bez zdjecia wariowal layout
            />
          )}
        </Link>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <Link href={"/products/" + _id}>
            <h3 className="text-lg hover:text-primary hover:decoration-primary decoration-gray-100 underline transition-all delay-150 duration-300">
              {title}
            </h3>
          </Link>
          {session?.data?.user.id !== user && ( // jesli zalogowany uzytkownik nie jest autorem produktu to wyswietla ikone serca
            <FaRegHeart className="size-5 mb-3 cursor-pointer text-red-600" />
          )}
        </div>
        <div className="flex gap-3 justify-between items-center mt-3">
          <p className="text-2xl font-bold">${price}</p>
          {session?.data?.user.id !== user ? ( // jesli zalogowany uzytkownik nie jest autorem produktu to wyswietla przycisk dodaj do koszyka
            <button className="primary">
              <CartIcon className="size-5" />
              Add to Cart
            </button>
          ) : (
            // jesli zalogowany uzytkownik jest autorem produktu to wyswietla przyciski edytuj i usun
            <div className="flex gap-3 items-center">
              <Link href={"/products/edit/" + _id}>
                <button className="cancel">
                  <EditIcon className="size-5" />
                </button>
              </Link>
              <button onClick={() => setConfirm(true)} className="delete">
                <DeleteIcon className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
