import React, { useRef, useState } from "react";
import {
  getCategoryTodos,
  getTodoByStatus,
} from "../../store/features/todo/todoSlice";
import { useSelector } from "react-redux";
import ViewTask from "../ViewTask";

import CompleteTab from "./completeTab";
// import NewColumn from "./NewColumn";
import OngoingTab from "./OngoingTab";
import TodoTab from "./todoTab";
import NewTask from "../NewTask";

function Main({ setIsNewTaskShow, isNewTaskShow }) {
  const count = useRef(0); // get the current clicked todo
  const isEditClickREF = useRef(false); // determine whether to edit the current viewed todo
  const [isDoubleClicked, setIsDoubleClicked] = useState(false); // determine whether to view full detail of the current todo

  const currentCategory = useSelector(
    (state) => state.entities.ui.currentCategory
  ); // Current clicked category from redux store
  const todos = useSelector((state) => state.entities.todo); // Current todo from redux store
  const todosByCategory = getCategoryTodos(todos, currentCategory.id); // get all todo by category from redux store

  const currTodos = getTodoByStatus(todosByCategory, "todo");
  const doingTodos = getTodoByStatus(todosByCategory, "doing");
  const completedTodos = getTodoByStatus(todosByCategory, "done");

  function showViewTask(id) {
    count.current = todos.findIndex((todo) => todo.id === id);
    setIsDoubleClicked((prev) => !prev);
  }

  function handleOverlay() {
    isEditClickREF.current = false;
    setIsNewTaskShow((prev) => !prev);
  }

  return (
    <div className="main_overflow">
      <div className="main">
        <TodoTab currTodos={currTodos} showViewTask={showViewTask} />
        <OngoingTab doingTodos={doingTodos} showViewTask={showViewTask} />
        <CompleteTab
          completedTodos={completedTodos}
          showViewTask={showViewTask}
        />

        {isDoubleClicked ? (
          <>
            <div
              className="overlay"
              onClick={() => setIsDoubleClicked((prev) => !prev)}
            ></div>

            <ViewTask
              setIsDoubleClicked={setIsDoubleClicked}
              setIsNewTaskShow={setIsNewTaskShow}
              setIsEditClickREF={isEditClickREF}
              currTodo={todos[count.current]}
            />
          </>
        ) : (
          ""
        )}

        {isNewTaskShow ? (
          <>
            <div className="overlay" onClick={handleOverlay}></div>
            <NewTask
              handleOverlay={handleOverlay}
              isEditClickREF={isEditClickREF.current}
              currTodo={
                isEditClickREF.current
                  ? todos[count.current]
                  : {
                      title: "",
                      description: "",
                      subtasks: [
                        {
                          description: "",
                          completed: false,
                        },
                      ],
                      status: "todo",
                      categoryID: currentCategory.id,
                    }
              }
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Main;
