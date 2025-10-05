import DragNdDrop from "./DragNdDrop";

function InReviewTab({ inReviewTasks, showViewTask }) {
  const dragEvents = DragNdDrop();

  return (
    <section className="ongoing_container">
      <h4 className="indicator">
        <span className="indicator_inreview"></span> In Review (
        {inReviewTasks?.length ?? 0})
      </h4>
      <div
        className="ongoing"
        onDragOver={(e) => dragEvents.todoDragOver(e)}
        onDragLeave={(e) => dragEvents.todoDragLeave(e)}
        onDrop={(e) => dragEvents.todoDrop(e)}
      >
        {inReviewTasks?.map((doingTodo) => (
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
              {doingTodo?.completed_subtasks} of {doingTodo?.total_subtasks}{" "}
              subtasks
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InReviewTab;
