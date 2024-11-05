import UserIcon from "../icons/UserIcon";
import toast from "react-hot-toast";

// Asynchroniczna funkcja obsługująca zmianę pliku
export default function EditableImage({ image, setImage, setFullImage }) {
  async function handleFileChange(e) {
    const files = e.target?.files; // Pobieramy wybrane pliki
    if (files?.length === 1) {
      // Tworzymy nowy obiekt FormData
      const data = new FormData(); // Dodajemy wybrany plik do FormData
      data.set("file", files[0]);
      // Sprawdzamy, czy wybrany plik jest obrazem
      if (!files[0].type.startsWith("image/")) {
        toast.error("Please select an image file."); // Wyświetlamy błąd, jeśli plik nie jest obrazem
        return;
      }
      // Tworzymy obietnicę wysyłki pliku na serwer
      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          // Jeśli odpowiedź jest pozytywna, przetwarzamy dane odpowiedzi na JSON
          return response.json().then((object) => {
            setImage(object.links[0]); // Ustawiamy obraz na podstawie linku z odpowiedzi
          });
        }
        throw new Error("Something went wrong"); // Obsluga bledow
      });
      // Wyświetlamy komunikaty o stanie przesyłania pliku (loading, success, error)
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete!",
        error: "Upload error.",
      });
    }
  }
  return (
    <div className="p-2 inline-flex items-center flex-col gap-2">
      {/* Obraz użytkownika lub ikona domyślna */}
      <div className="rounded-full flex items-center justify-center bg-white/50 p-1 size-[120px] shadow-lg">
        {image ? (
          <>
            {/* Jeśli obraz istnieje, wyświetlamy go i umożliwiamy powiększenie */}
            <img
              className="w-full h-full object-cover rounded-full cursor-pointer"
              src={image}
              onClick={() => setFullImage(true)} // Kliknięcie na obraz powiększa go
              alt=""
            />
          </>
        ) : (
          // Jeśli obraz nie istnieje, wyświetlamy ikonę użytkownika
          <UserIcon className="text-color-800" />
        )}
      </div>
      {/* Etykieta do edycji obrazu (przycisk do wybrania nowego pliku) */}
      <label className="bg-white/50 border-2 border-color-800 shadow-lg text-center py-1 rounded-md hover:scale-105 transition delay-100 duration-300 cursor-pointer w-full">
        <input
          type="file" // Pole do wyboru pliku
          accept="image/*" // Akceptujemy tylko pliki obrazów
          className="hidden" // Ukrywamy domyślny przycisk pliku
          onChange={handleFileChange} // Wywołanie funkcji przy zmianie pliku
        />
        <span>Edit</span>
      </label>
    </div>
  );
}
