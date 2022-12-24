import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import ListItem from "./ListItem";
import { addActiveCategory } from "../../store/features/ui/UiSlice";
import { todoRemoveRelatedCategory } from "../../store/features/todo/todoSlice";
import {
  categoryAdded,
  categoryRemoved,
} from "../../store/features/filter/filterSlice";

function Category() {
  const categories = useSelector((state) => state.entities.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ description: "" });

  function addCategory() {
    dispatch(categoryAdded(category));
    setCategory({ description: "" });
  }

  useEffect(() => {
    if (categories.length > 0) {
      const currCategory = categories[categories.length - 1];
      dispatch(addActiveCategory(currCategory));
    }
  }, [categories, dispatch]);

  function handleDeleteCategory(categoryID) {
    // eslint-disable-next-line no-restricted-globals
    const proceed = confirm(
      "This will delete all related projects with this board. This action cannot be reverted.\n\nDo you wish to proceed?"
    );
    if (proceed) {
      dispatch(categoryRemoved(categoryID));
      dispatch(todoRemoveRelatedCategory({ categoryID }));
    }
  }

  return (
    <div className="category">
      <ul className="category_list">
        {categories &&
          categories.map(({ id, description }) => (
            <ListItem
              key={id}
              id={id}
              description={description}
              handleDeleteCategory={handleDeleteCategory}
            />
          ))}
      </ul>
      <div className="category_added_input_box">
        <input
          type="text"
          value={category.description}
          onChange={(e) => setCategory({ description: e.target.value })}
        />
      </div>
      <span className="btn-category" onClick={(e) => addCategory(e)}>
        <MdOutlineSpaceDashboard />
        +Create New Board
      </span>
    </div>
  );
}

export default Category;
