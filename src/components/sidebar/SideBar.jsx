import Category from "./category";
import { useDispatch, useSelector } from "react-redux";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
import { switchThemeButtonClick } from "../../store/features/ui/UiSlice";
import { useGetProjects } from "../../api/hook/project";

function SideBar({ isClickDroppable, setIsClickDroppable, screenWidth }) {
  const dispatch = useDispatch();
  const { data } = useGetProjects();

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
              All boards{" "}
              <span className="count">({data?.projects?.length ?? 0})</span>
            </h4>
            <Category data={data} />
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
          All boards{" "}
          <span className="count">({data?.projects?.length ?? 0})</span>
        </h4>
        <Category data={data} />
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
