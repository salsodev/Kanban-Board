function Subtask({ subtaskFormField, id, formData, setFormData }) {
  function handleSubtaskForm(e, i) {
    const newSubtask = formData.subtasks.map((subtask) => {
      if (subtask.id) {
        return {
          ...subtask,
        };
      }
      return {
        ...subtask,
      };
    });
    newSubtask[i].title = e.target.value;

    setFormData((prev) => ({
      ...prev,
      subtasks: newSubtask,
    }));
  }

  function handleDelete(i) {
    const subtasks = [...formData.subtasks];
    subtasks.splice(i, 1);
    setFormData((prev) => ({
      ...prev,
      subtasks: [...subtasks],
    }));
  }

  return (
    <div className="subtask_box">
      <input
        type="text"
        name="subtask"
        placeholder={
          id === 0
            ? "e.g Make coffee"
            : id === 1
            ? "e.g Drink coffee & smile"
            : id === 2
            ? "e.g return to work"
            : "e.g what do you think?"
        }
        onChange={(e) => handleSubtaskForm(e, id)}
        value={subtaskFormField.title}
      />
      <span className="subtask_delete" onClick={() => handleDelete(id)}>
        X
      </span>
    </div>
  );
}

export default Subtask;
