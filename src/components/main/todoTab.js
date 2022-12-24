import React from "react";
import { getSubtaskResolved } from "../../store/features/todo/todoSlice";
import DragNdDrop from "./DragNdDrop";

function TodoTab({ currTodos, showViewTask }) {
  const dragEvents = DragNdDrop();

  return (
    <section className="todo_container">
      <h4 className="indicator">
        <span className="indicator_todo"></span> todo ({currTodos.length})
      </h4>
      <div
        className="todo"
        onDragOver={(e) => dragEvents.ongoingTodoDragOver(e)}
        onDragLeave={(e) => dragEvents.ongoingTodoDragLeave(e)}
        onDrop={(e) => dragEvents.ongoingTodoDrop(e)}
      >
        {currTodos.map((currTodo) => (
          <div
            className="todo_box"
            key={currTodo.id}
            id={currTodo.id}
            onDoubleClick={() => showViewTask(currTodo.id)}
            draggable
            onDragStart={(e) => dragEvents.todoDragStart(e)}
          >
            <p className="todo_title">{currTodo.title}</p>
            <div className="todo_subtasks">
              {getSubtaskResolved(currTodo)} of {currTodo.subtasks.length}{" "}
              subtasks
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TodoTab;
