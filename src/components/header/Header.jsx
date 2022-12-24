import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { todoRemoveAll } from "../../store/features/todo/todoSlice";
import { categoryRemovedAll } from "../../store/features/filter/filterSlice";

function Header({
  setIsNewTaskShow,
  isClickDroppable,
  setIsClickDroppable,
  screenWidth,
}) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.entities.categories);

  const [event, setEvent] = useState({
    isClicked: false,
    DeleteAll: () => {
      // eslint-disable-next-line no-restricted-globals
      const proceed = confirm(
        "Are you sure you want to delete all your saved work?\nDo you wish to continue?"
      );

      if (proceed) {
        dispatch(todoRemoveAll());
        dispatch(categoryRemovedAll());
        localStorage.removeItem("persist:root");
      }
    },
  });

  const currentCategoryItem = useSelector(
    (state) => state.entities.ui.currentCategory
  );

  function handleAddTodoBtn() {
    if (categories.length > 0) {
      setIsNewTaskShow((prev) => !prev);
    } else {
      alert("Waiting for you to create a new board to proceed...");
    }
  }

  const handleCategoryPopUp = () => {
    if (screenWidth <= 760) {
      setIsClickDroppable((prev) => !prev);
    }
  };

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
        {categories.length > 0
          ? currCategoryName(currentCategoryItem.description)
          : "Emptied"}{" "}
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
        onClick={() =>
          setEvent((prev) => ({ ...prev, isClicked: !prev.isClicked }))
        }
      />
      {event.isClicked ? (
        <div className="delete_popup">
          <span className="delete_all" onClick={event.DeleteAll}>
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
