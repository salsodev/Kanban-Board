import React from "react";
import { getSubtaskResolved } from "../../store/features/todo/todoSlice";
import DragNdDrop from "./DragNdDrop";

function CompleteTab({ completedTodos, showViewTask }) {
  const dragEvents = DragNdDrop();

  return (
    <section className="complete_container">
      <h4 className="indicator">
        <span className="indicator_complete"></span> Done (
        {completedTodos.length})
      </h4>
      <div
        className="complete"
        onDragOver={(e) => dragEvents.todoDragOver(e)}
        onDragLeave={(e) => dragEvents.todoDragLeave(e)}
        onDrop={(e) => dragEvents.todoDrop(e)}
      >
        {completedTodos.map((completeTodo) => (
          <div
            className="complete_box"
            key={completeTodo.id}
            onDoubleClick={() => showViewTask(completeTodo.id)}
            draggable
          >
            <h3 className="complete_title">{completeTodo.title}</h3>
            <div className="complete_subtasks">
              {getSubtaskResolved(completeTodo)} of{" "}
              {completeTodo.subtasks.length} subtasks
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CompleteTab;
