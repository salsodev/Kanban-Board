import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import Logo from "./components/Logo";

import "./App.css";
import { QueryClient } from "react-query";
import { useIsLoggedIn } from "./api/hook/auth";
import { useNavigate } from "react-router-dom";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: 2 },
    queries: { retry: 2 },
  },
});

function App() {
  const navigate = useNavigate();
  const [isNewTaskShow, setIsNewTaskShow] = useState(false);
  const theme = useSelector((state) => state.entities.ui.theme);
  const [isClickDroppable, setIsClickDroppable] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { data: isLoggedin } = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/login");
    }
  }, [isLoggedin, navigate]);

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

  if (!isLoggedin) {
    return (
      <div className="loaderContainer">
        <div className="loaderWrapper">
          <div className="loader"></div>
          <p className="shimmer-text">Processing...</p>
        </div>
      </div>
    ); // render nothing until auth is checked
  }

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
