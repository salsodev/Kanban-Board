import React from "react";
import Category from "./category";
import { useDispatch, useSelector } from "react-redux";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
import { switchThemeButtonClick } from "../../store/features/ui/UiSlice";

function SideBar({ isClickDroppable, setIsClickDroppable, screenWidth }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.entities.categories);
  const theme = useSelector((state) => state.entities.ui.theme);

  let res = "";

  if (screenWidth <= 760) {
    if (isClickDroppable) {
      res = (
        <>
          <div
            className="overlay"
            onClick={() => setIsClickDroppable((prev) => !prev)}
            style={{ zIndex: 10 }}
          ></div>
          <aside
            className="sidebar"
            style={{ zIndex: 1000, borderRadius: "10px" }}
          >
            <h4>
              All boards <span className="count">({categories.length})</span>
            </h4>
            <Category />
            <footer>
              <div className="theme">
                <MdOutlineWbSunny />
                <div
                  className={`switch ${theme.isSwitch ? "lightTheme" : ""}`}
                  onClick={() => dispatch(switchThemeButtonClick())}
                ></div>
                <BsFillMoonStarsFill />
              </div>
              <div>
                <BsEyeSlash />
                Hide Sidebar
              </div>
            </footer>
          </aside>
        </>
      );
    } else {
      res = "";
    }
  } else {
    res = (
      <aside className="sidebar">
        <h4>
          All boards <span className="count">({categories.length})</span>
        </h4>
        <Category />
        <footer>
          <div className="theme">
            <MdOutlineWbSunny />
            <div
              className={`switch ${theme.isSwitch ? "lightTheme" : ""}`}
              onClick={() => dispatch(switchThemeButtonClick())}
            ></div>
            <BsFillMoonStarsFill />
          </div>
          <div>
            <BsEyeSlash />
            Hide Sidebar
          </div>
        </footer>
      </aside>
    );
  }
  return <>{res}</>;
}

export default SideBar;
