import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getActiveCategory } from "../../store/features/filter/filterSlice";
import { addActiveCategory } from "../../store/features/ui/UiSlice";

function ListItem({ id, description, handleDeleteCategory }) {
  const categories = useSelector((state) => state.entities.categories);
  const dispatch = useDispatch();
  const currCategory = getActiveCategory(categories, id);

  return (
    <li
      className="category_list_item"
      onClick={() => dispatch(addActiveCategory(currCategory))}
      onDoubleClick={() => handleDeleteCategory(id)}
    >
      <MdOutlineSpaceDashboard />
      <span>{description}</span>
    </li>
  );
}

export default ListItem;
