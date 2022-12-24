import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoAdded, todoUpdate } from "../store/features/todo/todoSlice";
import Subtask from "./subtask";

function NewTask({ currTodo, isEditClickREF, handleOverlay }) {
  const currentCategory = useSelector(
    (state) => state.entities.ui.currentCategory
  );
  const ref = useRef({
    updateTitle: "Update Task",
    updateButton: "Save Changes",
  });
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(currTodo);

  function addSubtaskForm() {
    setFormData((prev) => ({
      ...prev,
      subtasks: [
        ...formData.subtasks,
        {
          description: "",
          completed: false,
        },
      ],
    }));
  }

  function handleClick(id) {
    if (isEditClickREF) {
      dispatch(
        todoUpdate({
          ...formData,
          id,
        })
      );
      handleOverlay();
    } else {
      dispatch(todoAdded(formData));
    }

    setFormData({
      title: "",
      description: "",
      subtasks: [
        {
          description: "",
          completed: false,
        },
      ],
      status: "todo",
      categoryID: currentCategory.id,
    });
  }

  return (
    <div className="form_container">
      <h3 className="form_title">
        {isEditClickREF ? ref.current.updateTitle : "Add new task"}
      </h3>
      <form className="form">
        <div className="form_box">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g Take a coffee break"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="form_box">
          <label>Description</label>
          <textarea
            name="description"
            id=""
            cols="33"
            rows="3"
            placeholder="e.g It's always good to take a break. This 15 minutes break will recharge the battery a little"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
        </div>
        <div className="form_box">
          <label>Subtasks</label>
          <div className="subtask">
            {/* SUbtask element added programmatically */}
            {formData.subtasks.map((subtaskFormField, index) => (
              <Subtask
                key={index + 1}
                subtaskFormField={subtaskFormField}
                id={index}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </div>
          <button onClick={addSubtaskForm} type="button" className="btn">
            +Add New Subtask
          </button>
        </div>
        <div className="form_box select_box">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button
          type="button"
          className="submit_btn"
          onClick={() => handleClick(currTodo.id)}
        >
          {isEditClickREF ? ref.current.updateButton : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default NewTask;
