import { useState, useEffect } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import ListItem from "./ListItem";

import { useQueryClient } from "react-query";
import { useCreateProject, useDeleteProject } from "../../api/hook/project";
import { useDispatch, useSelector } from "react-redux";
import { addActiveCategory } from "../../store/features/ui/UiSlice";
import { toast } from "sonner";

function Category({ data }) {
  const currProject = useSelector(
    (state) => state.entities?.ui?.currentCategory
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  let currUser = queryClient.getQueryData("currentUser");
  const { mutate, isLoading } = useCreateProject();
  const { mutate: deleteProject } = useDeleteProject(currProject?.id);
  const [project, setProject] = useState("");

  if (!currUser) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    queryClient.setQueryData("currentUser", user);
    currUser = user;
  }

  function handleAddCategory() {
    if (!project) {
      toast.info("The board cannot be emptied");
      return;
    }

    mutate({ name: project });

    setProject("");
  }

  function handleAddCurrentCategory(payload) {
    dispatch(addActiveCategory(payload));
  }

  useEffect(() => {
    if (data?.projects?.length > 0) {
      const currProject = data?.projects[0];
      dispatch(addActiveCategory(currProject));
    }
  }, [data?.projects, dispatch]);

  function handleDeleteCategory(projectID) {
    // eslint-disable-next-line no-restricted-globals
    const proceed = confirm(
      "This will delete all related tasks with this board. This action cannot be reverted.\n\nDo you wish to proceed?"
    );

    if (proceed) {
      // delete project
      deleteProject(projectID);
    }
  }

  return (
    <div className="category">
      <ul className="category_list">
        {data?.projects &&
          data?.projects.map((project) => (
            <ListItem
              key={project?.id}
              payload={project}
              handleAddCurrentCategory={handleAddCurrentCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          ))}
      </ul>
      <div className="category_added_input_box">
        <input
          type="text"
          value={project}
          placeholder="What's new today?"
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn-category"
        disabled={isLoading}
        onClick={handleAddCategory}
      >
        <MdOutlineSpaceDashboard />
        +Create New Board
      </button>
    </div>
  );
}

export default Category;
