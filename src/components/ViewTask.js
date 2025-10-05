import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useDeleteProjectTask,
  useGetProjectTaskDetail,
  useUpdateSingleTask,
} from "../api/hook/task";
import { useUpdateSubtask } from "../api/hook/subtask";
import { getSubtaskResolved } from "../utils/helpers";
import { useSelector } from "react-redux";
import AddSubtask from "./AddSubtask";

function ViewTask({
  currTodo,
  setIsDoubleClicked,
  setIsNewTaskShow,
  setIsEditClickREF,
}) {
  const currProject = useSelector(
    (state) => state.entities?.ui?.currentCategory
  );
  const { data: currentTask } = useGetProjectTaskDetail(currTodo.id);
  const { mutate } = useUpdateSingleTask(currTodo.id, currProject.id);
  const { mutate: updateMySubtask } = useUpdateSubtask();
  const { mutate: deleteTask } = useDeleteProjectTask(
    currTodo.id,
    currProject.id
  );

  const [popUp, setPopUp] = useState(false);
  const [showAddSubtask, setShowAddSubtask] = useState(false);

  function handleDelete() {
    setIsDoubleClicked((prev) => !prev);
    deleteTask();
  }

  function handleUpdate() {
    setIsEditClickREF.current = true;
    setIsNewTaskShow((prev) => !prev);
    setIsDoubleClicked((prev) => !prev);
  }

  return (
    <>
      <section className="view_task">
        <div className="flex">
          <h3>{currentTask?.task?.title}</h3>
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
        <p>{currentTask?.task?.description}</p>
        <div>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <h4 className="view_subtasks_header">
              Subtasks ({getSubtaskResolved(currentTask)} of{" "}
              {currentTask?.task?.subtasks?.length})
            </h4>
            <button
              type="button"
              style={{ cursor: "pointer" }}
              className="submit_btn"
              onClick={() => setShowAddSubtask(true)}
            >
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#FFF"
                  d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                ></path>
              </svg>
            </button>
          </div>

          <div className="view_subtasks">
            {currentTask?.task?.subtasks?.map((subtask) => (
              <div className="subtask_resolved_box" key={subtask.id}>
                <input
                  type="checkbox"
                  id={`subtask--${subtask.id}`}
                  checked={subtask.status ? true : false}
                  onChange={(e) =>
                    updateMySubtask({
                      payload: { status: e.target.checked },
                      subtaskID: subtask.id,
                    })
                  }
                />
                <label htmlFor={`subtask--${subtask.id}`}>
                  {subtask.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="select_box">
          <h4>Status</h4>
          <select
            value={currentTask?.task?.status}
            onChange={(e) => mutate({ status: e.target.value })}
          >
            {["todo", "pending", "in review", "done"].map((status) => (
              <option key={status} value={status}>
                {status[0].toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </section>
      {showAddSubtask && (
        <>
          <div
            className="overlay"
            onClick={() => setShowAddSubtask((prev) => !prev)}
          ></div>
          <AddSubtask taskId={currentTask?.task?.id} />
        </>
      )}
    </>
  );
}

export default ViewTask;
