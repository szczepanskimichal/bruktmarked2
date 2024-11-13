import { createContext, useContext, useEffect, useState } from "react";
import useProfile from "./useProfile";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(null);

  const { user, loading: profileLoading } = useProfile();

  useEffect(() => {
    if (user?.image) {
      setLoading(true);
      setUserImage(user.image);
      setLoading(false);
    }
  }, [profileLoading]);
  return (
    <ImageContext.Provider value={{ userImage, setUserImage, loading }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  return useContext(ImageContext); // to jest hook, ktory zwraca nam context
};
