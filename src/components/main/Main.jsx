import { useEffect, useRef, useState } from "react";
import ViewTask from "../ViewTask";
import CompleteTab from "./completeTab";
import OngoingTab from "./OngoingTab";
import TodoTab from "./todoTab";
import NewTask from "../NewTask";
import { useGetProjectTasks } from "../../api/hook/project";
import { getTodoByStatus } from "../../utils/helpers";
import InReviewTab from "./Inreview";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";

function Main({ setIsNewTaskShow, isNewTaskShow }) {
  const queryClient = useQueryClient();
  const currUser =
    queryClient.getQueryData("currentUser") ??
    JSON.parse(localStorage.getItem("currentUser"));
  const count = useRef(0); // get the current clicked todo
  const isEditClickREF = useRef(false); // determine whether to edit the current viewed todo
  const [isDoubleClicked, setIsDoubleClicked] = useState(false); // determine whether to view full detail of the current todo

  const currProject = useSelector(
    (state) => state.entities?.ui?.currentCategory
  ); // Current clicked category from redux store
  let projectTasks = useGetProjectTasks(currProject?.id); // get all todo by category from redux store
  const taskDetail =
    queryClient.getQueryData([["taskDetail"]]) ??
    JSON.parse(localStorage.getItem("taskDetail"));

  const currTasks = getTodoByStatus(projectTasks?.tasks, "todo");
  const pendingTasks = getTodoByStatus(projectTasks?.tasks, "pending");
  const inReviewTasks = getTodoByStatus(projectTasks?.tasks, "in review");
  const completedTasks = getTodoByStatus(projectTasks?.tasks, "done");

  function showViewTask(id) {
    count.current = projectTasks?.tasks?.findIndex((task) => task.id === id);
    setIsDoubleClicked((prev) => !prev);
  }

  function handleOverlay() {
    isEditClickREF.current = false;
    setIsNewTaskShow((prev) => !prev);
  }

  useEffect(() => {
    if (!currUser) {
      queryClient.setQueryData(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, [currUser]);

  return (
    <div className="main_overflow">
      <div className="welcome">
        <h2>
          Welcome back,{" "}
          {currUser?.username[0].toUpperCase() + currUser?.username.slice(1)}
          👋
        </h2>
        <p
          style={{
            color: "var(--clr-text-gray)",
            marginTop: "8px",
            fontSize: "14px",
          }}
        >
          Plan Smart. Execute Smooth.
        </p>
      </div>
      <div className="main">
        <TodoTab currTodos={currTasks} showViewTask={showViewTask} />
        <OngoingTab doingTodos={pendingTasks} showViewTask={showViewTask} />
        <InReviewTab
          inReviewTasks={inReviewTasks}
          showViewTask={showViewTask}
        />
        <CompleteTab
          completedTodos={completedTasks}
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
              currTodo={projectTasks?.tasks[count.current]}
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
                  ? taskDetail
                  : {
                      title: "",
                      description: "",
                      subtasks: [],
                      status: "todo",
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
