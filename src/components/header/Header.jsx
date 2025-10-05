import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useLogout } from "../../api/hook/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useClearProjects } from "../../api/hook/project";
import { toast } from "sonner";

function Header({
  setIsNewTaskShow,
  isClickDroppable,
  setIsClickDroppable,
  screenWidth,
}) {
  const { mutate, isSuccess } = useLogout();
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(false);
  const currProject = useSelector(
    (state) => state.entities?.ui?.currentCategory
  );
  const { mutate: clearProjects } = useClearProjects(currProject?.id);
  const data = useQueryClient().getQueryData(["projects"]);

  function handleAddTodoBtn() {
    if (data?.projects?.length > 0) {
      setIsNewTaskShow((prev) => !prev);
    } else {
      toast.info("Create a new board to proceed...");
    }
  }

  const handleCategoryPopUp = () => {
    if (screenWidth <= 760) {
      setIsClickDroppable((prev) => !prev);
    }
  };

  const handleLogout = () => {
    mutate();
    setMenuClicked(false);
  };

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  return (
    <nav
      className="header"
      style={
        screenWidth <= 760
          ? { zIndex: 100, display: "flex", alignItems: "center", gap: "1rem" }
          : { zIndex: 1 }
      }
    >
      {screenWidth <= 760 ? (
        <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
          <g fill="#635FC7" fillRule="evenodd">
            <rect width="6" height="25" rx="2"></rect>
            <rect opacity="0.75" x="9" width="6" height="25" rx="2"></rect>
            <rect opacity="0.5" x="18" width="6" height="25" rx="2"></rect>
          </g>
        </svg>
      ) : (
        ""
      )}
      <h1
        className={`header_title ${isClickDroppable ? "rotate" : ""}`}
        onClick={handleCategoryPopUp}
      >
        {data?.projects?.length > 0
          ? currCategoryName(currProject?.name)
          : "Emptied"}
        <MdKeyboardArrowDown className="arr_down" />
      </h1>
      <div className="btn" onClick={() => handleAddTodoBtn()}>
        <span className="text-content">+Add New Task</span>
        <span className="icon">
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            ></path>
          </svg>
        </span>
      </div>
      <BsThreeDotsVertical
        className="dots dot_pos"
        onClick={() => setMenuClicked((prev) => !prev)}
      />
      {menuClicked ? (
        <div className="delete_popup">
          <button type="button" className="logout_btn" onClick={handleLogout}>
            Log out
          </button>
          <span className="delete_all" onClick={() => clearProjects()}>
            Delete all
          </span>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Header;

function currCategoryName(str = "") {
  if (str.length < 16) {
    return str;
  } else {
    str = str.slice(0, 15);
    return str + "...";
  }
}
