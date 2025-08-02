import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [user, SetUser] = useState(null);
  const [showLogin, SetShowLogin] = useState(false);
  const [token, SetToken] = useState(localStorage.getItem("token"));
  const [credit, SetCredit] = useState(false);
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/user/credits", {
        headers: { token }
      });
      if (data.success) {
        SetCredit(data.credits)
        SetUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendurl + "/image/generate-image",
        { prompt },
        { headers: { token } }
      );
      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.CreditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    SetToken("");
    SetUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);
  const value = {
    user,
    SetUser,
    showLogin,
    SetShowLogin,
    backendurl,
    token,
    SetToken,
    credit,
    SetCredit,
    loadCreditsData,
    logout,
    generateImage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
