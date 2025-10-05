import { useState } from "react";
import { useCreateSubtask } from "../api/hook/subtask";

export default function AddSubtask({ taskId }) {
  const { mutate, isLoading } = useCreateSubtask();
  const [subtasks, setSubtask] = useState([
    { title: "", status: false, taskId },
  ]);

  function handleDelete(i) {
    const st = [...subtasks];
    st.splice(i, 1);
    setSubtask(st);
  }

  function handleSubtaskForm(e, i) {
    const newSubtask = subtasks.slice();
    newSubtask[i].title = e.target.value;

    setSubtask(newSubtask);
  }

  function addSubtaskForm() {
    setSubtask((prev) => [
      ...prev,
      {
        title: "",
        status: false,
        taskId: taskId,
      },
    ]);
  }

  const handleSubmitSubtask = () => {
    mutate({ payload: subtasks });
    setSubtask([{ title: "", status: false, taskId }]);
  };

  return (
    <div
      className="Add_subtask"
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      <div className="form_box">
        <label style={{ marginBottom: "20px" }}>Subtasks</label>
        <div className="subtask">
          {subtasks.map((s, idx) => (
            <div key={idx} className="subtask_box">
              <input
                type="text"
                name="subtask"
                placeholder={
                  idx === 0
                    ? "e.g Make coffee"
                    : idx === 1
                    ? "e.g Drink coffee & smile"
                    : idx === 2
                    ? "e.g return to work"
                    : "e.g what do you think?"
                }
                onChange={(e) => handleSubtaskForm(e, idx)}
                value={s.title}
              />
              <span
                className="subtask_delete"
                onClick={() => handleDelete(idx)}
              >
                X
              </span>
            </div>
          ))}
        </div>
        <button onClick={addSubtaskForm} type="button" className="btn">
          +Add New Subtask
        </button>
      </div>
      <button
        type="button"
        className="submit_btn"
        onClick={handleSubmitSubtask}
      >
        {isLoading ? "Processing..." : "Create Subtask"}
      </button>
    </div>
  );
}
