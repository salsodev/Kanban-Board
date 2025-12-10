import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import Logo from "./components/Logo";

import "./App.css";
import { QueryClient } from "react-query";
import { api } from "./api/client";
import { isLoggedIn } from "./api/service";
import { useIsLoggedIn } from "./api/hook/auth";
import { useNavigate, useNavigation } from "react-router-dom";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: 1 },
    queries: { retry: 1 },
  },
});

function App() {
  const navigate = useNavigate();
  const [isNewTaskShow, setIsNewTaskShow] = useState(false);
  const theme = useSelector((state) => state.entities.ui.theme);
  const [isClickDroppable, setIsClickDroppable] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { data, isSuccess, mutate, isLoading } = useIsLoggedIn();

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, [data]);

  useEffect(() => {
    function handleScreenChange() {
      setScreenWidth(window.innerWidth);
      if (screenWidth > 760) {
        setIsClickDroppable(false);
      }
    }

    window.addEventListener("resize", handleScreenChange);

    return () => {
      window.removeEventListener("resize", handleScreenChange);
    };
  }, [screenWidth]);

  if (!data) return null; // render nothing until auth is checked

  return (
    <div className="App" data-theme={theme && theme.isSwitch ? "light" : ""}>
      <Logo />
      <Header
        isClickDroppable={isClickDroppable}
        setIsClickDroppable={setIsClickDroppable}
        setIsNewTaskShow={setIsNewTaskShow}
        screenWidth={screenWidth}
      />
      <Main setIsNewTaskShow={setIsNewTaskShow} isNewTaskShow={isNewTaskShow} />
      <SideBar
        isClickDroppable={isClickDroppable}
        setIsClickDroppable={setIsClickDroppable}
        screenWidth={screenWidth}
      />
    </div>
  );
}

export default App;
