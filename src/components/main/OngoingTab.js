import React from "react";
import { getSubtaskResolved } from "../../store/features/todo/todoSlice";
import DragNdDrop from "./DragNdDrop";

function OngoingTab({ doingTodos, showViewTask }) {
  const dragEvents = DragNdDrop();

  return (
    <section className="ongoing_container">
      <h4 className="indicator">
        <span className="indicator_ongoing"></span> Doing ({doingTodos.length})
      </h4>
      <div
        className="ongoing"
        onDragOver={(e) => dragEvents.todoDragOver(e)}
        onDragLeave={(e) => dragEvents.todoDragLeave(e)}
        onDrop={(e) => dragEvents.todoDrop(e)}
      >
        {doingTodos.map((doingTodo) => (
          <div
            className="ongoing_box"
            key={doingTodo.id}
            onDoubleClick={() => showViewTask(doingTodo.id)}
            // onDragStart={(e) =>
            //   dragEvents.ongoingTodoDragStart(e, doingTodo.id)
            // }
            // onDragStartCapture={(e) =>
            //   dragEvents.ongoingTodoDragStart(e, doingTodo.id)
            // }
            draggable
          >
            <h3 className="ongoing_title">{doingTodo.title}</h3>
            <div className="ongoing_subtasks">
              {getSubtaskResolved(doingTodo)} of {doingTodo.subtasks.length}{" "}
              subtasks
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OngoingTab;
