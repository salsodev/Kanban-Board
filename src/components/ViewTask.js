import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  todoSubtaskResolve,
  todoStatusChanged,
  getSubtaskResolved,
  todoRemove,
} from "../store/features/todo/todoSlice";

function ViewTask({
  currTodo,
  setIsDoubleClicked,
  setIsNewTaskShow,
  setIsEditClickREF,
}) {
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState(false);

  function handleDelete() {
    setIsDoubleClicked((prev) => !prev);
    dispatch(todoRemove({ id: currTodo.id }));
  }

  function handleUpdate() {
    setIsEditClickREF.current = true;
    setIsNewTaskShow((prev) => !prev);
    setIsDoubleClicked((prev) => !prev);
  }

  return (
    <section className="view_task">
      <div className="flex">
        <h3>{currTodo.title}</h3>
        <BsThreeDotsVertical
          className="dots"
          onClick={() => setPopUp(!popUp)}
        />
      </div>
      {popUp ? (
        <div className="popup_update float_right">
          <span onClick={handleUpdate}>Edit Task</span>
          <span onClick={handleDelete}>Delete Task</span>
        </div>
      ) : (
        ""
      )}
      <p>{currTodo.description}</p>
      <div>
        <h4>
          Subtasks ({getSubtaskResolved(currTodo)} of {currTodo.subtasks.length}
          )
        </h4>
        <div className="view_subtasks">
          {currTodo.subtasks.map((subtask) => (
            <div className="subtask_resolved_box" key={subtask.id}>
              <input
                type="checkbox"
                id={`subtask--${subtask.id}`}
                checked={subtask.completed ? true : false}
                onChange={() =>
                  dispatch(
                    todoSubtaskResolve({
                      todoID: currTodo.id,
                      subtaskID: subtask.id,
                    })
                  )
                }
              />
              <label htmlFor={`subtask--${subtask.id}`}>
                {subtask.description}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="select_box">
        <h4>Status</h4>
        <select
          value={currTodo.status}
          onChange={(e) =>
            dispatch(
              todoStatusChanged({ id: currTodo.id, status: e.target.value })
            )
          }
        >
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
    </section>
  );
}

export default ViewTask;
