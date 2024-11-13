import Backdrop from "@/components/Backdrop";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/inputs/UserForm";
import AccountLayout from "@/components/layout/AccountLayout";
import { useImage } from "@/hooks/useImage";
import useProfile from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  // Pobranie sesji użytkownika
  const session = useSession();
  // Stan do zarządzania pełnym wyświetlaniem obrazu (np. zdjęcie profilowe w dużym rozmiarze)
  const [fullImage, setFullImage] = useState(false);
  // Pobranie danych użytkownika i statusu ładowania z niestandardowego hooka `useProfile`
  const { user, loading } = useProfile(); // Hook
  const { setUserImage } = useImage(); // Hook
  // Funkcja obsługująca aktualizację profilu użytkownika!!!
  // najpierw stworzylem UserForm, pozniej sie zabralem za EditableImage i tutaj przekazuje uzytkownika, do tego zrobilem hooka useProfile
  async function handleProfileUpdate(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Sprawdzenie odpowiedzi; w przypadku sukcesu obietnica zostaje rozwiązana, w przeciwnym razie odrzucona
      if (response.ok) {
        resolve();
        setUserImage(data.image); // ZDJECIE W HEADERZE!!!!Ustawienie nowego obrazu użytkownika w kontekście
      } else reject();
    });

    // Wyświetlenie powiadomienia za pomocą `toast` dla obietnicy `savingPromise`
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error while saving.",
    });
  }
  return (
    <>
      {/* Warunkowe wyświetlanie obrazu w pełnym rozmiarze w elemencie Backdrop */}
      {fullImage && (
        <Backdrop handleClose={() => setFullImage(false)}>
          <img className="rounded-lg max-h-[65vh]" src={user?.image} alt="" />
        </Backdrop>
      )}
      {/* Główny layout strony z profilem użytkownika */}
      <AccountLayout title="My profile">
        {loading ? (
          <Spinner /> // Wyświetlanie ładowania, gdy dane użytkownika są jeszcze pobierane
        ) : (
          <UserForm
            user={user} // Przekazanie danych użytkownika do formularza
            setFullImage={setFullImage} // Funkcja do ustawienia stanu pełnego obrazu
            onSubmit={handleProfileUpdate} // Obsługa aktualizacji profilu po przesłaniu formularza
          />
        )}
      </AccountLayout>
    </>
  );
}

// W powyższym kodzie stworzyłem stronę profilu użytkownika, która zawiera formularz do edycji danych użytkownika. Napisane jest do tego api/profile
