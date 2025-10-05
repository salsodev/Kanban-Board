import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Subtask from "./subtask";
import { useCreateProjectTask } from "../api/hook/project";
import { useUpdateTaskWithSubtask } from "../api/hook/task";

function NewTask({ currTodo, isEditClickREF, handleOverlay }) {
  const currentCategory = useSelector(
    (state) => state.entities.ui.currentCategory
  );
  const { mutate, isLoading } = useCreateProjectTask(currentCategory.id);
  const { mutate: updateTask, isLoading: isLoadingUpdateTask } =
    useUpdateTaskWithSubtask(currentCategory.id);

  const ref = useRef({
    updateTitle: "Update Task",
    updateButton: "Save Changes",
  });

  const [formData, setFormData] = useState(currTodo?.task ?? currTodo);

  function addSubtaskForm() {
    setFormData((prev) => ({
      ...prev,
      subtasks: [
        ...formData.subtasks,
        {
          title: "",
          status: false,
        },
      ],
    }));
  }

  function handleClick() {
    if (formData.title.trim() === "" || formData.description.trim() === "")
      return;

    if (isEditClickREF) {
      // update task function
      updateTask({ payload: formData, taskID: formData.id });
      handleOverlay();
    } else {
      // add task function
      mutate(formData);
    }

    setFormData({
      title: "",
      description: "",
      subtasks: [],
      status: "todo",
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
            {formData?.subtasks?.map((subtaskFormField, index) => (
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
            {["todo", "pending", "in review", "done"].map((status) => (
              <option key={status} value={status}>
                {status[0].toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="submit_btn"
          onClick={() => handleClick(currTodo.id)}
        >
          {isEditClickREF
            ? isLoadingUpdateTask
              ? "Processing..."
              : ref.current.updateButton
            : isLoading
            ? "Processing..."
            : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default NewTask;
