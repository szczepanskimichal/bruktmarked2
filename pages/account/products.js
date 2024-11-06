import Backdrop from "@/components/Backdrop";
import AccountLayout from "@/components/layout/AccountLayout";
import ProductCard from "@/components/layout/ProductCard";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function UserProductsPage() {
  // Pobieramy sesję użytkownika
  const session = useSession();
  const userId = session?.data?.user.id; // Identyfikator użytkownika z sesji

  // Definiujemy stan dla produktów oraz dla potwierdzenia usunięcia
  const [products, setProducts] = useState([]);
  const [confirm, setConfirm] = useState(false);

  // Funkcja asynchroniczna obsługująca usuwanie produktu
  async function handleDelete() {
    // Wysyłamy żądanie DELETE do API, podając ID produktu do usunięcia
    await axios.delete("/api/products/?id=" + confirm);
    toast.success("Product deleted!"); // Wyświetlamy powiadomienie o sukcesie usunięcia
    setConfirm(false); // Resetujemy stan potwierdzenia usunięcia
    router.push("/products"); // Przekierowanie na stronę z listą produktów
  }

  // Hook `useEffect`, aby pobrać produkty użytkownika po załadowaniu strony lub przy zmianie `userId` lub `session`
  useEffect(() => {
    if (session.status === "authenticated") {
      // Jeśli użytkownik jest uwierzytelniony, wysyłamy żądanie GET, aby pobrać jego produkty
      axios.get("/api/products?userId=" + userId).then((response) => {
        setProducts(response.data); // Ustawiamy dane produktów w stanie
      });
    }
  }, [userId, session]); // Wartości zależne to `userId` oraz `session`

  return (
    <>
      {/* Animowana obecność komponentu potwierdzenia usunięcia */}
      <AnimatePresence>
        {confirm && (
          // Jeśli `confirm` jest ustawiony, wyświetlamy okno potwierdzenia w `Backdrop`
          <Backdrop handleClose={() => setConfirm(false)}>
            <h3>Are you sure you want to delete this product?</h3>
            <div className="flex gap-3 justify-center">
              {/* Przycisk "Yes, delete!" wywołujący funkcję usunięcia produktu */}
              <button onClick={handleDelete} className="delete">
                Yes, delete!
              </button>
              {/* Przycisk "No, cancel" anuluje usunięcie, ustawiając `confirm` na false */}
              <button onClick={() => setConfirm(false)} className="cancel">
                No, cancel.
              </button>
            </div>
          </Backdrop>
        )}
      </AnimatePresence>

      {/* Główny layout strony konta użytkownika */}
      <AccountLayout title="Your products">
        <div className="mt-5 flex flex-col sm:mx-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {/* Mapowanie przez produkty i tworzenie kart produktu */}
          {products.map((product, index) => (
            <ProductCard
              {...product} // Przekazujemy wszystkie właściwości produktu
              index={index} // Indeks produktu w liście
              setConfirm={() => setConfirm(product._id)} // Ustawienie `confirm` na ID produktu przy kliknięciu na usunięcie
            />
          ))}
        </div>
      </AccountLayout>
    </>
  );
}
