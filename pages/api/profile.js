import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  // Nawiązanie połączenia z MongoDB przy pomocy funkcji `mongooseConnect`
  await mongooseConnect();
  // Obsługa zapytań typu GET
  if (req.method === "GET") {
    // Pobranie sesji dla bieżącego żądania
    const session = await getSession({ req });
    const email = session?.user?.email; // Sprawdzenie, czy istnieje adres email w sesji
    // Jeśli brak emaila, zwracamy pusty obiekt
    if (!email) {
      res.json({});
    }
    // Wyszukiwanie użytkownika oraz informacji o użytkowniku w bazie danych

    const user = await User.findOne({ email }).lean(); // Pobieranie głównych danych użytkownika
    const userInfo = await UserInfo.findOne({ email }).lean(); // Pobieranie dodatkowych informacji o użytkowniku
    // Zwrócenie odpowiedzi z połączonymi danymi `user` i `userInfo`
    return res.json({ ...user, ...userInfo });
  }
  if (req.method === "PUT") {
    // Pobranie sesji na serwerze, co zapewnia bezpieczny dostęp do danych sesji
    const session = await getServerSession(req, res, authOptions);
    const email = session.user.email; // Pobieranie adresu email z sesji
    const { name, image, ...userInfo } = req.body; // Rozdzielenie danych z ciała żądania na `name`, `image` oraz `userInfo`
    await User.updateOne({ email }, { name, image }); // Aktualizacja podstawowych danych użytkownika w kolekcji `User`
    await UserInfo.updateOne({ email }, userInfo, { upsert: true }); // Aktualizacja lub wstawienie (upsert) danych w `UserInfo` dla dodatkowych informacji o użytkowniku
    return res.json(true); // Zwrócenie odpowiedzi true, co potwierdza sukces aktualizacji
  }
}
