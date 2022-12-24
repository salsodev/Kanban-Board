import { useDispatch } from "react-redux";
import { todoStatusChanged } from "../../store/features/todo/todoSlice";

function DragNdDrop() {
  const dispatch = useDispatch();

  return {
    todoDragStart: (e, id) => {
      e.preventDefault();
      console.log(id);
      e.dataTransfer.setData("id", id);
    },
    todoDragOver: (e) => {
      e.preventDefault();
      // e.stopPropagation();
      console.log("dragging for todo task");
      e.target.classList.add("drag_over");
    },
    todoDragLeave: (e) => {
      e.preventDefault();
      e.target.classList.remove("drag_over");
    },
    todoDrop: (e) => {
      e.preventDefault();
      e.target.classList.remove("drag_over");
      const id = Number(e.dataTransfer.getData("id"));
      console.log(id);
      dispatch(todoStatusChanged({ id, status: "doing" }));
    },
    // Ongoing Todo
    ongoingTodoDragStart: (e, id) => {
      e.preventDefault();
      e.dataTransfer.setData("id", id);
    },

    ongoingTodoDragOver: (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("dragging over for doing task");
      e.target.classList.add("drag_over");
    },

    ongoingTodoDragLeave: (e) => {
      e.preventDefault();
      e.target.classList.remove("drag_over");
    },

    ongoingTodoDrop: (e) => {
      e.preventDefault();
      console.log("dropping for doing task");
      e.target.classList.remove("drag_over");
      const id = e.dataTransfer.getData("id");
      dispatch(todoStatusChanged({ id, status: "doing" }));
    },
    // Ongoing Todo
    completedTodoDragStart: (e, id) => {
      e.preventDefault();
      e.dataTransfer.setData("id", id);
    },

    completedTodoDragOver: (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("dragging for completed task");
      e.target.classList.add("drag_over");
    },

    completedTodoDragLeave: (e) => {
      e.preventDefault();
      e.target.classList.remove("drag_over");
    },

    completedTodoDrop: (e) => {
      e.preventDefault();
      e.target.classList.remove("drag_over");
      const id = e.dataTransfer.getData("id");
      dispatch(todoStatusChanged({ id, status: "done" }));
    },
  };
}

export default DragNdDrop;
