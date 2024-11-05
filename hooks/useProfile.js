import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function useProfile() {
  // Pobranie statusu sesji przy pomocy hooka `useSession`
  const { data: status } = useSession();
  // Definicja stanu `user` do przechowywania danych użytkownika oraz `loading` do kontroli stanu ładowania
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/profile").then((response) => {
      setUser(response.data); // Zapisanie danych użytkownika do stanu `user`
      setLoading(false); // Ustawienie stanu ładowania na false, gdy dane zostaną pobrane
    });
  }, [status]); // `status` jako zależność - gdy się zmienia, efekt uruchamia się ponownie
  return { user, loading }; // Zwracamy obiekt zawierający `user` oraz `loading`, co pozwala na ich wykorzystanie w innych komponentach
}
